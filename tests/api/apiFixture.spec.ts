import { test, expect } from '../../fixtures/apiFixture';

test('API fixtures are initialized correctly @api @smoke', async ({
  claimsApi,
  policyApi,
  ragApi,
}) => {
  expect(claimsApi).toBeTruthy();
  expect(policyApi).toBeTruthy();
  expect(ragApi).toBeTruthy();
});