import environment from './environment';

export function isProduction(): boolean {
  return environment.name === 'prod';
}

export function assertProductionSafeTest(testTitle: string): void {
  if (!isProduction()) {
    return;
  }

  if (!testTitle.includes('@critical')) {
    throw new Error(
      `Production safety violation: "${testTitle}" is not marked @critical. ` +
      `Only @critical tests are allowed to run against production.`
    );
  }
}