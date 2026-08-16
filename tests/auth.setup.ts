import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';

const authFile = 'playwright/.auth/kore-user.json';

setup('Authenticate with Kore.ai', async ({ page }) => {
  const username = process.env.KORE_USERNAME;
  const password = process.env.KORE_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'KORE_USERNAME and KORE_PASSWORD must be configured in .env'
    );
  }

  await page.goto('/');

  await page
    .getByRole('textbox', { name: 'Work Email ID' })
    .fill(username);

  await page
    .getByRole('button', { name: 'Continue' })
    .click();

  await page
    .getByRole('textbox', { name: 'Password' })
    .fill(password);

  const loginButton = page.getByRole('button', { name: 'Login' });

  await expect(loginButton).toBeEnabled();
  await loginButton.click();

  await expect(page).toHaveURL(/\/builder/, {
  timeout: 30000,
    });

  await page.context().storageState({
    path: authFile,
  });
});