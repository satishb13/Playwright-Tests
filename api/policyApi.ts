import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './baseApi';

export class PolicyApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getPolicy(policyId: string) {
    return this.get(`/policies/${policyId}`);
  }
}
