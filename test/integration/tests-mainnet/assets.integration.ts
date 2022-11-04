import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/assets';
import axios from 'axios';
import { describe, test, expect } from 'vitest';

describe('assets endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const endpointUrl = getApiUrl(endpoint);
        const response = await axios.get(endpointUrl, { timeout: 60_000 });
        const responseJson = response.data;

        expect(responseJson).toMatchObject(fixture.response);
      });
    });
  });
});
