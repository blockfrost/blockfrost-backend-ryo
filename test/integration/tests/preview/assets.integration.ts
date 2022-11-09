import { getInstance } from '../../utils';
import fixtures from '../../fixtures/preview/assets';
import { describe, test, expect } from 'vitest';

describe('assets endpoint', () => {
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
