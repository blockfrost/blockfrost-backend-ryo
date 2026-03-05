import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import * as ResponseTypes from '../../types/responses/health.js';
import { getDbSync } from '../../utils/database.js';
import { getConfig } from '../../config.js';

const config = getConfig();

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/health',
    method: 'GET',
    schema: getSchemaForEndpoint('/health'),
    handler: async (_request, reply) => {
      // Check DB connectivity; if healthCheckDbTimeoutMs is set and exceeded, report unhealthy
      const { healthCheckDbTimeoutMs } = config.server;
      let dbHealthy = true;

      if (healthCheckDbTimeoutMs !== undefined) {
        const connected = await Promise.race([
          getDbSync(fastify)
            .then(client => {
              client.release();
              return true;
            })
            .catch((error: unknown) => {
              console.error(`[HEALTH]: unhealthy — DB connection error`, error);
              return false;
            }),
          new Promise<boolean>(resolve =>
            setTimeout(() => {
              console.error(
                `[HEALTH]: unhealthy — DB connection timed out after ${healthCheckDbTimeoutMs}ms`,
              );
              resolve(false);
            }, healthCheckDbTimeoutMs),
          ),
        ]);

        if (!connected) {
          dbHealthy = false;
        }
      } else {
        const client = await getDbSync(fastify);

        client.release();
      }

      if (!dbHealthy) {
        return reply.send({ is_healthy: false });
      }

      const killSwitchFilePath = '/var/tmp/blockfrost_disable';
      let isHealthy = true;

      try {
        if (fs.existsSync(killSwitchFilePath)) {
          isHealthy = false;
          console.error(`[HEALTH]: unhealthy — kill switch file found at ${killSwitchFilePath}`);
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
