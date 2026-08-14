import { test, expect } from '@playwright/test';

test('GET todo by ID', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/todos/1'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toEqual({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  });
});