import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { getConfig } from '../../../config.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
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
          gracefulRelease(clientDbSync);
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const epochLength = getConfig().genesis.epoch_length;
        const { rows }: { rows: ResponseTypes.Epoch[] } =
          await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_number'), [
            request.params.number,
            epochLength,
          ]);

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
