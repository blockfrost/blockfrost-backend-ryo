import { getInstance } from '../../utils';
import fixtures from '../../fixtures/mainnet/epochs';
import { describe, test, expect } from 'vitest';

describe('epochs endpoint', () => {
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
