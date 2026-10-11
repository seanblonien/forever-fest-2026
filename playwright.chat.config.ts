import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/chat',
  timeout: 10_000,
  retries: 0,
  fullyParallel: true,
});
