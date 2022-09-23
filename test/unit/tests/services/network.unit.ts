import * as databaseUtils from '../../../../src/utils/database';
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/network.fixtures';
import buildFastify from '../../../../src/app';
import jestOpenAPI from 'jest-openapi';
import path from 'path';
import * as config from '../../../../src/config';

jestOpenAPI(path.join(__dirname, '../../../../node_modules/@blockfrost/openapi/openapi.yaml'));

describe('network service', () => {
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

      const sinonConfigStub = sinon
        .stub(config, 'getConfig')
        .returns({ ...config.mainConfig, network: fixture.network });

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      sinonConfigStub.restore();
      database.restore();
      fastify.close();
    });
  });
});
