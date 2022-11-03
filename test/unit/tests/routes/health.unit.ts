import buildFastify from '../../../../src/app';
import sinon from 'sinon';
import supertest from 'supertest';
import * as databaseUtils from '../../../../src/utils/database';
import { describe, expect, test } from 'vitest';

describe('health endpoints tests', () => {
  test('responds with success on request /health', async () => {
    const queryMock = sinon.stub();
    const fastify = buildFastify();

    // @ts-ignore
    const database = sinon.stub(databaseUtils, 'getDbSync').resolves({
      release: () => null,
      query: queryMock,
    });

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: true });
    expect(response).toSatisfyApiSpec();

    database.restore();
    fastify.close();
  });

  test('responds with success on request /health/clock', async () => {
    const fastify = buildFastify();

    await fastify.ready();
    const clock = sinon.useFakeTimers(new Date());
    const response = await supertest(fastify.server).get('/health/clock');

    expect(response.body).toEqual({ server_time: clock.now });
    expect(response).toSatisfyApiSpec();

    fastify.close();
    clock.restore();
  });
});
