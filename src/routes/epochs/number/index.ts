import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { getConfig } from '../../../config.js';
import { GENESIS } from '../../../constants/genesis.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validatePositiveInRangeSignedInt } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const network = getConfig().network;
        const epochLength = GENESIS[network].epoch_length;
        const { rows }: { rows: ResponseTypes.Epoch[] } =
          await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_number'), [
            request.params.number,
            epochLength,
          ]);

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
