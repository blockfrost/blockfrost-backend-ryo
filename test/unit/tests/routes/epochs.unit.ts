import sinon from 'sinon';
import supertest from 'supertest';
import * as databaseUtils from '../../../../src/utils/database';
import fixtures from '../../fixtures/epochs.fixtures';
import buildFastify from '../../../../src/app';
import { describe, expect, test } from 'vitest';

describe('epochs service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const queryMock = sinon.stub();
      const fastify = buildFastify({ maxParamLength: 32_768 });

      // @ts-ignore
      const database = sinon.stub(databaseUtils, 'getDbSync').resolves({
        release: () => null,
        query: queryMock,
      });

      await fastify.ready();

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMock.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      database.restore();
      fastify.close();
    });
  });
});
