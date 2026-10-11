import { defineConfig } from '@playwright/test';

// Explicit, opt-in service checks. Never included in validate or CI.
export default defineConfig({ testDir: './tests/live', testMatch: 'redis.spec.ts', timeout: 30_000, retries: 0, workers: 1 });
