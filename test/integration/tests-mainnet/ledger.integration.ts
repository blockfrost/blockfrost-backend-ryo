import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/ledger';
import axios from 'axios';

describe('ledger endpoint', () => {
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
});
