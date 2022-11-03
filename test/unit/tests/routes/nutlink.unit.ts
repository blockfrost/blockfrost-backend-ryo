/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/nutlink.fixtures';
import buildFastify from '../../../../src/app';
import * as databaseUtils from '../../../../src/utils/database';
import * as config from '../../../../src/config';
import { describe, expect, test } from 'vitest';

describe('nutlink service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const fastify = buildFastify({ maxParamLength: 32_768 });
      const queryMock = sinon.stub();

      // @ts-ignore
      const database = sinon.stub(databaseUtils, 'getDbSync').resolves({
        release: () => null,
        query: queryMock,
      });

      await fastify.ready();

      const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
        ...config.mainConfig,
        network: fixture.network === 'testnet' ? 'testnet' : 'mainnet',
      });

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMock.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      sinonConfigStub.restore();
      database.restore();
      fastify.close();
    });
  });
});
