import * as databaseUtils from '../../../../src/utils/database.js';
import * as tokenRegistryUtils from '../../../../src/utils/token-registry.js';
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/addresses.fixtures.js';
import buildFastify from '../../../../src/app.js';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as config from '../../../../src/config.js';

describe('address service', () => {
  beforeEach(() => {
    vi.spyOn(tokenRegistryUtils, 'fetchAssetMetadata').mockImplementation(() => {
      return Promise.resolve(null);
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

      vi.spyOn(config, 'getConfig').mockReturnValue({
        ...config.mainConfig,
        network: fixture.network === 'testnet' ? 'testnet' : 'mainnet',
      });

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMock.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = fixture.unpaged
        ? await supertest(fastify.server)
            .get(fixture.endpoint)
            .set('unpaged', 'arbitraryStringValue')
        : await supertest(fastify.server).get(fixture.endpoint);

      // expect(response).toMatchSnapshot();
      expect(response.body).toEqual(fixture.response);

      fastify.close();
    });
  });
});
