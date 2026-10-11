/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-throw-statements, functional/no-loop-statements, no-loops/no-loops -- Protocol fixtures and specified viewport dimensions. */
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { CHAT_ENDS_AT } from '../../lib/chat/contracts';

const streamBody = (text = 'Please arrive at 5:30 PM.'): string => {
  const frames = [
    { type: 'start', messageId: 'a-fixture' },
    { type: 'start-step' },
    { type: 'text-start', id: 't' },
    { type: 'text-delta', id: 't', delta: text.slice(0, 14) },
    { type: 'text-delta', id: 't', delta: text.slice(14) },
    { type: 'text-end', id: 't' },
    { type: 'finish-step' },
    { type: 'finish', finishReason: 'stop' },
  ].map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join('');
  return `${frames}data: [DONE]\n\n`;
};

async function mockStream(page: Page, text?: string) {
  const calls: unknown[] = [];
  await page.route('**/api/chat', async (route) => {
    calls.push(route.request().postDataJSON() as unknown);
    await route.fulfill({ status: 200, contentType: 'text/event-stream', headers: { 'x-vercel-ai-ui-message-stream': 'v1', 'cache-control': 'no-store' }, body: streamBody(text) });
  });
  // Delay individual SSE frames after the protocol-correct intercepted response.
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);
      let url: string;
      if (typeof input === 'string') url = input;
      else if (input instanceof URL) url = input.href;
      else url = input.url;
      if (!url.endsWith('/api/chat') || !response.ok) return response;
      const responseText = await response.text();
      const frames = responseText.split('\n\n').filter(Boolean);
      const encoder = new TextEncoder();
      const body = new ReadableStream({
        async pull(controller) {
          await new Promise((resolve) => {
            setTimeout(resolve, 130);
          });
          if (init?.signal?.aborted) {
            controller.error(new DOMException('Aborted', 'AbortError'));
            return;
          }
          const frame = frames.shift();
          if (frame) controller.enqueue(encoder.encode(`${frame}\n\n`));
          else controller.close();
        },
      });
      return new Response(body, { status: 200, headers: response.headers });
    };
  });
  return calls;
}

