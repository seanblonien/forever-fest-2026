/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-classes, functional/no-class-inheritance -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. A typed Error carries the public HTTP failure contract. */
import { z } from 'zod';
import type { UIMessage } from 'ai';

export const BODY_LIMIT = 16 * 1024;
export const QUESTION_LIMIT = 500;
export const ANSWER_LIMIT = 4 * 1024;
export const MODEL_TEXT_LIMIT = 32 * 1024;
export const CHAT_ENDS_AT = '2026-10-19T05:00:00Z';
export const DEADLINE_MS = 20_000;
export const utf8Size = (text: string): number => new TextEncoder().encode(text).length;
export const codePointLength = (text: string): number => [...text].length;
const textPart = z.strictObject({ type: z.literal('text'), text: z.string().min(1) });
const message = z.strictObject({
  id: z.string().min(1).max(100),
  role: z.enum(['user', 'assistant']),
  parts: z.array(textPart).length(1),
});
export const requestSchema = z.strictObject({ messages: z.array(message).min(1).max(7) })
  .superRefine(({ messages }, context) => {
    if (messages.length % 2 !== 1)
      context.addIssue({ code: 'custom', message: 'Incomplete history' });
    messages.forEach((item, index) => {
      const { text } = item.parts[0];
      const expectedRole = index % 2 === 0 ? 'user' : 'assistant';
      if (item.role !== expectedRole || !text.trim() || (item.role === 'user'
        ? codePointLength(text.trim()) > QUESTION_LIMIT
        : utf8Size(text) > ANSWER_LIMIT)) {
        context.addIssue({ code: 'custom', message: 'Invalid text history' });
      }
    });
    if (new Set(messages.map((item) => item.id)).size !== messages.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate message IDs' });
    }
  });
export function parseMessages(value: unknown): UIMessage[] {
  return requestSchema.parse(value).messages.map((item) => ({
    id: item.id,
    role: item.role,
    parts: [{ type: 'text', text: item.parts[0].text.trim() }],
  }));
}
export const messageText = (item: UIMessage): string => item.parts
  .filter((part) => part.type === 'text').map((part) => part.text).join('');
export type PublicErrorCode = 'invalid_input' | 'forbidden_origin' | 'body_too_large' | 'unsupported_content_type' | 'rate_limited' | 'unavailable';
export class ChatError extends Error {
  constructor(public status: number, public code: PublicErrorCode, public resetAt?: number) {
    super(code);
  }
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-classes, functional/no-class-inheritance */
