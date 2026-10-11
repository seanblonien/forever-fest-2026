/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. Stream readers and ordered rejection paths require bounded imperative control flow. */
import { randomUUID } from 'node:crypto';
import { createUIMessageStreamResponse, streamText, toUIMessageStream } from 'ai';
import type { LanguageModel, TextStreamPart, ToolSet } from 'ai';
import type { ChatConfig } from './config';
import type { ChatLimiter } from './limits';
import { buildKnowledge } from './knowledge';
import { chatEnabled, readConfig } from './config';
import { ANSWER_LIMIT, BODY_LIMIT, ChatError, DEADLINE_MS, messageText, MODEL_TEXT_LIMIT, parseMessages, utf8Size } from './contracts';
import { chicagoWindow } from './limits';
import { networkKey, resolveSession } from './session';

export type ChatDependencies = {
  deadlineMs?: number;
  env?: NodeJS.ProcessEnv;
  knowledge?: (now: number) => string;
  limiter: (config: ChatConfig) => ChatLimiter;
  model: (config: ChatConfig) => LanguageModel;
  now?: () => number;
  onUsage?: (usage: { durationMs: number; inputTokens: number; outputTokens: number; requestId: string }) => void;
};
export function publicError(error: ChatError, now: number): Response {
  const messages = {
    invalid_input: 'Please send a question of up to 500 characters.',
    forbidden_origin: 'Please ask from this website.',
    body_too_large: 'This question or chat history is too large. Please clear chat.',
    unsupported_content_type: 'Please send a text question from the chat panel.',
    rate_limited: 'The chat limit has been reached.',
    unavailable: 'Chat is unavailable. Please use the FAQs or contact Sean or Eva.',
  };
  const headers = new Headers({ 'Cache-Control': 'no-store' });
  if (error.resetAt)
    headers.set('Retry-After', String(Math.max(1, Math.ceil((error.resetAt - now) / 1000))));
  return Response.json({ code: error.code, message: messages[error.code], ...error.resetAt ? { resetAt: error.resetAt } : {} }, { status: error.status, headers });
}
function abortable<T>(operation: Promise<T>, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(new Error('Request cancelled'));
    signal.addEventListener('abort', onAbort, { once: true });
    operation.then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort));
  });
}
async function readBody(request: Request, signal: AbortSignal): Promise<unknown> {
  if (Number(request.headers.get('content-length')) > BODY_LIMIT)
    throw new ChatError(413, 'body_too_large');
  if (!request.body)
    throw new ChatError(400, 'invalid_input');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await abortable(reader.read(), signal);
      if (done)
        break;
      size += value.length;
      if (size > BODY_LIMIT)
        throw new ChatError(413, 'body_too_large');
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    try {
      return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) as unknown;
    } catch {
      throw new ChatError(400, 'invalid_input');
    }
  } finally {
    void reader.cancel().catch(() => {/* Cancellation can race an already closed reader. */});
    reader.releaseLock();
  }
}
// Wait for the first provider text before committing headers so initial failures can be HTTP 503.
async function startStream(source: ReadableStream<TextStreamPart<ToolSet>>, controller: AbortController, cleanup: () => void) {
  const reader = source.getReader();
  const buffered: TextStreamPart<ToolSet>[] = [];
  try {
    for (;;) {
      const item = await abortable(reader.read(), controller.signal);
      if (item.done || item.value.type === 'error' || item.value.type === 'abort')
        throw new ChatError(503, 'unavailable');
      buffered.push(item.value);
      if (item.value.type === 'text-delta' && item.value.text.length > 0)
        break;
      if (item.value.type === 'finish')
        throw new ChatError(503, 'unavailable');
    }
  } catch (error) {
    controller.abort();
    void reader.cancel().catch(() => {/* Cancellation can race an already closed reader. */});
    cleanup();
    throw error;
  }
  let outputBytes = 0;
  let ended = false;
  return new ReadableStream<TextStreamPart<ToolSet>>({
    async pull(destination) {
      try {
        const next = buffered.shift();
        const item = next ? { done: false, value: next } : await abortable(reader.read(), controller.signal);
        if (item.done) {
          ended = true;
          cleanup();
          destination.close();
          return;
        }
        if (item.value.type === 'text-delta') {
          outputBytes += utf8Size(item.value.text);
          if (outputBytes > ANSWER_LIMIT)
            throw new Error('Output limit');
        }
        destination.enqueue(item.value);
      } catch {
        if (!ended) {
          ended = true;
          controller.abort();
          destination.enqueue({ type: 'error', error: new Error('The answer is incomplete. Please use the FAQs.') });
          destination.close();
          void reader.cancel().catch(() => {/* Cancellation can race an already closed reader. */});
          cleanup();
        }
      }
    },
    cancel() {
      ended = true;
      controller.abort();
      cleanup();
      void reader.cancel().catch(() => {/* Cancellation can race an already closed reader. */});
    },
  });
}
export async function handleChat(request: Request, dependencies: ChatDependencies): Promise<Response> {
  const env = dependencies.env ?? process.env;
  const now = dependencies.now ?? Date.now;
  const started = now();
  const requestId = randomUUID();
  if (!chatEnabled(env, started))
    return publicError(new ChatError(503, 'unavailable'), started);
  const config = readConfig(env);
  if (!config)
    return publicError(new ChatError(503, 'unavailable'), started);
  const controller = new AbortController();
  const onDisconnect = () => controller.abort();
  request.signal.addEventListener('abort', onDisconnect, { once: true });
  if (request.signal.aborted)
    controller.abort();
  let issuedCookie: string | undefined;
  const timer = setTimeout(() => controller.abort(), dependencies.deadlineMs ?? DEADLINE_MS);
  const cleanup = () => {
    clearTimeout(timer);
    request.signal.removeEventListener('abort', onDisconnect);
  };
  try {
    if (request.method !== 'POST')
      throw new ChatError(400, 'invalid_input');
    const origin = request.headers.get('origin');
    if (!origin || !config.origins.includes(origin) || origin !== new URL(request.url).origin)
      throw new ChatError(403, 'forbidden_origin');
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json')
      throw new ChatError(415, 'unsupported_content_type');
    const body = await readBody(request, controller.signal);
    let messages;
    try {
      messages = parseMessages(body);
    } catch {
      throw new ChatError(400, 'invalid_input');
    }
    const session = resolveSession(request.headers.get('cookie'), config.cookieSecret, started, new URL(request.url).protocol === 'https:');
    issuedCookie = session.cookie;
    const { day } = chicagoWindow(started);
    const network = networkKey(request, config.cookieSecret, day, config.deployed);
    const instructions = (dependencies.knowledge ?? buildKnowledge)(started);
    if (utf8Size(instructions) + messages.reduce((size, message) => size + utf8Size(messageText(message)), 0) > MODEL_TEXT_LIMIT)
      throw new ChatError(413, 'body_too_large');
    const decision = await abortable(dependencies.limiter(config)({ session: session.id, network, now: started }), controller.signal);
    if (!decision.allowed)
      throw new ChatError(429, 'rate_limited', decision.resetAt);
    if (!chatEnabled(env, now()))
      throw new ChatError(503, 'unavailable');
    controller.signal.throwIfAborted();
    const result = streamText({
      model: dependencies.model(config),
      instructions,
      messages: messages.map((message) => ({ role: message.role as 'user' | 'assistant', content: messageText(message) })),
      maxOutputTokens: 600,
      maxRetries: 0,
      abortSignal: controller.signal,
      providerOptions: { openai: { reasoningEffort: 'none', store: false } },
      onEnd: ({ totalUsage }) => dependencies.onUsage?.({ requestId, durationMs: now() - started, inputTokens: totalUsage.inputTokens ?? 0, outputTokens: totalUsage.outputTokens ?? 0 }),
      onError: () => {/* Errors are mapped to safe HTTP/stream responses below. */},
    });
    const source = await startStream(result.stream, controller, cleanup);
    const headers = new Headers({ 'Cache-Control': 'no-store', 'X-Chat-Request-Id': requestId });
    if (session.cookie)
      headers.set('Set-Cookie', session.cookie);
    return createUIMessageStreamResponse({
      headers,
      stream: toUIMessageStream({ stream: source, generateMessageId: randomUUID, sendReasoning: false, sendSources: false, onError: () => 'The answer is incomplete. Please use the FAQs.' }),
    });
  } catch (error) {
    controller.abort();
    cleanup();
    const response = publicError(error instanceof ChatError ? error : new ChatError(503, 'unavailable'), now());
    if (issuedCookie)
      response.headers.set('Set-Cookie', issuedCookie);
    return response;
  }
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements */
