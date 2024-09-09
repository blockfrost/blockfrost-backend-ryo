import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';

import { getConfig } from '../../../config.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/latest',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/latest'),
    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const epochLength = getConfig().genesis.epoch_length;
        const { rows }: { rows: ResponseTypes.Epoch[] } =
          await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_latest'), [epochLength]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

export default route;
