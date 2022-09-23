import { MetricsCollector } from '@blockfrost/blockfrost-utils';
import { FastifyInstance } from 'fastify';
import { getConfig } from '../../config';
import { getSchemaForEndpoint } from '../../utils/open-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../../package.json');

const config = getConfig();

async function root(fastify: FastifyInstance) {
  fastify.route({
    url: '/',
    method: 'GET',
    schema: getSchemaForEndpoint('/'),
    handler: async (_request, reply) =>
      reply.send({
        url: 'https://blockfrost.io/',
        version: `${packageJson.version}`,
      }),
  });

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

module.exports = root;
