/* eslint-disable @typescript-eslint/no-magic-numbers -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. */
import { z } from 'zod';
import { CHAT_ENDS_AT } from './contracts';

export type ChatConfig = {
  apiKey: string;
  cookieSecret: string;
  deployed: boolean;
  namespace: string;
  origins: string[];
  redisToken: string;
  redisUrl: string;
};
const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.url().startsWith('https://'),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  CHAT_COOKIE_SECRET: z.string().refine((value) => Buffer.byteLength(value) >= 32),
  CHAT_ENDS_AT: z.literal(CHAT_ENDS_AT),
  CHAT_QUOTA_NAMESPACE: z.enum(['forever-fest-2026:preview', 'forever-fest-2026:production']),
  CHAT_ALLOWED_ORIGINS: z.string().min(1),
});
export function chatEnabled(env: NodeJS.ProcessEnv = process.env, now = Date.now()): boolean {
  return env.CHAT_ENABLED === 'true' && now < Date.parse(CHAT_ENDS_AT);
}
export function readConfig(env: NodeJS.ProcessEnv = process.env): ChatConfig | undefined {
  const result = envSchema.safeParse(env);
  if (!result.success)
    return undefined;
  const value = result.data;
  const deployed = env.VERCEL === '1' || env.NODE_ENV === 'production';
  const configuredOrigins = value.CHAT_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim());
  // Exact platform-issued URLs let protected previews work without trusting request headers.
  const platformOrigins = env.VERCEL === '1'
    ? [env.VERCEL_URL, env.VERCEL_BRANCH_URL].filter((host): host is string => Boolean(host) && /^[a-z0-9-]+\.vercel\.app$/.test(host ?? '')).map((host) => `https://${host}`)
    : [];
  const origins = [...new Set([...configuredOrigins, ...platformOrigins])];
  try {
    if (origins.some((origin) => {
      const url = new URL(origin);
      return url.origin !== origin || (deployed
        ? url.protocol !== 'https:'
        : !['http:', 'https:'].includes(url.protocol));
    }))
      return undefined;
  } catch {
    return undefined;
  }
  if (env.VERCEL_ENV === 'preview' && value.CHAT_QUOTA_NAMESPACE !== 'forever-fest-2026:preview')
    return undefined;
  if (env.VERCEL_ENV === 'production' && value.CHAT_QUOTA_NAMESPACE !== 'forever-fest-2026:production')
    return undefined;
  return {
    apiKey: value.OPENAI_API_KEY,
    redisUrl: value.UPSTASH_REDIS_REST_URL,
    redisToken: value.UPSTASH_REDIS_REST_TOKEN,
    cookieSecret: value.CHAT_COOKIE_SECRET,
    namespace: value.CHAT_QUOTA_NAMESPACE,
    origins,
    deployed,
  };
}
/* eslint-enable @typescript-eslint/no-magic-numbers */
