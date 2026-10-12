/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. Bounded window/size searches use an explicit loop. */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { ChatConfig } from './config';
import { CHAT_ENDS_AT, ChatError } from './contracts';

export type QuotaIdentity = {
  network: string;
  now: number;
  session: string;
};
export type LimitDecision = {
  allowed: boolean;
  resetAt: number;
};
export type ChatLimiter = (identity: QuotaIdentity) => Promise<LimitDecision>;
export const DAILY_CAPS = [20, 120, 500, 5000] as const;
export function chicagoWindow(now: number): {
  day: string;
  resetAt: number;
} {
  const dateFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' });
  const day = dateFormat.format(now);
  // Find the next local date change, including the 23/25-hour DST days.
  let lower = now;
  let upper = now + (27 * 60 * 60 * 1000);
  while (upper - lower > 1) {
    const middle = Math.floor((lower + upper) / 2);
    if (dateFormat.format(middle) === day)
      lower = middle;
    else
      upper = middle;
  }
  return { day, resetAt: upper };
}
// Check every cap before writing any counter. The primary Redis executes this atomically.
export const RESERVE_QUOTA_SCRIPT = `
for i = 1, #KEYS do
  local value = tonumber(redis.call('GET', KEYS[i]) or '0')
  if value >= tonumber(ARGV[i]) then return {0, i} end
end
for i = 1, #KEYS do
  redis.call('INCR', KEYS[i])
  redis.call('EXPIREAT', KEYS[i], tonumber(ARGV[#KEYS + i]))
end
return {1, 0}
`;
export function quotaReservation(namespace: string, identity: QuotaIdentity) {
  const { day, resetAt } = chicagoWindow(identity.now);
  const lifetimeReset = Date.parse(CHAT_ENDS_AT) + (7 * 24 * 60 * 60 * 1000);
  return {
    keys: [
      `${namespace}:day:${day}:session:${identity.session}`,
      `${namespace}:day:${day}:network:${identity.network}`,
      `${namespace}:day:${day}:site`,
      `${namespace}:lifetime:site`,
    ],
    args: [
      ...DAILY_CAPS,
      ...Array.from({ length: 3 }, () => Math.ceil(resetAt / 1000) + 3600),
      Math.ceil(lifetimeReset / 1000),
    ],
    resetAt,
    lifetimeReset,
  };
}
export function createLimiter(config: ChatConfig): ChatLimiter {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
  const redis = new Redis({ url: config.redisUrl, token: config.redisToken, retry: false });
  /* eslint-disable @typescript-eslint/naming-convention -- library api */
  const burstOptions = { redis, analytics: false, ephemeralCache: false, timeout: 1500 } as const;
  /* eslint-enable @typescript-eslint/naming-convention */
  const session = new Ratelimit({
    ...burstOptions,
    limiter: Ratelimit.fixedWindow(5, '1 m'),
    prefix: `${config.namespace}:burst:session`,
  });
  const network = new Ratelimit({
    ...burstOptions,
    limiter: Ratelimit.fixedWindow(30, '10 m'),
    prefix: `${config.namespace}:burst:network`,
  });
  return quotaLimiter(config.namespace, {
    session: (id) => session.limit(id),
    network: (id) => network.limit(id),
    reserve: (keys, args) => redis.eval<unknown[]>(RESERVE_QUOTA_SCRIPT, keys, args),
  });
}

type BurstResult = {
  reason?: string;
  reset: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
  success: boolean;
};
type QuotaAdapters = {
  network: (id: string) => Promise<BurstResult>;
  reserve: (keys: string[], args: number[]) => Promise<unknown>;
  session: (id: string) => Promise<BurstResult>;
};

export function quotaLimiter(namespace: string, adapters: QuotaAdapters): ChatLimiter {
  return async (identity) => {
    const results = await Promise.all([
      adapters.session(identity.session),
      adapters.network(identity.network),
    ]);
    if (results.some((result) => result.reason === 'timeout'))
      throw new ChatError(503, 'unavailable');
    const denied = results.filter((result) => !result.success);
    if (denied.length > 0)
      return { allowed: false, resetAt: Math.max(...denied.map((result) => result.reset)) };
    const reservation = quotaReservation(namespace, identity);
    const result = await adapters.reserve(reservation.keys, reservation.args);
    if (!Array.isArray(result) || result.length !== 2 || typeof result[0] !== 'number' || (result[0] !== 0 && result[0] !== 1) || typeof result[1] !== 'number' || result[1] < 0 || result[1] > 4)
      throw new ChatError(503, 'unavailable');
    return {
      allowed: result[0] === 1,
      resetAt: result[1] === 4 ? reservation.lifetimeReset : reservation.resetAt,
    };
  };
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
