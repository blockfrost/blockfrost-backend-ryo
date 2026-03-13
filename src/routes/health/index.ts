import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import { Counter } from 'prom-client';
import * as ResponseTypes from '../../types/responses/health.js';
import { getDbSync } from '../../utils/database.js';
import { getConfig } from '../../config.js';

const config = getConfig();

const healthCheckTotal = new Counter({
  name: 'health_check_total',
  help: 'Total number of health check requests',
  labelNames: ['healthy', 'reason'] as const,
});

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/health',
    method: 'GET',
    schema: getSchemaForEndpoint('/health'),
    handler: async (_request, reply) => {
      // Check DB connectivity; if healthCheckDbTimeoutMs is set and exceeded, report unhealthy
      const { healthCheckDbTimeoutMs } = config.server;
      let dbHealthy = true;

      let dbError: unknown;

      if (healthCheckDbTimeoutMs !== undefined) {
        let timer: ReturnType<typeof setTimeout> | undefined;

        const dbPromise = getDbSync(fastify)
          .then(client => {
            clearTimeout(timer);
            client.release();
            return true;
          })
          .catch((error: unknown) => {
            clearTimeout(timer);
            console.error(`[HEALTH]: unhealthy — DBSync connection error`, error);
            dbError = error;
            return false;
          });

        const timeoutPromise = new Promise<boolean>(resolve => {
          timer = setTimeout(() => {
            console.error(
              `[HEALTH]: unhealthy — DBSync did not respond within ${healthCheckDbTimeoutMs}ms`,
            );
            resolve(false);
          }, healthCheckDbTimeoutMs);
        });

        const connected = await Promise.race([dbPromise, timeoutPromise]);

        if (!connected) {
          dbHealthy = false;
        }
      } else {
        const client = await getDbSync(fastify);

        client.release();
      }

      if (!dbHealthy) {
        const reason =
          dbError !== undefined &&
          typeof dbError === 'object' &&
          dbError !== null &&
          'code' in dbError &&
          typeof (dbError as { code: unknown }).code === 'string'
            ? (dbError as { code: string }).code
            : 'dbsync_unavailable';

        healthCheckTotal.inc({ healthy: 'false', reason });
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

      if (!isHealthy) {
        healthCheckTotal.inc({ healthy: 'false', reason: 'kill_switch' });
      } else {
        healthCheckTotal.inc({ healthy: 'true', reason: 'ok' });
      }

      const response: ResponseTypes.Health = { is_healthy: isHealthy };

      reply.send(response);
    },
  });
}

export default route;
