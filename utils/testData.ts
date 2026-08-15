import fs from 'fs';
import path from 'path';

import {
  PolicyData,
  InsurancePrompt,
  NegativePrompt,
} from '../data/types';

function loadJson<T>(fileName: string): T {
  const filePath = path.resolve(
    process.cwd(),
    'data',
    fileName
  );

  const fileContent = fs.readFileSync(
    filePath,
    'utf-8'
  );

  return JSON.parse(fileContent) as T;
}

export const policyData =
  loadJson<PolicyData[]>('policyData.json');

export const insurancePrompts =
  loadJson<InsurancePrompt[]>('insurancePrompts.json');

export const negativePrompts =
  loadJson<NegativePrompt[]>('negativePrompts.json');