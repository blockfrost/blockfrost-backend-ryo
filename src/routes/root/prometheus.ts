import { MetricsCollector } from '@blockfrost/blockfrost-utils';
import { pm2Metrics } from '@blockfrost/blockfrost-utils/lib/metrics-collector/pm2.js';
import { FastifyInstance } from 'fastify';
import { getConfig } from '../../config.js';

const config = getConfig();

async function route(fastify: FastifyInstance) {
  if (config.server.prometheusMetrics) {
    const metricsCollector = new MetricsCollector(10_000, {
      prefix: `blockfrost_backend_ryo`,
    });

    fastify.route({
      url: '/prometheus',
      method: 'GET',
      handler: async (_request, reply) =>
        reply.header('Content-Type', 'text/plain').send(metricsCollector.toPrometheus()),
    });
  }

  if (config.server.prometheusMetricsPM2) {
    fastify.route({
      url: '/prometheus-pm2',
      method: 'GET',
      handler: async (_request, reply) => {
        const metrics = pm2Metrics();

        reply.header('Content-Type', 'text/plain').send(metrics);
      },
    });
  }
}

export default route;
