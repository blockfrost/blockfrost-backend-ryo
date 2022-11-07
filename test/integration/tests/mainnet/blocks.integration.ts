import { getInstance } from '../../utils';
import * as fixtures from '../../fixtures/mainnet/blocks';
import { describe, test, expect } from 'vitest';

describe('blocks endpoint', () => {
  fixtures.success.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(`[success] - ${fixture.testName}`, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toStrictEqual(fixture.response);
      });
    });
  });

  fixtures.errors.map(fixture => {
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

  test('/blocks/latest/txs', async () => {
    const client = getInstance();
    const response = await client.get('blocks/latest/txs').json();

    expect(response).toStrictEqual(expect.arrayContaining([expect.any(String)]));
  });
});
