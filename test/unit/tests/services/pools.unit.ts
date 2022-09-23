/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/pools.fixtures';
import buildFastify from '../../../../src/app';
import * as databaseUtils from '../../../../src/utils/database';
import jestOpenAPI from 'jest-openapi';
import path from 'path';

jestOpenAPI(path.join(__dirname, '../../../../node_modules/@blockfrost/openapi/openapi.yaml'));

describe('pools service', () => {
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

      queryMockCsync.onCall(0).resolves(fixture.sqlQueryMock);
      queryMockCsync.onCall(1).resolves(fixture.sqlQueryMock2);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      getDbSync.restore();
      fastify.close();
    });
  });

  test('csyncClientError', async () => {
    //const queryMockCsync = sinon.stub();
    const fastify = buildFastify({ maxParamLength: 32_768 });

    // @ts-ignore
    const getDbSync = sinon.stub(databaseUtils, 'getDbSync').resolves({
      release: () => null,
      // @ts-ignore
      query: undefined,
    });

    await fastify.ready();

    const response = await supertest(fastify.server).get('/pools');

    expect(response).toSatisfyApiSpec();
    expect(response.body).toEqual({
      error: 'Internal Server Error',
      message: 'An unexpected response was received from the backend.',
      status_code: 500,
    });

    getDbSync.restore();
    fastify.close();
  });
});
