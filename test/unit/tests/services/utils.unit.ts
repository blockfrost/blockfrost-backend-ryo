import sinon from 'sinon';
import fixtures from '../../fixtures/utils.fixtures';
import * as config from '../../../../src/config';
import supertest from 'supertest';
import buildFastify from '../../../../src/app';
import jestOpenAPI from 'jest-openapi';
import path from 'path';

jestOpenAPI(path.join(__dirname, '../../../../node_modules/@blockfrost/openapi/openapi.yaml'));

describe('utils', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const fastify = buildFastify({ maxParamLength: 32_768 });

      await fastify.ready();

      const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
        ...config.mainConfig,
        network: fixture.network,
      });

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      sinonConfigStub.restore();
    });
  });
});
