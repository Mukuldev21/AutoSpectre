
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './generated/tests',
  use: { headless: true }
});
