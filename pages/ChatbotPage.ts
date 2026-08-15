import { Page, Locator } from '@playwright/test';

export class ChatbotPage {
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly responseContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.messageInput = page.getByRole('textbox');
    this.sendButton = page.getByRole('button', { name: /send/i });
    this.responseContainer = page.locator('[data-testid="chatbot-response"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
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