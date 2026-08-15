import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './baseApi';

export class RagApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async retrieve(query: string) {
    return this.post('/retrieve', {
      data: {
        query,
      },
    });
  }
}
