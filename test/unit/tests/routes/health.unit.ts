import buildFastify from '../../../../src/app.js';
import sinon from 'sinon';
import supertest from 'supertest';
import * as databaseUtils from '../../../../src/utils/database.js';
import { describe, expect, test, vi } from 'vitest';

describe('health endpoints tests', () => {
  test('responds with success on request /health', async () => {
    const queryMock = sinon.stub();
    const fastify = buildFastify();

    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
      // @ts-expect-error test
      release: () => null,
      query: queryMock,
    });

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: true });
    // expect(response).toMatchSnapshot();

    fastify.close();
  });

  test('responds with success on request /health/clock', async () => {
    const fastify = buildFastify();

    await fastify.ready();

    // Capture the time before the request
    const beforeTime = Date.now();
    const response = await supertest(fastify.server).get('/health/clock');
    const afterTime = Date.now();

    // Verify the response is a number within a reasonable time range
    expect(response.body).toHaveProperty('server_time');
    expect(typeof response.body.server_time).toBe('number');
    expect(response.body.server_time).toBeGreaterThanOrEqual(beforeTime);
    expect(response.body.server_time).toBeLessThanOrEqual(afterTime);
    // expect(response).toMatchSnapshot();

    fastify.close();
  });
});
