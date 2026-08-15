export interface PolicyData {
  policyId: string;
  policyType: string;
  customerName: string;
  coverageAmount: number;
  status: string;
}

export interface InsurancePrompt {
  id: string;
  category: string;
  prompt: string;
  expectedTopics: string[];
}

export interface NegativePrompt {
  id: string;
  category: string;
  prompt: string;
  expectedBehavior: string;
}