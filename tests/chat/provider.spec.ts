/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Exercise exact protocol/deadline failures. */
import { expect, test } from '@playwright/test';
import { MockLanguageModelV4 } from 'ai/test';
import { simulateReadableStream } from 'ai';
import { handleChat } from '../../lib/chat/handleChat';
import { dependencies, model, NOW, request, TEST_ENV } from './helpers';

test('one admitted call uses server facts, text only, reasoning/store off and no tools', async () => {
  const mock = model();
  const response = await handleChat(request(), dependencies(mock));
  expect(response.status).toBe(200);
  expect(response.headers.get('cache-control')).toBe('no-store');
  expect(response.headers.get('set-cookie')).toContain('HttpOnly');
  const stream = await response.text();
  expect(stream).toContain('text-delta');
  expect(stream).toContain('5:30 PM');
  expect(stream).toContain('[DONE]');
  expect(mock.doStreamCalls).toHaveLength(1);
  const call = mock.doStreamCalls[0];
  expect(call.maxOutputTokens).toBe(600);
  expect(call.providerOptions?.openai).toEqual({ reasoningEffort: 'none', store: false });
  expect(call.tools).toBeUndefined();
  expect(JSON.stringify(call.prompt)).toContain('State & Allen');
  expect(JSON.stringify(call.prompt)).toContain('untrusted conversation');
});

test('daily/burst denial and storage failure call no model; limit returns actual reset', async () => {
  for (const limiter of [
    () => Promise.resolve({ allowed: false, resetAt: NOW + 90_000 }),
    () => Promise.reject(new Error('private redis credential details')),
  ]) {
    const mock = model();
    const response = await handleChat(request(), { ...dependencies(mock), limiter: () => limiter });
    expect([429, 503]).toContain(response.status);
    if (response.status === 429) {
      expect(response.headers.get('retry-after')).toBe('90');
      expect(await response.json()).toMatchObject({ code: 'rate_limited', resetAt: NOW + 90_000 });
    } else expect(await response.text()).not.toContain('credential');
    expect(mock.doStreamCalls).toHaveLength(0);
  }
});

test('initial provider failure is safe HTTP 503 with no retry', async () => {
  const mock = new MockLanguageModelV4({ doStream: () => Promise.reject(new Error('sk-private prompt payload')) });
  const response = await handleChat(request(), dependencies(mock));
  expect(response.status).toBe(503);
  expect(await response.text()).not.toContain('sk-private');
  expect(response.headers.get('set-cookie')).toContain('HttpOnly');
  expect(mock.doStreamCalls).toHaveLength(1);
});

test('midstream provider failure emits safe incomplete message with no retry', async () => {
  const mock = new MockLanguageModelV4({ doStream: () => Promise.resolve({
    stream: simulateReadableStream({ initialDelayInMs: 0,
      chunkDelayInMs: 0,
      chunks: [
        { type: 'text-start', id: 't' },
        { type: 'text-delta', id: 't', delta: 'Partial' },
        { type: 'error', error: new Error('sk-private prompt payload') },
      ] }),
  }) });
  const response = await handleChat(request(), dependencies(mock));
  expect(response.status).toBe(200);
  const stream = await response.text();
  expect(stream).toContain('Partial');
  expect(stream).toContain('incomplete');
  expect(stream).not.toContain('sk-private');
  expect(mock.doStreamCalls).toHaveLength(1);
});

test('total deadline cancels a hanging initial provider without retry', async () => {
  const mock = new MockLanguageModelV4({ doStream: () => new Promise(() => {/* Intentional provider hang. */}) });
  const response = await handleChat(request(), { ...dependencies(mock), deadlineMs: 30 });
  expect(response.status).toBe(503);
  expect(mock.doStreamCalls).toHaveLength(1);
  expect(mock.doStreamCalls[0].abortSignal?.aborted).toBe(true);
});

test('request disconnect and response-body cancellation abort provider and retain admission', async () => {
  for (const mode of ['disconnect', 'body-cancel']) {
    let admissions = 0;
    const mock = new MockLanguageModelV4({ doStream: () => Promise.resolve({ stream: new ReadableStream({
      start(controller) {
        controller.enqueue({ type: 'text-start', id: 't' });
        controller.enqueue({ type: 'text-delta', id: 't', delta: 'Partial' });
      },
    }) }) });
    const controller = new AbortController();
    // eslint-disable-next-line unicorn/consistent-function-scoping -- Each cancellation case needs its own admission counter.
    const admit = () => {
      admissions += 1;
      return Promise.resolve({ allowed: true, resetAt: NOW });
    };
    const response = await handleChat(request(undefined, {}, controller.signal), {
      ...dependencies(mock),
      limiter: () => admit,
    });
    if (mode === 'disconnect') controller.abort();
    else await response.body?.cancel();
    await expect.poll(() => mock.doStreamCalls[0].abortSignal?.aborted).toBe(true);
    expect(admissions).toBe(1);
    expect(mock.doStreamCalls).toHaveLength(1);
  }
});

const delayedAdmission = () => new Promise<{ allowed: boolean; resetAt: number }>((resolve) => {
  setTimeout(() => resolve({ allowed: true, resetAt: NOW }), 40);
});

test('deadline during storage admission cannot start a provider later', async () => {
  const mock = model();
  const response = await handleChat(request(), { ...dependencies(mock), deadlineMs: 15, limiter: () => delayedAdmission });
  expect(response.status).toBe(503);
  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });
  expect(mock.doStreamCalls).toHaveLength(0);
});

test('deployed IP must be present and valid before any model work', async () => {
  const mock = model();
  const response = await handleChat(new Request('https://preview.example/api/chat', {
    method: 'POST',
    headers: { 'origin': 'https://preview.example', 'content-type': 'application/json' },
    body: JSON.stringify({ messages: [{ id: 'q', role: 'user', parts: [{ type: 'text', text: 'Hi' }] }] }),
  }), { ...dependencies(mock), env: { ...TEST_ENV, VERCEL: '1', CHAT_ALLOWED_ORIGINS: 'https://preview.example' } });
  expect(response.status).toBe(503);
  expect(mock.doStreamCalls).toHaveLength(0);
});
test('answer byte bound terminates oversized provider text without saving a full answer', async () => {
  const mock = new MockLanguageModelV4({ doStream: () => Promise.resolve({
    stream: simulateReadableStream({ initialDelayInMs: 0,
      chunkDelayInMs: 0,
      chunks: [
        { type: 'text-start', id: 't' },
        { type: 'text-delta', id: 't', delta: 'Short start.' },
        { type: 'text-delta', id: 't', delta: 'x'.repeat(4097) },
      ] }),
  }) });
  const response = await handleChat(request(), dependencies(mock));
  const body = await response.text();
  expect(body).toContain('Short start.');
  expect(body).toContain('incomplete');
  expect(body).not.toContain('x'.repeat(4097));
  expect(mock.doStreamCalls[0].abortSignal?.aborted).toBe(true);
});

test('numeric usage correlation contains no conversation content', async () => {
  const usage: unknown[] = [];
  const response = await handleChat(request(), { ...dependencies(),
    onUsage: (value) => {
      usage.push(value);
    } });
  await response.text();
  expect(usage).toEqual([{ requestId: response.headers.get('x-chat-request-id'), durationMs: 0, inputTokens: 10, outputTokens: 10 }]);
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
