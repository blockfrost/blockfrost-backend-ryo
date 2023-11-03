import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { costModelsMap } from '../../../utils/cost-models-map.js';
import { validatePositiveInRangeSignedInt } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/parameters',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/parameters'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const { rows }: { rows: ResponseTypes.EpochParameters[] } =
          await clientDbSync.query<QueryTypes.EpochParameters>(
            SQLQuery.get('epochs_number_parameters'),
            [request.params.number],
          );

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        if (rows[0].cost_models) {
          rows[0].cost_models = costModelsMap(rows[0].cost_models);
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
