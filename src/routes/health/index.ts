import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';
import fs from 'fs';

import * as ResponseTypes from '../../types/responses/health.js';
import { getDbSync } from '../../utils/database.js';

async function route(fastify: FastifyInstance) {
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
}

export default route;
