import { createOpenAI } from '@ai-sdk/openai';
import { handleChat } from '@/lib/chat/handleChat';
import { createLimiter } from '@/lib/chat/limits';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleChat(request, {
    model: (config) => createOpenAI({ apiKey: config.apiKey }).responses('gpt-6-luna'),
    limiter: createLimiter,
    // Numeric usage only: never log prompts, answers, credentials, IPs, or session IDs.
    onUsage: (usage) => {
      process.stdout.write(`${JSON.stringify({ event: 'wedding-chat-usage', ...usage })}\n`);
    },
  });
}
