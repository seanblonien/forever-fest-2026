/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. Bounded window/size searches use an explicit loop. */
import { z } from 'zod';
import type { UIMessage } from 'ai';
import { ANSWER_LIMIT, codePointLength, messageText, QUESTION_LIMIT, utf8Size } from './contracts';

export const STORAGE_KEY = 'forever-fest-chat:v1';
export const STORAGE_LIMIT = 48 * 1024;
const storedMessage = z.strictObject({ id: z.string().min(1).max(100), text: z.string().min(1) });
const pairSchema = z.strictObject({ question: storedMessage, answer: storedMessage });
const historySchema = z.strictObject({ version: z.literal(1), pairs: z.array(pairSchema).max(10) });
export type CompletedPair = z.infer<typeof pairSchema>;
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
  if (question?.role !== 'user' || answer?.role !== 'assistant')
    return undefined;
  const pair = { question: { id: question.id, text: messageText(question) }, answer: { id: answer.id, text: messageText(answer) } };
  return boundPairs([pair])[0];
}
export function savePairs(storage: Pick<Storage, 'setItem' | 'removeItem'>, pairs: CompletedPair[]): boolean {
  try {
    if (pairs.length === 0)
      storage.removeItem(STORAGE_KEY);
    else
      storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, pairs: boundPairs(pairs) }));
    return true;
  } catch {
    return false;
  }
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops */
