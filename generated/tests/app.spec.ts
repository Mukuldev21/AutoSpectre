import { test, expect } from '@playwright/test';
import { AppPage } from '../../src/pages/AppPage';

test.describe('App Page Tests', () => {
  let appPage: AppPage;

  test.beforeEach(async ({ page }) => {
    appPage = new AppPage(page);
    await page.goto('https://www.saucedemo.com');
  });

  // Scenario 1: Happy Path
  test('Happy Path: Login and Add to Cart', async ({ page }) => {
    await test.step('Step 1: Enter username', async () => {
      const field = await appPage.userName();
      await field.fill('standard_user');
    });

    await test.step('Step 2: Enter password', async () => {
      const field = await appPage.password();
      await field.fill('secret_sauce');
    });

    await test.step('Step 3: Click login button', async () => {
      const button = await appPage.loginButton();
      await button.click();
    });

    await test.step('Step 4: Add to cart', async () => {
      const button = await appPage.addToCartButton();
      await button.click();
    });

    await test.step('Step 5: Verify shopping cart badge', async () => {
      const badge = await appPage.shoppingCartBadge();
      await expect(await badge.textContent()).toBe('1');
    });

    await test.step('Step 6: Take screenshot', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  // Scenario 2: Validation
  test('Validation: Invalid Login', async ({ page }) => {
    await test.step('Step 1: Enter invalid username', async () => {
      const field = await appPage.userName();
      await field.fill('invalid_user');
    });

    await test.step('Step 2: Enter invalid password', async () => {
      const field = await appPage.password();
      await field.fill('invalid_password');
    });

    await test.step('Step 3: Click login button', async () => {
      const button = await appPage.loginButton();
      await button.click();
    });

    await test.step('Step 4: Verify error message', async () => {
      const message = await appPage.errorMessage();
      await expect(await message.textContent()).toBe('Epic sadface: Username and password do not match any user in this service');
    });
  });

  // Scenario 3: Edge Case
  test('Edge Case: Empty Fields', async ({ page }) => {
    await test.step('Step 1: Click login button with empty fields', async () => {
      const button = await appPage.loginButton();
      await button.click();
    });

    await test.step('Step 2: Verify error message', async () => {
      const message = await appPage.errorMessage();
      await expect(await message.textContent()).toBe('Epic sadface: Username is required');
    });
  });
});