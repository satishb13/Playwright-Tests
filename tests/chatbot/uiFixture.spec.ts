import { test, expect } from '../../fixtures/uiFixture';

test('Chatbot UI fixture is initialized @chatbot @smoke', async ({
  chatbotPage,
}) => {
  expect(chatbotPage).toBeTruthy();
});