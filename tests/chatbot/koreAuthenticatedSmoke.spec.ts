import { test, expect } from '@playwright/test';

test('Kore.ai authenticated session is available @chatbot @smoke', async ({
  page,
}) => {
  await page.goto('/builder');

  //console.log('AUTHENTICATED TEST URL:', page.url());

  await expect(page).toHaveURL(/\/builder/);
});