/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Live atomic-script boundary fixtures in isolated expiring namespaces. */
import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { Redis } from '@upstash/redis';
import { DAILY_CAPS, quotaReservation, RESERVE_QUOTA_SCRIPT } from '../../lib/chat/limits';

test('live primary Redis enforces all caps atomically across concurrent reservations', async () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  expect(Boolean(url && token)).toBe(true);
  const redis = new Redis({ url, token, retry: false });
  const namespace = `forever-fest-2026:test:${randomUUID()}`;
  const identity = { session: 'synthetic', network: 'synthetic', now: Date.now() };
  const reservation = quotaReservation(namespace, identity);
  const expires = Math.ceil(Date.now() / 1000) + 600;
  const args = [...DAILY_CAPS, expires, expires, expires, expires];
  await redis.set(reservation.keys[0], 18, { ex: 600 });
  const results = await Promise.all(Array.from({ length: 10 }, () => redis.eval<number[]>(RESERVE_QUOTA_SCRIPT, reservation.keys, args)));
  expect(results.filter((result) => Array.isArray(result) && result[0] === 1)).toHaveLength(2);
  expect(await redis.mget(...reservation.keys)).toEqual([20, 2, 2, 2]);
  for (const index of [0, 1, 2, 3]) {
    const keys = reservation.keys.map((key) => `${key}:boundary:${index}`);
    await redis.set(keys[index], DAILY_CAPS[index], { ex: 600 });
    expect(await redis.eval<number[]>(RESERVE_QUOTA_SCRIPT, keys, args)).toEqual([0, index + 1]);
    expect(await redis.mget(...keys)).toEqual(keys.map((_, keyIndex) => index === keyIndex ? DAILY_CAPS[index] : null));
  }
  const stableNamespace = `${namespace}:persistent`;
  const initial = quotaReservation(stableNamespace, identity);
  await redis.set(initial.keys[3], 4999, { ex: 600 });
  expect(await redis.eval<number[]>(RESERVE_QUOTA_SCRIPT, initial.keys, args)).toEqual([1, 0]);
  const nextDeployment = quotaReservation(stableNamespace, { session: 'other', network: 'other', now: Date.now() + 86_400_000 });
  expect(await redis.eval<number[]>(RESERVE_QUOTA_SCRIPT, nextDeployment.keys, args)).toEqual([0, 4]);
  const ttl = await redis.ttl(initial.keys[3]);
  expect(ttl).toBeGreaterThan(0);
  expect(ttl).toBeLessThanOrEqual(600);
  // No counter deletion: isolated test keys expire in ten minutes.
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
