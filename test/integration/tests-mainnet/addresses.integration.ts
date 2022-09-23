import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/addresses';
import axios from 'axios';

describe('addresses endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      it(fixture.testName, async () => {
        const endpointUrl = getApiUrl(endpoint);
        const response = await axios.get(endpointUrl, { timeout: 120_000 });
        const responseJson = response.data;

        expect(responseJson).toMatchObject(fixture.response);
      });
    });
  });

  it('/addresses/:address/utxos', async () => {
    const endpointUrl = getApiUrl(
      '/addresses/addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w/utxos',
    );
    const response = await axios.get(endpointUrl);
    const responseJson = response.data;

    if (responseJson.length > 0) {
      expect(responseJson).toStrictEqual(
        expect.arrayContaining([
          {
            tx_hash: expect.any(String),
            tx_index: expect.any(Number),
            output_index: expect.any(Number),
            amount: expect.arrayContaining([
              { unit: expect.any(String), quantity: expect.any(String) },
            ]),
            block: expect.any(String),
            data_hash: expect.toBeTypeOrNull(String),
            inline_datum: expect.toBeTypeOrNull(String),
            reference_script_hash: expect.toBeTypeOrNull(String),
          },
        ]),
      );
    } else expect(responseJson).toEqual([]);
  });
});
