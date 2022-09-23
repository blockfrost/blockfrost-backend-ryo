import { FastifyInstance } from 'fastify';
import fs from 'fs';
import * as ResponseTypes from '../../types/responses/health';
import { getDbSync } from '../../utils/database';
import { getSchemaForEndpoint } from '../../utils/open-api';

async function health(fastify: FastifyInstance) {
  fastify.route({
    url: '/health',
    method: 'GET',
    schema: getSchemaForEndpoint('/health'),
    handler: async (_request, reply) => {
      // this is here just to check if DB is down -> should return 500
      const client = await getDbSync(fastify);

      client.release();

      const killSwitchFilePath = '/var/tmp/blockfrost_disable';
      let isHealthy = true;

      try {
        if (fs.existsSync(killSwitchFilePath)) {
          isHealthy = false;
        }
      } catch {
        // do nothing
      }

      const response: ResponseTypes.Health = { is_healthy: isHealthy };

      reply.send(response);
    },
  });

  fastify.route({
    url: '/health/clock',
    method: 'GET',
    schema: getSchemaForEndpoint('/health/clock'),
    handler: async (_request, reply) => {
      const response: ResponseTypes.HealthClock = { server_time: Date.now() };

      reply.send(response);
    },
  });
}

module.exports = health;
