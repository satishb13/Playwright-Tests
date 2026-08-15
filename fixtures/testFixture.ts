import { test as base, expect } from '@playwright/test';
import environment, {
  EnvironmentConfig,
} from '../utils/environment';
import { assertProductionSafeTest } from '../utils/environmentGuard';

type FrameworkFixtures = {
  environment: EnvironmentConfig;
  productionSafety: void;
};

export const test = base.extend<FrameworkFixtures>({
  environment: async ({}, use) => {
    await use(environment);
  },

  productionSafety: [
    async ({}, use, testInfo) => {
      assertProductionSafeTest(testInfo.title);

      await use();
    },
    { auto: true },
  ],
});

export { expect };