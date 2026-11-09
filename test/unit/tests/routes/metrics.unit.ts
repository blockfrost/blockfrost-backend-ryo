import nodeConfig from 'config';
import { FastifyInstance } from 'fastify';
import { register } from '@prometheus-io/client';
import { afterEach, describe, expect, test, vi } from 'vitest';
import buildFastify from '../../../../src/app.js';
import { loadConfig, mainConfig } from '../../../../src/config.js';

const originalMetrics = mainConfig.server.prometheusMetrics;
const originalSummaries = mainConfig.server.prometheusMetricsSummaries;
let app: FastifyInstance | undefined;

afterEach(async () => {
  await app?.close();
  app = undefined;
  register.clear();
  mainConfig.server.prometheusMetrics = originalMetrics;
  mainConfig.server.prometheusMetricsSummaries = originalSummaries;
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('Prometheus summaries configuration', () => {
  test.each([
    { configured: undefined, env: undefined, expected: false },
    { configured: true, env: undefined, expected: true },
    { configured: false, env: undefined, expected: false },
    { configured: true, env: 'false', expected: false },
    { configured: false, env: 'true', expected: true },
  ])('loads file=$configured, env=$env as $expected', ({ configured, env, expected }) => {
    const has = nodeConfig.has.bind(nodeConfig);
    const get = nodeConfig.get.bind(nodeConfig);
    // config 5 makes the instance non-extensible, so spy on its prototype methods.
    const configPrototype: typeof nodeConfig = Object.getPrototypeOf(nodeConfig);

    vi.spyOn(configPrototype, 'has').mockImplementation(key =>
      key === 'server.prometheusMetricsSummaries' ? configured !== undefined : has(key),
    );
    vi.spyOn(configPrototype, 'get').mockImplementation(key =>
      key === 'server.prometheusMetricsSummaries' ? configured : get(key),
    );
    vi.stubEnv('BLOCKFROST_CONFIG_SERVER_PROMETHEUS_METRICS_SUMMARIES', env);

    expect(loadConfig().server.prometheusMetricsSummaries).toBe(expected);
  });

  test.each([false, true])('collects summaries only when enabled=%s', async enabled => {
    mainConfig.server.prometheusMetrics = true;
    mainConfig.server.prometheusMetricsSummaries = enabled;
    app = buildFastify();
    await app.ready();

    await app.inject('/health/clock');

    const histogram = await register.getSingleMetric('http_request_duration_seconds')?.get();
    const summary = await register.getSingleMetric('http_request_summary_seconds')?.get();

    expect(histogram?.values).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          metricName: 'http_request_duration_seconds_count',
          labels: { method: 'GET', route: '/health/clock', status_code: 200 },
          value: 1,
        }),
      ]),
    );
    if (enabled) {
      expect(summary?.values).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            metricName: 'http_request_summary_seconds_count',
            labels: { method: 'GET', route: '/health/clock', status_code: 200 },
            value: 1,
          }),
        ]),
      );
    } else {
      expect(summary?.values).toEqual([]);
    }
  });
});
