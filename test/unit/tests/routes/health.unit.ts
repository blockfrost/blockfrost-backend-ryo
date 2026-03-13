import buildFastify from '../../../../src/app.js';
import sinon from 'sinon';
import supertest from 'supertest';
import * as databaseUtils from '../../../../src/utils/database.js';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { mainConfig } from '../../../../src/config.js';

describe('health endpoints tests', () => {
  afterEach(() => {
    mainConfig.server.healthCheckDbTimeoutMs = undefined;
    vi.restoreAllMocks();
  });

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

  test('responds with is_healthy: false when DB connection exceeds healthCheckDbTimeoutMs', async () => {
    mainConfig.server.healthCheckDbTimeoutMs = 50;

    const fastify = buildFastify();

    // Never-resolving promise simulates a DB connection that hangs indefinitely.
    // The healthCheckDbTimeoutMs timer races it and wins, returning is_healthy: false.
    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue(new Promise(() => {}));

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: false });

    fastify.close();
  });

  test('does not log timeout error when DB responds before healthCheckDbTimeoutMs', async () => {
    // Use a short timeout so we can wait past it and verify the log never fires
    mainConfig.server.healthCheckDbTimeoutMs = 50;

    const fastify = buildFastify();
    const errorSpy = vi.spyOn(console, 'error');

    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue(
      // @ts-expect-error test
      Promise.resolve({ release: () => null }),
    );

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: true });

    // Wait past the timeout to ensure the timer was actually cancelled
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining('did not respond within'));

    fastify.close();
  });
});
