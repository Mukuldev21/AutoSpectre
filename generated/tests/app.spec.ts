import { test, expect } from '@playwright/test';
import { AppPage } from '../../src/pages/AppPage';

test.describe('App Page Tests', () => {
  let appPage: AppPage;

  test.beforeEach(async ({ page }) => {
    appPage = new AppPage(page);
    await page.goto('https://target-url.com');
  });

  test('Authentication should login successfully', async () => {
    await test.step('Enter username', async () => {
      const userName = await appPage.userName();
      await userName.fill('test-username');
    });

    await test.step('Enter password', async () => {
      const password = await appPage.password();
      await password.fill('test-password');
    });

    await test.step('Click login button', async () => {
      const loginButton = await appPage.loginButton();
      await loginButton.click();
    });

    await test.step('Verify navigation to dashboard', async () => {
      await expect(appPage.dashboard()).toBeVisible();
    });
  });
});