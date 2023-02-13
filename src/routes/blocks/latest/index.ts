import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../types/responses/blocks.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/latest',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest'),
    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_latest'));

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }

        const response: ResponseTypes.Block = {
          ...row,
          // there is never next block for the latest block
          next_block: null,
          // there are always zero confirmations for the latest block
          confirmations: 0,
        };

        return reply.send(response);
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
