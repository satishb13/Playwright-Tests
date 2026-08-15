import { test, expect } from '@playwright/test';
import { insurancePrompts } from '../../utils/testData';

for (const promptData of insurancePrompts) {
  test(
    `Validate insurance prompt - ${promptData.id} @data @regression`,
    async () => {
      expect(promptData.prompt).toBeTruthy();
      expect(promptData.category).toBeTruthy();
      expect(promptData.expectedTopics.length).toBeGreaterThan(0);
    }
  );
}