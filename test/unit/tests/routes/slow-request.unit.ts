import buildFastify from '../../../../src/app.js';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { mainConfig } from '../../../../src/config.js';
import * as databaseUtils from '../../../../src/utils/database.js';
import supertest from 'supertest';

describe('slow request detection tests', () => {
  afterEach(() => {
    mainConfig.server.slowRequestThresholdMs = undefined;
    mainConfig.server.healthCheckDbTimeoutMs = undefined;
    vi.restoreAllMocks();
  });

  test('warns when request exceeds slowRequestThresholdMs', async () => {
    mainConfig.server.slowRequestThresholdMs = 50;
    // Health endpoint hangs for 300ms (longer than the 50ms threshold)
    mainConfig.server.healthCheckDbTimeoutMs = 300;

    const fastify = buildFastify();
    const warnSpy = vi.spyOn(console, 'warn');

    // Never-resolving DB — healthCheckDbTimeoutMs wins the race after 300ms
    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue(new Promise(() => {}));

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: false });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Slow request'));
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('GET /health'));

    fastify.close();
  }, 10_000);

  test('does not warn when request completes before slowRequestThresholdMs', async () => {
    // Threshold is 500ms — well above the time for a fast mock response
    mainConfig.server.slowRequestThresholdMs = 500;

    const fastify = buildFastify();
    const warnSpy = vi.spyOn(console, 'warn');

    vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
      // @ts-expect-error test
      release: () => null,
    });

    await fastify.ready();
    const response = await supertest(fastify.server).get('/health');

    expect(response.body).toEqual({ is_healthy: true });
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('Slow request'));

    fastify.close();
  });
});
