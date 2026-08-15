import { test, expect } from '@playwright/test';

import {
  policyData,
  insurancePrompts,
  negativePrompts,
} from '../../utils/testData';

test('test data is loaded correctly @data @smoke', async () => {
  expect(policyData.length).toBeGreaterThan(0);
  expect(insurancePrompts.length).toBeGreaterThan(0);
  expect(negativePrompts.length).toBeGreaterThan(0);

  expect(policyData[0].policyId).toBeTruthy();
  expect(policyData[0].policyType).toBeTruthy();

  expect(insurancePrompts[0].prompt).toBeTruthy();
  expect(insurancePrompts[0].expectedTopics.length).toBeGreaterThan(0);

  expect(negativePrompts[0].prompt).toBeTruthy();
  expect(negativePrompts[0].expectedBehavior).toBeTruthy();
});