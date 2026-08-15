import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './baseApi';

export class ClaimsApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getClaim(claimId: string) {
    return this.get(`/claims/${claimId}`);
  }
}
