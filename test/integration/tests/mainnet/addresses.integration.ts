import { getInstance } from '../../utils';
import fixtures from '../../fixtures/mainnet/addresses';
import { describe, test, expect } from 'vitest';

describe('addresses endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();

        if ('error' in fixture.response) {
          try {
            await client.get(endpoint).json();
          } catch (error) {
            console.log(error.response.body);
            expect(error.response.body).toEqual(fixture.response);
          }
        } else {
          const response = await client.get(endpoint).json();

          expect(response).toStrictEqual(fixture.response);
        }
      });
    });
  });
});
