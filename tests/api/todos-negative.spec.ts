import { test } from '../../fixtures/testFixture';
import { ApiValidator } from '../../utils/apiValidator';

test(
  'GET non-existing todo returns 404 @api @negative @regression',
  async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/todos/999999'
    );

    await ApiValidator.status(response, 404);
  }
);