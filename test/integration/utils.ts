import { expect, test, describe } from 'vitest';
import { Fixture } from '@blockfrost/blockfrost-tests';
import { noCase } from 'change-case';
import got from 'got';

export const getInstance = () => {
  return got.extend({
    responseType: 'json',
    prefixUrl: 'http://localhost:3000',
    https: {
      rejectUnauthorized: false,
    },
  });
};

const client = getInstance();

export const generateTest = (fixture: Fixture, endpoint: string) => {
  if (fixture.isCached) {
    return;
  }

  test(fixture.testName, async () => {
    if ('error' in fixture.response) {
      try {
        await client.get(endpoint).json();
        throw new Error(`Expected ${fixture.response} but did not throw`);
      } catch (error: any) {
        expect(error.response.body).toStrictEqual(fixture.response);
      }
    } else {
      const response = await client.get(endpoint).json();

      expect(response).toStrictEqual(response);
    }
  });
};

export const generateTestSuite = (fixtures: Record<string, Fixture[]>) => {
  for (const fixtureName of Object.keys(fixtures)) {
    const f = fixtures[fixtureName];

    describe(`${noCase(fixtureName)} endpoints`, () => {
      for (const fixture of f) {
        for (const endpoint of fixture.endpoints) {
          generateTest(fixture, endpoint);
        }
      }
    });
  }
};
