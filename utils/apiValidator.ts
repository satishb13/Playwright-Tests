import { expect, APIResponse } from '@playwright/test';

export class ApiValidator {

  static async status(
    response: APIResponse,
    expectedStatus: number
  ): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  static async ok(
    response: APIResponse
  ): Promise<void> {
    expect(response.ok()).toBeTruthy();
  }

  static async json(
    response: APIResponse
  ): Promise<unknown> {
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');

    return response.json();
  }
}