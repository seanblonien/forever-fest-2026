/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements -- Fixtures exercise exact protocol boundaries and ordered failure cases. */
import { expect, test } from '@playwright/test';
import { COOKIE_NAME, networkKey, normalizeIP, resolveSession } from '../../lib/chat/session';
import { boundPairs, completedPair, newChatHistory, pairsToMessages, restoreChatHistory, restorePairs, saveChatHistory, STORAGE_LIMIT, updateChatHistory } from '../../lib/chat/storage';
import { chicagoWindow, quotaReservation } from '../../lib/chat/limits';
import { CHAT_ENDS_AT } from '../../lib/chat/contracts';
import { NOW, request, TEST_ENV } from './helpers';

test('signed cookie survives requests, resists tampering, expires at cutoff', () => {
  const secret = TEST_ENV.CHAT_COOKIE_SECRET ?? '';
  const issued = resolveSession(null, secret, NOW, true);
  const cookie = issued.cookie ?? '';
  expect(cookie).toContain('HttpOnly; SameSite=Lax; Path=/');
  expect(issued.cookie).toContain('; Secure');
  expect(resolveSession(cookie, secret, NOW + 1, true)).toEqual({ id: issued.id });
  expect(resolveSession(cookie.replace(issued.id, 'a'.repeat(32)), secret, NOW + 1, true).id).not.toBe(issued.id);
  expect(resolveSession(`${COOKIE_NAME}=bad`, secret, NOW, true).id).not.toBe(issued.id);
  expect(resolveSession(cookie, 'other-secret', NOW + 1, true).id).not.toBe(issued.id);
  expect(resolveSession(cookie, secret, NOW - 1, true).id).not.toBe(issued.id);
  expect(resolveSession(cookie, secret, Date.parse(CHAT_ENDS_AT), true).id).not.toBe(issued.id);
});
test('IP normalization hashes canonical Vercel addresses, ignores local forwarded headers', () => {
  // eslint-disable-next-line sonarjs/no-hardcoded-ip -- RFC documentation address, not a guest network.
  expect(normalizeIP('2001:0db8:0:0:0:0:0:1')).toBe('2001:db8::1');
  // eslint-disable-next-line sonarjs/no-hardcoded-ip -- RFC documentation address, not a guest network.
  expect(normalizeIP('::ffff:192.0.2.1')).toBe('192.0.2.1');
  for (const invalid of ['1.2.3.4,5.6.7.8', 'unknown', '', '192.0.2.1:3000'])
    expect(normalizeIP(invalid)).toBeUndefined();
  const local = request(undefined, { 'x-vercel-forwarded-for': '203.0.113.1' });
  const other = request(undefined, { 'x-vercel-forwarded-for': '203.0.113.2' });
  expect(networkKey(local, 'secret', '2026-10-10', false)).toBe(networkKey(other, 'secret', '2026-10-10', false));
  expect(networkKey(local, 'secret', '2026-10-10', true)).not.toBe(networkKey(other, 'secret', '2026-10-10', true));
  expect(networkKey(local, 'secret', '2026-10-10', true)).not.toContain('203.0.113.1');
  expect(networkKey(local, 'secret', '2026-10-10', true)).not.toBe(networkKey(local, 'secret', '2026-10-11', true));
  expect(() => networkKey(request(), 'secret', '2026-10-10', true)).toThrow();
});
test('Chicago midnight and DST reset boundaries are exact', () => {
  for (const [before, at, day] of [
    ['2026-10-11T04:59:59.999Z', '2026-10-11T05:00:00Z', '2026-10-10'],
    ['2026-11-02T05:59:59.999Z', '2026-11-02T06:00:00Z', '2026-11-01'],
    ['2026-03-09T04:59:59.999Z', '2026-03-09T05:00:00Z', '2026-03-08'],
  ]) {
    expect(chicagoWindow(Date.parse(before))).toEqual({ day, resetAt: Date.parse(at) });
    expect(chicagoWindow(Date.parse(at)).day).not.toBe(day);
  }
});
test('lifetime keys survive deployments and day/session changes; namespaces separate preview', () => {
  const first = quotaReservation('forever-fest-2026:preview', { session: 'one', network: 'one', now: NOW });
  const next = quotaReservation('forever-fest-2026:preview', { session: 'two', network: 'two', now: NOW + 86_400_000 });
  expect(first.keys[3]).toBe(next.keys[3]);
  expect(first.keys[0]).not.toBe(next.keys[0]);
  expect(first.args.slice(0, 4)).toEqual([20, 120, 500, 5000]);
  expect(first.keys[3]).not.toBe(quotaReservation('forever-fest-2026:production', { session: 'one', network: 'one', now: NOW }).keys[3]);
  expect(first.lifetimeReset).toBe(Date.parse(CHAT_ENDS_AT) + 7 * 86_400_000);
});
const pair = (index: number) => ({ question: { id: `q${index}`, text: 'Where?' }, answer: { id: `a${index}`, text: 'DEC on Dragon.' } });
test('storage restores only bounded completed pairs and strips provider metadata', () => {
  const bounded = boundPairs(Array.from({ length: 12 }, (_, index) => pair(index)));
  expect(bounded).toHaveLength(10);
  expect(bounded[0].question.id).toBe('q2');
  const raw = JSON.stringify({ version: 1, pairs: bounded });
  expect(restorePairs(raw)).toEqual(bounded);
  expect(restorePairs(JSON.stringify({ version: 1, pairs: [pair(1)], providerResponseId: 'secret' }))).toEqual([]);
  expect(restorePairs(JSON.stringify({ version: 1, pairs: [pair(1), pair(1)] }))).toEqual([]);
  expect(restorePairs(JSON.stringify({ version: 1, pairs: [{ ...pair(1), answer: { id: 'a1', text: 'x'.repeat(4097) } }] }))).toEqual([]);
  for (const bad of ['{', '{}', 'x'.repeat(STORAGE_LIMIT + 1)])
    expect(restorePairs(bad)).toEqual([]);
  expect(completedPair(pairsToMessages([pair(1)]))).toEqual(pair(1));
  expect(completedPair(pairsToMessages([pair(1)]).slice(0, 1))).toBeUndefined();
});
test('thread history preserves a new empty chat and can reopen previous completed conversations after refresh', () => {
  const first = updateChatHistory(newChatHistory(), [pair(1)], NOW);
  const empty = { ...first, activeId: 'new-empty-chat' };
  const stored = new Map<string, string>();
  expect(saveChatHistory({ setItem: (key, value) => {
    stored.set(key, value);
  } }, empty)).toBe(true);
  const restored = restoreChatHistory([...stored.values()][0]);
  expect(restored).toEqual(empty);
  expect(restored?.threads.find(({ id }) => id === restored.activeId)).toBeUndefined();
  const reopened = { ...empty, activeId: first.activeId };
  const updated = updateChatHistory(reopened, [pair(1), pair(2)], NOW + 1);
  expect(updated.threads).toHaveLength(1);
  expect(updated.threads[0].title).toBe('Where?');
  expect(updated.threads[0].pairs).toEqual([pair(1), pair(2)]);
});
test('thread history retains the ten most recently updated chats and validates each stored transcript', () => {
  let history = newChatHistory();
  for (let index = 0; index < 12; index += 1)
    history = updateChatHistory({ ...history, activeId: `thread-${index}` }, [pair(index)], NOW + index);
  expect(history.threads).toHaveLength(10);
  expect(history.threads.map(({ id }) => id)).toEqual(Array.from({ length: 10 }, (_, index) => `thread-${11 - index}`));
  expect(restoreChatHistory(JSON.stringify(history))).toEqual(history);
  expect(restoreChatHistory(JSON.stringify({ ...history, threads: [history.threads[0], history.threads[0]] }))).toBeUndefined();
  expect(restoreChatHistory(JSON.stringify({ ...history, threads: [{ ...history.threads[0], pairs: [pair(1), pair(1)] }] }))).toBeUndefined();
  expect(restoreChatHistory('{bad')).toBeUndefined();
  expect(saveChatHistory({ setItem: () => {
    throw new Error('Blocked');
  } }, history)).toBe(false);
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements */
