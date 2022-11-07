import { getInstance } from '../../utils';
import fixtures from '../../fixtures/common/health';
import { describe, test, expect } from 'vitest';

describe('health endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toStrictEqual(fixture.response);
      });
    });
  });
});
