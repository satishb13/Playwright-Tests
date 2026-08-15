import { test, expect } from '@playwright/test';
import { negativePrompts } from '../../utils/testData';

for (const promptData of negativePrompts) {
  test(
    `Validate negative prompt - ${promptData.id} @data @negative @regression`,
    async () => {
      expect(promptData.id).toBeTruthy();
      expect(promptData.category).toBeTruthy();
      expect(promptData.prompt).toBeTruthy();
      expect(promptData.expectedBehavior).toBeTruthy();
    }
  );
}