import { test as base, expect } from './testFixture';

type AuthFixtures = {
  authenticated: boolean;
};

export const test = base.extend<AuthFixtures>({
  authenticated: async ({}, use) => {
    /*
     * Authentication will be implemented once the application's
     * real authentication mechanism is available.
     *
     * Possible implementations:
     * - UI login
     * - API authentication
     * - OAuth/SSO
     * - Playwright storageState
     */
    await use(true);
  },
});

export { expect };