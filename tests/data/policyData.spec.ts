import { test, expect } from '@playwright/test';
import { policyData } from '../../utils/testData';

for (const policy of policyData) {
  test(
    `Validate policy test data - ${policy.policyId} @data @regression`,
    async () => {
      expect(policy.policyId).toBeTruthy();
      expect(policy.policyType).toBeTruthy();
      expect(policy.customerName).toBeTruthy();
      expect(policy.coverageAmount).toBeGreaterThan(0);
      expect(policy.status).toBeTruthy();
    }
  );
}