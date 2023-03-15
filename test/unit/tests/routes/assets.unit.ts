import sinon from 'sinon';
import * as databaseUtils from '../../../../src/utils/database.js';
import * as tokenRegistryUtils from '../../../../src/utils/token-registry.js';
import supertest from 'supertest';
import fixtures from '../../fixtures/assets.fixtures.js';
import buildFastify from '../../../../src/app.js';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('assets service', () => {
  beforeEach(() => {
    vi.spyOn(tokenRegistryUtils, 'fetchAssetMetadata').mockImplementation((asset: string) => {
      if (
        // all these are mocked as nutcoin in fixtures
        asset === '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7' ||
        asset === '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e' ||
        asset === '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e'
      ) {
        return Promise.resolve({
          decimals: null,
          description: 'The legendary Nutcoin, the first native asset minted on Cardano.',
          logo: 'fakelogo',
          name: 'nutcoin',
          ticker: 'NUT',
          url: 'https://fivebinaries.com/nutcoin',
        });
      } else {
        return Promise.resolve(null);
      }
    });
  });

  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const fastify = buildFastify({ maxParamLength: 32_768 });
      const queryMock = sinon.stub();

      vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
        // @ts-expect-error test
        release: () => null,
        query: queryMock,
      });

      await fastify.ready();

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);

      const response = fixture.unpaged
        ? await supertest(fastify.server)
            .get(fixture.endpoint)
            .set('unpaged', 'arbitraryStringValue')
        : await supertest(fastify.server).get(fixture.endpoint);

      // expect(response).toMatchSnapshot();
      expect(response.body).toStrictEqual(fixture.response);

      fastify.close();
    });
  });
});
