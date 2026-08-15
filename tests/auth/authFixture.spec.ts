import { test, expect } from '../../fixtures/authFixture';

test('Authentication fixture is available @chatbot @smoke', async ({
  authenticated,
}) => {
  expect(authenticated).toBe(true);
});