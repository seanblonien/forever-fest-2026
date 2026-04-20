import { expect, test } from '@playwright/test';

const pageRoutes = [
  { path: '/our-story', heading: 'Our Story' },
  { path: '/schedule', heading: 'Schedule' },
  { path: '/travel', heading: 'Travel' },
  { path: '/registry', heading: 'Registry' },
  { path: '/faqs', heading: 'FAQs' },
  { path: '/rsvp', heading: 'RSVP' },
] as const;

test('home page loads the main navigation', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Forever Fest 2026/i);
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('link', { name: 'OUR STORY' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'RSVP' })).toBeVisible();
});

pageRoutes.forEach((route) => {
  test(`${route.path} renders its main heading`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
  });
});
