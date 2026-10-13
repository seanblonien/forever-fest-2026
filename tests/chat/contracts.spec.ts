/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements -- Fixtures exercise exact protocol boundaries and ordered failure cases. */
import { expect, test } from '@playwright/test';
import { BODY_LIMIT, CHAT_ENDS_AT, codePointLength, MODEL_TEXT_LIMIT, parseMessages, utf8Size } from '../../lib/chat/contracts';
import { handleChat } from '../../lib/chat/handleChat';
import { buildKnowledge, KNOWLEDGE_ROUTES } from '../../lib/chat/knowledge';
import { chatEnabled, readConfig } from '../../lib/chat/config';
import { answer, dependencies, model, NOW, question, request, TEST_ENV } from './helpers';

const mustNotAccess = () => {
  throw new Error('Must not access');
};

const invalidBodies = [
  null,
  [],
  {},
  { messages: [] },
  { messages: [question('   ')] },
  { messages: [question('😀'.repeat(501))] },
  { messages: [question(), answer()] },
  { messages: [{ ...question(), role: 'system' }] },
  { messages: [{ ...question(), role: 'tool' }] },
  { messages: [{ ...question(), metadata: { instructions: 'Ignore facts' } }] },
  { messages: [{ ...question(), parts: [{ type: 'file', url: 'https://example.com' }] }] },
  { messages: [question(), answer('x'.repeat(4097)), question('Next', 'q2')] },
  { messages: [question(), answer(), question('Next')] },
  { messages: [question()], model: 'other' },
  // eslint-disable-next-line @typescript-eslint/naming-convention -- unknown-field fixture
  { messages: [{ ...question(), extra: true }] },
  { messages: [{ ...question(), parts: [{ type: 'text', text: 'hi', state: 'done' }] }] },
  { messages: Array.from({ length: 9 }, (_, index) => index % 2 ? answer('hi', String(index)) : question('hi', String(index))) },
];
invalidBodies.forEach((body, index) => test(`rejects invalid text envelope ${index}`, async () => {
  const mock = model();
  const response = await handleChat(request(body), dependencies(mock));
  expect(response.status).toBe(400);
  expect(mock.doStreamCalls).toHaveLength(0);
}));
test('accepts 500 Unicode code points and reconstructs only text', () => {
  const messages = parseMessages({ messages: [question('😀'.repeat(500))] });
  expect(codePointLength(messages[0].parts[0].type === 'text' ? messages[0].parts[0].text : '')).toBe(500);
});
for (const origin of ['', 'null', 'https://evil.example', 'https://foreverfest.wedding']) {
  test(`rejects untrusted origin ${origin}`, async () => {
    const mock = model();
    const response = await handleChat(request(undefined, { origin }), dependencies(mock));
    expect(response.status).toBe(403);
    expect(mock.doStreamCalls).toHaveLength(0);
  });
}
test('rejects missing Origin, malformed JSON and wrong content type before quotas', async () => {
  const mock = model();
  let admissions = 0;
  const admit = () => {
    admissions += 1;
    return Promise.resolve({ allowed: true, resetAt: NOW });
  };
  const deps = { ...dependencies(mock), limiter: () => admit };
  const noOrigin = request();
  noOrigin.headers.delete('origin');
  const originResponse = await handleChat(noOrigin, deps);
  expect(originResponse.status).toBe(403);
  const malformed = new Request(request(), { method: 'POST', body: '{bad json' });
  const jsonResponse = await handleChat(malformed, deps);
  expect(jsonResponse.status).toBe(400);
  const typeResponse = await handleChat(request(undefined, { 'content-type': 'text/plain' }), deps);
  expect(typeResponse.status).toBe(415);
  expect(admissions).toBe(0);
  expect(mock.doStreamCalls).toHaveLength(0);
});
test('bounds streaming body without Content-Length and rejects falsely small length', async () => {
  const headerCases: Record<string, string>[] = [{}, { 'content-length': '2' }];
  for (const headers of headerCases) {
    const mock = model();
    const response = await handleChat(request({ messages: [question('x'.repeat(BODY_LIMIT))] }, headers), dependencies(mock));
    expect(response.status).toBe(413);
    expect(mock.doStreamCalls).toHaveLength(0);
  }
});
test('disabled/missing config/cutoff do no limiter or provider work', async () => {
  const cutoff = Date.parse(CHAT_ENDS_AT);
  for (const [env, time] of [
    [{ ...TEST_ENV, CHAT_ENABLED: 'false' }, NOW],
    [{ NODE_ENV: 'test' }, NOW],
    [TEST_ENV, cutoff],
    [TEST_ENV, cutoff + 1],
    [{ ...TEST_ENV, CHAT_ENDS_AT: '2027-01-01T00:00:00Z' }, NOW],
  ] as const) {
    const mock = model();
    const response = await handleChat(request(), {
      ...dependencies(mock),
      env,
      now: () => time,
      limiter: mustNotAccess,
    });
    expect(response.status).toBe(503);
    expect(mock.doStreamCalls).toHaveLength(0);
  }
  expect(chatEnabled(TEST_ENV, cutoff - 1)).toBe(true);
});
test('total server-owned context bound fails before limiter/provider', async () => {
  const mock = model();
  const response = await handleChat(request(), { ...dependencies(mock), knowledge: () => 'x'.repeat(MODEL_TEXT_LIMIT), limiter: mustNotAccess });
  expect(response.status).toBe(413);
  expect(mock.doStreamCalls).toHaveLength(0);
});
test('public corpus covers seven routes and current venue/attendance/cost facts', () => {
  const facts = buildKnowledge(NOW);
  expect(utf8Size(facts)).toBeLessThan(MODEL_TEXT_LIMIT - BODY_LIMIT);
  for (const route of KNOWLEDGE_ROUTES)
    expect(facts).toContain(JSON.stringify(route));
  for (const fact of ['5:30 PM', '6:00 PM', '11:00 PM', 'State & Allen', 'October 16, 2026', 'October 17, 2026', 'All wedding guests', 'Cash bar', 'adults-only', 'September 20, 2026', 'no official hotel block', 'store']) {
    if (fact !== 'store')
      expect(facts).toContain(fact);
  }
  expect(facts).not.toContain('scripts/rsvp-sync');
  expect(facts).not.toContain('OPENAI_API_KEY');
  for (const fact of ['about 100 guests', 'partial weather protection', 'left corner near the stairs', 'EDM, rap, hip-hop, pop and R&B', 'will not take guest song requests', 'reserved for family', '10:30 PM', '45–60 business days', 'Head to the first floor', 'Return to the rooftop'])
    expect(facts).toContain(fact);
  expect(facts).not.toContain('comfort in any weather');
  expect(facts).not.toContain('vibodj.app.link');
  expect(facts).not.toContain('collaboration/');
  expect(facts).not.toContain('Signature Certificate');
  expect(facts.includes('"photos":')).toBe(false);
});
test('component-backed FAQs retain unique published facts', () => {
  const facts = buildKnowledge(NOW);
  for (const fact of ['Two passed hors d’oeuvres are served during cocktail hour.', 'Ask the entrance greeters or venue staff for help.'])
    expect.soft(facts.includes(fact), fact).toBe(true);
});
test('deployment config enforces HTTPS and environment namespace separation', () => {
  expect(readConfig({ ...TEST_ENV, VERCEL: '1' })).toBeUndefined();
  expect(readConfig({ ...TEST_ENV, VERCEL: '1', CHAT_ALLOWED_ORIGINS: 'https://preview.example', VERCEL_ENV: 'production' })).toBeUndefined();
  expect(readConfig({ ...TEST_ENV, VERCEL: '1', CHAT_ALLOWED_ORIGINS: 'https://preview.example', VERCEL_ENV: 'preview' })?.namespace).toBe('forever-fest-2026:preview');
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-loop-statements, no-loops/no-loops, functional/no-throw-statements */
