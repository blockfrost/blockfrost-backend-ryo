import { getInstance } from '../../utils';
import { fixturesError, fixturesSuccess } from '../../fixtures/mainnet/addresses';
import { describe, test, expect } from 'vitest';

describe('addresses endpoint', () => {
  fixturesSuccess.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(`[success] - ${fixture.testName}`, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toStrictEqual(fixture.response);
      });
    });
  });

  fixturesError.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(`[error] - ${fixture.testName}`, async () => {
        const client = getInstance();

        try {
          await client.get(endpoint).json();
        } catch (error) {
          expect(error.response.body).toStrictEqual(fixture.response);
        }
      });
    });
  });
});
