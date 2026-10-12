/* eslint-disable @typescript-eslint/no-magic-numbers -- Fixtures exercise exact protocol boundaries and ordered failure cases. */
import { MockLanguageModelV4 } from 'ai/test';
import { simulateReadableStream } from 'ai';
import type { ChatDependencies } from '../../lib/chat/handleChat';
import { CHAT_ENDS_AT } from '../../lib/chat/contracts';

export const NOW = Date.parse('2026-10-11T04:00:00Z');
export const TEST_ENV: NodeJS.ProcessEnv = {
  CHAT_ENABLED: 'true',
  CHAT_ENDS_AT,
  CHAT_COOKIE_SECRET: 'synthetic-only-cookie-secret-32-characters',
  OPENAI_API_KEY: 'synthetic-only',
  UPSTASH_REDIS_REST_URL: 'https://example.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'synthetic-only',
  CHAT_QUOTA_NAMESPACE: 'forever-fest-2026:preview',
  CHAT_ALLOWED_ORIGINS: 'http://127.0.0.1:3001',
  NODE_ENV: 'test',
};
export const question = (text = 'When should I arrive?', id = 'question-1') => ({ id, role: 'user', parts: [{ type: 'text', text }] });
export const answer = (text = 'Please arrive at 5:30 PM.', id = 'answer-1') => ({ id, role: 'assistant', parts: [{ type: 'text', text }] });
export function request(
  body?: unknown,
  headers: Record<string, string> = {},
  signal?: AbortSignal,
) {
  return new Request('http://127.0.0.1:3001/api/chat', {
    method: 'POST',
    headers: { 'origin': 'http://127.0.0.1:3001', 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body === undefined ? { messages: [question()] } : body),
    signal,
  });
}
export function model() {
  return new MockLanguageModelV4({
    doStream: () => Promise.resolve({
      stream: simulateReadableStream({ chunks: [
        { type: 'text-start', id: 't' },
        { type: 'text-delta', id: 't', delta: 'Please arrive ' },
        { type: 'text-delta', id: 't', delta: 'at 5:30 PM.' },
        { type: 'text-end', id: 't' },
        { type: 'finish',
          finishReason: { unified: 'stop', raw: undefined },
          usage: {
            inputTokens: { total: 10, noCache: 10, cacheRead: undefined, cacheWrite: undefined },
            outputTokens: { total: 10, text: 10, reasoning: undefined },
          } },
      ],
      initialDelayInMs: 0,
      chunkDelayInMs: 0 }),
    }),
  });
}
const allowed = () => Promise.resolve({ allowed: true, resetAt: NOW + 60_000 });
const testLimiter = () => allowed;

export function dependencies(mock = model()): ChatDependencies {
  return { env: TEST_ENV, now: () => NOW, model: () => mock, limiter: testLimiter };
}
/* eslint-enable @typescript-eslint/no-magic-numbers */
