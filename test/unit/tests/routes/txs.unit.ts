/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/txs.fixtures';
import buildFastify from '../../../../src/app';
import * as databaseUtils from '../../../../src/utils/database';
import * as config from '../../../../src/config';
import { describe, expect, test } from 'vitest';

describe('txs service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const queryMockCsync = sinon.stub();
      const fastify = buildFastify({ maxParamLength: 32_768 });

      // @ts-ignore
      const getDbSync = sinon.stub(databaseUtils, 'getDbSync').resolves({
        release: () => null,
        query: queryMockCsync,
      });

      await fastify.ready();

      const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
        ...config.mainConfig,
        network: fixture.network === 'testnet' ? 'testnet' : 'mainnet',
      });

      queryMockCsync.onCall(0).resolves(fixture.sqlQueryMock);
      queryMockCsync.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMockCsync.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      sinonConfigStub.restore();
      getDbSync.restore();
      fastify.close();
    });
  });
});
