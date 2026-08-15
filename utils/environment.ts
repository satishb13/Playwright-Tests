import 'dotenv/config';
import fs from 'fs';
import path from 'path';

export type EnvironmentName = 'qa' | 'staging' | 'prod';

export interface EnvironmentConfig {
  name: EnvironmentName;
  baseUrl: string;
  apiBaseUrl: string;
  ragApiBaseUrl: string;
}

const environmentName = (process.env.TEST_ENV || 'qa') as EnvironmentName;

const supportedEnvironments: EnvironmentName[] = [
  'qa',
  'staging',
  'prod',
];

if (!supportedEnvironments.includes(environmentName)) {
  throw new Error(
    `Unsupported TEST_ENV: ${environmentName}. Supported values: qa, staging, prod`
  );
}

const environmentFile = path.join(
  process.cwd(),
  'environments',
  `${environmentName}.json`
);

if (!fs.existsSync(environmentFile)) {
  throw new Error(
    `Environment configuration file not found: ${environmentFile}`
  );
}

const environmentConfig: EnvironmentConfig = JSON.parse(
  fs.readFileSync(environmentFile, 'utf-8')
);

export default environmentConfig;