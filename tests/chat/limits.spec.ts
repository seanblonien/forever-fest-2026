/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Exact quota boundary fixtures. */
import { expect, test } from '@playwright/test';
import { quotaLimiter } from '../../lib/chat/limits';
import { NOW } from './helpers';

const pass = () => Promise.resolve({ success: true, reset: NOW + 60_000 });
test('burst timeout fails closed even when library reports success', async () => {
  let reservations = 0;
  const limit = quotaLimiter('test', { session: () => Promise.resolve({ success: true, reset: NOW, reason: 'timeout' }),
    network: pass,
    reserve: () => {
      reservations += 1;
      return Promise.resolve([1, 0]);
    } });
  await expect(limit({ session: 's', network: 'n', now: NOW })).rejects.toMatchObject({ status: 503 });
  expect(reservations).toBe(0);
});

test('burst denials use latest actual reset; storage exceptions make no reservation', async () => {
  const limit = quotaLimiter('test', { session: () => Promise.resolve({ success: false, reset: NOW + 1000 }), network: () => Promise.resolve({ success: false, reset: NOW + 2000 }), reserve: () => Promise.reject(new Error('Must not reserve')) });
  expect(await limit({ session: 's', network: 'n', now: NOW })).toEqual({ allowed: false, resetAt: NOW + 2000 });
  const failure = quotaLimiter('test', { session: () => Promise.reject(new Error('Redis down')), network: pass, reserve: () => Promise.reject(new Error('Must not reserve')) });
  await expect(failure({ session: 's', network: 'n', now: NOW })).rejects.toThrow('Redis down');
});

test('near-cap concurrent reservations admit exact remaining allowance in atomic adapter', async () => {
  let count = 18;
  const limit = quotaLimiter('test', { session: pass,
    network: pass,
    reserve: () => {
      if (count >= 20) return Promise.resolve([0, 1]);
      count += 1;
      return Promise.resolve([1, 0]);
    } });
  const decisions = await Promise.all(Array.from({ length: 10 }, () => limit({ session: 's', network: 'n', now: NOW })));
  expect(decisions.filter((decision) => decision.allowed)).toHaveLength(2);
  expect(count).toBe(20);
});

test('invalid Redis results fail closed and lifetime exhaustion has lifetime reset', async () => {
  for (const result of [null, [true, 0], [1], [1, 99], ['1', 0]]) {
    const limit = quotaLimiter('test', { session: pass, network: pass, reserve: () => Promise.resolve(result) });
    await expect(limit({ session: 's', network: 'n', now: NOW })).rejects.toMatchObject({ status: 503 });
  }
  const limit = quotaLimiter('test', { session: pass, network: pass, reserve: () => Promise.resolve([0, 4]) });
  expect(await limit({ session: 's', network: 'n', now: NOW })).toEqual({ allowed: false, resetAt: Date.parse('2026-10-26T05:00:00Z') });
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
