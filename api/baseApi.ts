import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

export class BaseApi {
  protected readonly request: APIRequestContext;
  protected readonly baseUrl: string;

  constructor(
    request: APIRequestContext,
    baseUrl: string
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  protected async get(
    endpoint: string,
    options?: Parameters<APIRequestContext['get']>[1]
  ): Promise<APIResponse> {
    return this.request.get(
      `${this.baseUrl}${endpoint}`,
      options
    );
  }

  protected async post(
    endpoint: string,
    options?: Parameters<APIRequestContext['post']>[1]
  ): Promise<APIResponse> {
    return this.request.post(
      `${this.baseUrl}${endpoint}`,
      options
    );
  }

  protected async put(
    endpoint: string,
    options?: Parameters<APIRequestContext['put']>[1]
  ): Promise<APIResponse> {
    return this.request.put(
      `${this.baseUrl}${endpoint}`,
      options
    );
  }

  protected async delete(
    endpoint: string,
    options?: Parameters<APIRequestContext['delete']>[1]
  ): Promise<APIResponse> {
    return this.request.delete(
      `${this.baseUrl}${endpoint}`,
      options
    );
  }
}
