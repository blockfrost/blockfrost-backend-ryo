import fixtures from '../fixtures/fixtures-mainnet/accounts';
import { getInstance } from '../utils';
import { describe, test, expect } from 'vitest';

describe('accounts endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();
        const response = await client.get(endpoint);

        expect(response).toMatchObject(fixture.response);
      });
    });
  });

  test('/accounts/:stake_address/addresses/assets', async () => {
    const client = getInstance();
    const response = await client.get(endpoint);

    if (response.length > 0) {
      expect(response).toStrictEqual(
        expect.arrayContaining([
          {
            unit: expect.any(String),
            quantity: expect.any(String),
          },
        ]),
      );
    } else expect(responseJson).toEqual([]);
  });
});
