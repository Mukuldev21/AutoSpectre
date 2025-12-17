
export async function generateTest(spec: any, url: string) {
  return \`
import { test, expect } from '@playwright/test';

test('[\${spec.flow}] smoke', async ({ page }) => {
  await page.goto('\${url}');
  await expect(page).toHaveTitle(/.+/);
});
\`;
}
