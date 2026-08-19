import { Page, Locator } from '@playwright/test';
import environment from '../utils/environment';

export class ChatbotPage {
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly responseContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.messageInput = page.getByPlaceholder('Type a message');
    this.sendButton = page.getByRole('button', { name: /send/i });
    this.responseContainer = page.locator('.bot-bubble-content');
  }

  async open(): Promise<void> {
  await this.page.goto(environment.chatbotBaseUrl);
}

  async enterMessage(message: string): Promise<void> {
    await this.messageInput.fill(message);
  }

  async sendMessage(): Promise<void> {
    await this.sendButton.click();
  }

  async getLatestResponse(): Promise<string> {
    return (await this.responseContainer.last().textContent())?.trim() ?? '';
  }
}