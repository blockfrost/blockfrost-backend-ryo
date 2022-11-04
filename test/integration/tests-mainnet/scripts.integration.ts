import { getInstance } from '../utils';
import fixtures from '../fixtures/fixtures-mainnet/scripts';
import { describe, test, expect } from 'vitest';

describe('scripts endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toStrictEqual(fixture.response);
      });
    });
  });
});
