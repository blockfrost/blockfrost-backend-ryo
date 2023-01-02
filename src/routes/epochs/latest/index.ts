import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';

import { getConfig } from '../../../config';
import { GENESIS } from '../../../constants/genesis';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/epochs';
import * as ResponseTypes from '../../../types/responses/epochs';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/latest',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/latest'),
    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const network = getConfig().network;
        const epochLength = GENESIS[network].epoch_length;
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
