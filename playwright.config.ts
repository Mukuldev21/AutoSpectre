
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.',
  testMatch: ['generated/tests/**/*.spec.ts', 'tests/**/*.spec.ts'],
  use: { headless: true }
});
