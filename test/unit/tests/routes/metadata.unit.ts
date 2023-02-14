import sinon from 'sinon';
import * as databaseUtils from '../../../../src/utils/database.js';
import supertest from 'supertest';
import fixtures from '../../fixtures/metadata.fixtures.js';
import buildFastify from '../../../../src/app.js';
import { describe, expect, test, vi } from 'vitest';

describe('metadata service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const queryMock = sinon.stub();
      const fastify = buildFastify({ maxParamLength: 32_768 });

      vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
        // @ts-expect-error test
        release: () => null,
        query: queryMock,
      });

      await fastify.ready();
      queryMock.onFirstCall().resolves(fixture.sqlQueryMock);
      const response = fixture.unpaged
        ? await supertest(fastify.server)
            .get(fixture.endpoint)
            .set('unpaged', 'arbitraryStringValue')
        : await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);
      fastify.close();
    });
  });
});
