import { test as base, expect } from './testFixture';
import { ChatbotPage } from '../pages/ChatbotPage';

type UIFixtures = {
  chatbotPage: ChatbotPage;
};

export const test = base.extend<UIFixtures>({
  chatbotPage: async ({ page }, use) => {
    const chatbotPage = new ChatbotPage(page);

    await use(chatbotPage);
  },
});

export { expect };