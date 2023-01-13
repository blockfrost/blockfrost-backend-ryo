import { MetricsCollector } from '@blockfrost/blockfrost-utils';
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
}

export default route;
