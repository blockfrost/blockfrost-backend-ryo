/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/pools.fixtures.js';
import buildFastify from '../../../../src/app.js';
import * as databaseUtils from '../../../../src/utils/database.js';
import { describe, expect, test, vi } from 'vitest';

describe('pools service', () => {
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

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);

      const response = fixture.unpaged
        ? await supertest(fastify.server)
            .get(fixture.endpoint)
            .set('unpaged', 'arbitraryStringValue')
        : await supertest(fastify.server).get(fixture.endpoint);

      expect(response.body).toEqual(fixture.response);

      fastify.close();
    });
  });

  test('csyncClientError', async () => {
    const fastify = buildFastify({ maxParamLength: 32_768 });

    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
      // @ts-expect-error test
      release: () => null,
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

    fastify.close();
  });
});
