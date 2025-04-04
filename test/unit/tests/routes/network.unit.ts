import * as databaseUtils from '../../../../src/utils/database.js';
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/network.fixtures.js';
import buildFastify from '../../../../src/app.js';
import * as config from '../../../../src/config.js';
import { describe, expect, test, vi } from 'vitest';

describe('network service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      vi.stubEnv('BLOCKFROST_CONFIG_NETWORK', fixture.network);
      vi.spyOn(config, 'getConfig').mockReturnValue(config.loadConfig());

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

      const response = await supertest(fastify.server).get(fixture.endpoint);

      // expect(response).toMatchSnapshot();
      expect(response.body).toEqual(fixture.response);

      fastify.close();
    });
  });
});
