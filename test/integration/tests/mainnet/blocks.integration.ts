import { getInstance } from '../../utils';
import fixtures from '../../fixtures/mainnet/blocks';
import axios from 'axios';
import { describe, test, expect } from 'vitest';

describe('blocks endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();

        if ('error' in fixture.response) {
          try {
            await client.get(endpoint).json();
            throw new Error(`Expected ${fixture.response} but axios did not throw`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              expect(error.response?.data).toMatchObject(fixture.response);
            }
          }
        } else {
          const response = await client.get(endpoint).json();

          expect(response).toMatchObject(fixture.response);
        }
      });
    });
  });

  test('/blocks/latest/txs', async () => {
    const client = getInstance();
    const response = await client.get('/blocks/latest/txs').json();

    expect(response).toStrictEqual(expect.arrayContaining([expect.any(String)]));
  });
});