// eslint-disable-next-line max-lines-per-function -- Group independent active-chat cases under one lifecycle gate.
test.describe('active wedding chat', () => {
  test.skip(Date.now() >= Date.parse(CHAT_ENDS_AT), 'The feature lifecycle ended; contract tests still exercise the immutable server cutoff.');
  test('desktop streams incrementally, keeps focus, restores on refresh/navigation without replay', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const calls = await mockStream(page);
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    const composer = page.getByLabel('Your question');
    await composer.fill('What time should I arrive?');
    expect(calls).toHaveLength(0);
    await composer.press('Enter');
    await expect(composer).toBeFocused();
    await expect(page.getByRole('button', { name: 'Stop', exact: true })).toBeVisible();
    const history = page.getByRole('region', { name: 'Chat history' });
    await expect(history).toContainText('Please arrive');
    await expect(page.getByRole('button', { name: 'Stop', exact: true })).toBeVisible();
    await expect(history).toContainText('5:30 PM');
    await expect(page.getByRole('status')).toHaveText('Answer complete.');
    expect(calls).toHaveLength(1);
    await page.reload();
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(history).toContainText('5:30 PM');
    expect(calls).toHaveLength(1);
    await page.getByRole('link', { name: 'SCHEDULE', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Schedule', exact: true })).toBeVisible();
    await page.goBack();
    await expect(history).toContainText('5:30 PM');
    expect(calls).toHaveLength(1);
    await page.screenshot({ path: 'test-results/chat-desktop.png', fullPage: false });
    await page.getByRole('button', { name: 'New chat' }).click();
    await expect(history).toHaveText('Hey! What can I help you with?');
    await page.reload();
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(history).toHaveText('Hey! What can I help you with?');
    expect(calls).toHaveLength(1);
  });

  test('390px mobile Stop/New chat discard partial answers and never resume on reload', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const calls = await mockStream(page);
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    const composer = page.getByLabel('Your question');
    await composer.fill('What is the dress code?');
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Chat history' })).toContainText('Please arrive');
    await page.getByRole('button', { name: 'Stop', exact: true }).click();
    await expect(page.getByText('Answer stopped', { exact: true })).toBeVisible();
    await page.reload();
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Chat history' })).toHaveText('Hey! What can I help you with?');
    expect(calls).toHaveLength(1);
    await composer.fill('Where is the wedding?');
    await composer.press('Enter');
    await expect(page.getByRole('button', { name: 'Stop', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'New chat' }).click();
    await expect(page.getByRole('region', { name: 'Chat history' })).toHaveText('Hey! What can I help you with?');
    await expect(page.getByRole('status')).toHaveText('New chat started.');
    await page.screenshot({ path: 'test-results/chat-mobile.png', fullPage: false });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('navigation keeps the shared chat and its in-progress stream', async ({ page }) => {
    const calls = await mockStream(page);
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await page.getByLabel('Your question').fill('When?');
    await page.getByLabel('Your question').press('Enter');
    await expect(page.getByRole('button', { name: 'Stop', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'TRAVEL', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Travel', exact: true })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('Answer complete.');
    await page.goBack();
    await expect(page.getByRole('region', { name: 'Chat history' })).toContainText('5:30 PM');
    expect(calls).toHaveLength(1);
  });

  test('storage failures/tampering stay usable and input respects Shift+Enter/IME/Unicode', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error('Storage blocked');
      };
      Storage.prototype.setItem = () => {
        throw new Error('Storage blocked');
      };
      Storage.prototype.removeItem = () => {
        throw new Error('Storage blocked');
      };
    });
    const calls = await mockStream(page);
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(page.getByLabel('Your question')).toBeEnabled();
    const composer = page.getByLabel('Your question');
    await composer.fill('Hi');
    await composer.press('Shift+Enter');
    await expect(composer).toHaveValue('Hi\n');
    expect(calls).toHaveLength(0);
    await composer.dispatchEvent('keydown', { key: 'Enter', isComposing: true });
    expect(calls).toHaveLength(0);
    await composer.fill('😀'.repeat(501));
    await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeDisabled();
    await composer.fill('😀'.repeat(500));
    await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeEnabled();
    await composer.fill('When?');
    await composer.press('Enter');
    await expect(page.getByRole('status')).toHaveText('Answer complete.');
    await page.getByRole('button', { name: 'New chat' }).click();
    await expect(page.getByRole('region', { name: 'Chat history' })).toHaveText('Hey! What can I help you with?');
  });

  test('restored history sends only last three completed pairs; output remains escaped text', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('forever-fest-chat:v1', JSON.stringify({ version: 1, pairs: Array.from({ length: 8 }, (_, index) => ({ question: { id: `q${index}`, text: 'When?' }, answer: { id: `a${index}`, text: '5:30 PM.' } })) }));
    });
    const calls = await mockStream(page, '<img src=x onerror=alert(1)> **Text only**');
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Chat history' })).toContainText('5:30 PM');
    expect(calls).toHaveLength(0);
    await page.getByLabel('Your question').fill('Next?');
    await page.getByLabel('Your question').press('Enter');
    await expect(page.getByRole('status')).toHaveText('Answer complete.');
    expect(calls[0]).toMatchObject({ messages: expect.any(Array) });
    const body = calls[0] as { messages: { id: string; role: string }[] };
    expect(body.messages).toHaveLength(7);
    expect(body.messages[0].id).toBe('q5');
    const history = page.getByRole('region', { name: 'Chat history' });
    await expect(history).toContainText('<img src=x onerror=alert(1)> **Text only**');
    await expect(history.locator('img')).toHaveCount(0);
  });

  for (const status of [400, 403, 413, 415, 429, 503]) {
    test(`HTTP ${status} preserves FAQs and maps to safe copy`, async ({ page }) => {
      await page.route('**/api/chat', (route) => route.fulfill({ status, json: { code: status === 429 ? 'rate_limited' : 'unavailable', message: 'private provider details', resetAt: Date.now() + 60_000 } }));
      await page.goto('/faqs');
      await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
      await page.getByLabel('Your question').fill('When?');
      await page.getByLabel('Your question').press('Enter');
      let expected = 'unavailable';
      if (status === 429) expected = 'try again after';
      else if (status === 400 || status === 413) expected = 'too large or invalid';
      await expect(page.getByRole('status')).toContainText(expected);
      await expect(page.getByRole('status')).not.toContainText('private');
      await expect(page.getByRole('button', { name: /Event Details/ })).toBeVisible();
      await page.getByRole('button', { name: /Event Details/ }).click();
      await expect(page.getByRole('heading', { name: 'When is the wedding?' })).toBeVisible();
    });
  }

  test('malformed stored history restores without issuing requests', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('forever-fest-chat:v1', '{malformed'));
    const calls = await mockStream(page);
    await page.goto('/faqs');
    await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
    await expect(page.getByLabel('Your question')).toBeEnabled();
    await expect(page.getByRole('region', { name: 'Chat history' })).toHaveText('Hey! What can I help you with?');
    expect(calls).toHaveLength(0);
  });
});

test('FAQ anchors, schedule facts, and external redirects retain their behavior', async ({ page, request }) => {
  await page.goto('/faqs#wedding-faqs');
  await expect(page.locator('#wedding-faqs')).toBeVisible();
  await page.getByRole('button', { name: /Event Details/ }).click();
  await expect(page.getByRole('heading', { name: 'When is the wedding?' })).toBeVisible();
  await expect(page.locator('#wedding-faqs')).toContainText('6:00 PM to 11:00 PM CDT');
  await page.goto('/schedule');
  await expect(page.locator('main')).toContainText('5:30 PM');
  await expect(page.locator('main')).toContainText('6:00 PM');
  await expect(page.locator('main')).toContainText('11:00 PM');
  await expect(page.locator('main')).toContainText('All wedding guests are welcome! No separate RSVP needed.');
  await expect(page.locator('main')).toContainText('State & Allen Kitchen + Bar');
  for (const [path, destination] of [
    ['/rsvp-form', 'https://form.jotform.com/253148903936161'],
    ['/address', 'https://form.jotform.com/251896494421062'],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
});

test('after lifecycle shutdown, the unavailable panel keeps FAQs usable', async ({ page }) => {
  test.skip(Date.now() < Date.parse(CHAT_ENDS_AT), 'Runs when the actual server lifecycle has ended.');
  await page.goto('/faqs');
  await page.getByRole('button', { name: 'Ask about Forever Fest', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Forever Fest Help' })).toContainText('Chat is unavailable');
  await expect(page.getByLabel('Your question')).toHaveCount(0);
  await page.getByRole('button', { name: 'Close chat', exact: true }).click();
  await page.getByRole('button', { name: /Event Details/ }).click();
  await expect(page.getByRole('heading', { name: 'When is the wedding?' })).toBeVisible();
});
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-throw-statements, functional/no-loop-statements, no-loops/no-loops */
