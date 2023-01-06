import { expect, test, describe } from 'vitest';
import { noCase } from 'change-case';
import got from 'got';

type Fixture = {
  testName: string;
  isCached?: boolean;
  endpoints: string[];
  response: any;
};

const prefixUrl = process.env.SERVER_URL || 'http://localhost:3000';

export const getInstance = () => {
  return got.extend({
    responseType: 'json',
    prefixUrl,
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
