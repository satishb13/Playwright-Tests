import { test, expect } from '../../fixtures/uiFixture';

test('Chatbot UI fixture is initialized @chatbot @smoke', async ({
  chatbotPage,
}) => {
  await chatbotPage.open();
  await chatbotPage.enterMessage('Hello');
  await chatbotPage.sendMessage();
  //await expect(chatbotPage.page).toHaveURL(/xo-webclient/);
  const response = await chatbotPage.getLatestResponse();
  expect(response).not.toBe('');
});