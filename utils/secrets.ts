export interface SecretsConfig {
  username: string;
  password: string;
  apiKey: string;
  clientSecret: string;
}

function getRequiredSecret(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Required secret "${name}" is not configured. ` +
      `Set it in .env locally or configure it in CI/CD.`
    );
  }

  return value;
}

const secrets: SecretsConfig = {
  username: getRequiredSecret('TEST_USERNAME'),
  password: getRequiredSecret('TEST_PASSWORD'),
  apiKey: getRequiredSecret('TEST_API_KEY'),
  clientSecret: getRequiredSecret('TEST_CLIENT_SECRET'),
};

export default secrets;