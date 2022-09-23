import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/accounts';
import axios from 'axios';

describe('accounts endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      it(fixture.testName, async () => {
        const endpointUrl = getApiUrl(endpoint);
        const response = await axios.get(endpointUrl);
        const responseJson = response.data;

        expect(responseJson).toMatchObject(fixture.response);
      });
    });
  });

  it('/accounts/:stake_address/addresses/assets', async () => {
    const endpointUrl = getApiUrl(
      '/accounts/stake1u96ath3x32v7t4wp6vwf3nhpqmktatv5ews2w9rdalz25xs84d46c/addresses/assets',
    );
    const response = await axios.get(endpointUrl);
    const responseJson = response.data;

    if (responseJson.length > 0) {
      expect(responseJson).toStrictEqual(
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
