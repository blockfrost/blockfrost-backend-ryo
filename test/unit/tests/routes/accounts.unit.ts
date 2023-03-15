import supertest from 'supertest';
import sinon from 'sinon';
import { describe, expect, test, vi } from 'vitest';
import fixtures from '../../fixtures/accounts.fixtures.js';
import buildFastify from '../../../../src/app.js';
import * as config from '../../../../src/config.js';
import * as databaseUtils from '../../../../src/utils/database.js';

describe('accounts service', () => {
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
