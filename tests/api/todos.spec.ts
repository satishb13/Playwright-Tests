import { test, expect } from '../../fixtures/testFixture';
import { ApiValidator } from '../../utils/apiValidator';

test('GET todo by ID @api @smoke @critical', async ({ request, environment }) => {
  console.log(`Running API test against: ${environment.name}`);

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/todos/1'
  );

  await ApiValidator.status(response, 200);

  const data = await response.json();

  expect(data).toEqual({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  });
});