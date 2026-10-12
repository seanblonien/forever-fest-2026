/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. Bounded window/size searches use an explicit loop. */
import { z } from 'zod';
import type { UIMessage } from 'ai';
import { ANSWER_LIMIT, codePointLength, messageText, QUESTION_LIMIT, utf8Size } from './contracts';

export const STORAGE_KEY = 'forever-fest-chat:v1';
export const STORAGE_LIMIT = 48 * 1024;
export const THREAD_STORAGE_KEY = 'forever-fest-chat:v2';
const THREAD_LIMIT = 10;
const THREAD_STORAGE_LIMIT = (STORAGE_LIMIT * THREAD_LIMIT) + 4096;
const storedMessage = z.strictObject({ id: z.string().min(1).max(100), text: z.string().min(1) });
const pairSchema = z.strictObject({ question: storedMessage, answer: storedMessage });
const historySchema = z.strictObject({ version: z.literal(1), pairs: z.array(pairSchema).max(10) });
export type CompletedPair = z.infer<typeof pairSchema>;
const threadSchema = z.strictObject({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(80),
  updatedAt: z.number().int().nonnegative(),
  pairs: z.array(pairSchema).min(1).max(10),
});
const threadsSchema = z.strictObject({
  version: z.literal(2),
  activeId: z.string().min(1).max(100),
  threads: z.array(threadSchema).max(THREAD_LIMIT),
});
export type ChatThread = z.infer<typeof threadSchema>;
export type ChatHistory = z.infer<typeof threadsSchema>;
export function newChatHistory(): ChatHistory {
  return { version: 2, activeId: crypto.randomUUID(), threads: [] };
}
export function updateChatHistory(
  history: ChatHistory,
  pairs: CompletedPair[],
  now = Date.now(),
): ChatHistory {
  const bounded = boundPairs(pairs);
  if (bounded.length === 0)
    return history;
  const previous = history.threads.find((thread) => thread.id === history.activeId);
  const thread: ChatThread = {
    id: history.activeId,
    title: previous?.title ?? bounded[0].question.text.slice(0, 80),
    updatedAt: now,
    pairs: bounded,
  };
  const others = history.threads.filter(({ id }) => id !== thread.id);
  return { ...history, threads: [thread, ...others].slice(0, THREAD_LIMIT) };
}
export function restoreChatHistory(raw: string | null): ChatHistory | undefined {
  if (!raw || utf8Size(raw) > THREAD_STORAGE_LIMIT)
    return undefined;
  try {
    const result = threadsSchema.safeParse(JSON.parse(raw) as unknown);
    if (!result.success)
      return undefined;
    const history = result.data;
    const ids = history.threads.map(({ id }) => id);
    const hasInvalidThread = history.threads.some(({ pairs }) =>
      restorePairs(JSON.stringify({ version: 1, pairs })).length !== pairs.length);
    if (new Set(ids).size !== ids.length || hasInvalidThread)
      return undefined;
    return history;
  } catch {
    return undefined;
  }
}
export function saveChatHistory(storage: Pick<Storage, 'setItem'>, history: ChatHistory): boolean {
  try {
    storage.setItem(THREAD_STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}
export function boundPairs(pairs: CompletedPair[]): CompletedPair[] {
  const bounded = pairs.filter(({ answer, question }) => question.text.trim() &&
    codePointLength(question.text) <= QUESTION_LIMIT && answer.text.trim() &&
    utf8Size(answer.text) <= ANSWER_LIMIT).slice(-10);
  while (utf8Size(JSON.stringify({ version: 1, pairs: bounded })) > STORAGE_LIMIT)
    bounded.shift();
  return bounded;
}
export function restorePairs(raw: string | null): CompletedPair[] {
  if (!raw || utf8Size(raw) > STORAGE_LIMIT)
    return [];
  try {
    const result = historySchema.safeParse(JSON.parse(raw) as unknown);
    if (!result.success)
      return [];
    const bounded = boundPairs(result.data.pairs);
    if (bounded.length !== result.data.pairs.length)
      return [];
    const ids = bounded.flatMap(({ answer, question }) => [question.id, answer.id]);
    return new Set(ids).size === ids.length ? bounded : [];
  } catch {
    return [];
  }
}
export function pairsToMessages(pairs: CompletedPair[]): UIMessage[] {
  return pairs.flatMap(({ answer, question }) => [
    { id: question.id, role: 'user' as const, parts: [{ type: 'text' as const, text: question.text }] },
    { id: answer.id, role: 'assistant' as const, parts: [{ type: 'text' as const, text: answer.text }] },
  ]);
}
export function completedPair(messages: UIMessage[]): CompletedPair | undefined {
  const [question, answer] = messages.slice(-2);
  if (messages.length < 2 || question.role !== 'user' || answer.role !== 'assistant')
    return undefined;
  const pair = {
    question: { id: question.id, text: messageText(question) },
    answer: { id: answer.id, text: messageText(answer) },
  };
  return boundPairs([pair])[0];
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
