import {
  APIRequestContext,
  expect,
} from '@playwright/test';

import { test as base } from './testFixture';

import { ClaimsApi } from '../api/claimsApi';
import { PolicyApi } from '../api/policyApi';
import { RagApi } from '../api/ragApi';

import { EnvironmentConfig } from '../utils/environment';

type ApiFixtures = {
  claimsApi: ClaimsApi;
  policyApi: PolicyApi;
  ragApi: RagApi;
};

type ApiFixtureArgs = {
  request: APIRequestContext;
  environment: EnvironmentConfig;
};

export const test = base.extend<ApiFixtures>({
  claimsApi: async (
    { request, environment }: ApiFixtureArgs,
    use: (claimsApi: ClaimsApi) => Promise<void>
  ) => {
    await use(
      new ClaimsApi(request, environment.apiBaseUrl)
    );
  },

  policyApi: async (
    { request, environment }: ApiFixtureArgs,
    use: (policyApi: PolicyApi) => Promise<void>
  ) => {
    await use(
      new PolicyApi(request, environment.apiBaseUrl)
    );
  },

  ragApi: async (
    { request, environment }: ApiFixtureArgs,
    use: (ragApi: RagApi) => Promise<void>
  ) => {
    await use(
      new RagApi(request, environment.ragApiBaseUrl)
    );
  },
});

export { expect };