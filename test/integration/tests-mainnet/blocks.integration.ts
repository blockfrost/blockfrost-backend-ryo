import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/blocks';
import axios from 'axios';
import { describe, test, expect } from 'vitest';

describe('blocks endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const endpointUrl = getApiUrl(endpoint);

        if ('error' in fixture.response) {
          try {
            await axios.get(endpointUrl);
            throw new Error(`Expected ${fixture.response} but axios did not throw`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              expect(error.response?.data).toMatchObject(fixture.response);
            }
          }
        } else {
          const response = await axios.get(endpointUrl);
          const responseJson = response.data;

          expect(responseJson).toMatchObject(fixture.response);
        }
      });
    });
  });

  test('/blocks/latest/txs', async () => {
    const endpointUrl = getApiUrl('/blocks/latest/txs');
    const response = await axios.get(endpointUrl);
    const responseJson = response.data;

    if (responseJson.length > 0) {
      expect(responseJson).toStrictEqual(expect.arrayContaining([expect.any(String)]));
    } else expect(responseJson).toEqual([]);
  });
});
