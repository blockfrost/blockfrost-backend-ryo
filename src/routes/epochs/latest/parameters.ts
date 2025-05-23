import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { costModelsMap } from '../../../utils/cost-models-map.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/latest/parameters',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/latest/parameters'),
    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.EpochParameters[] } =
          await clientDbSync.query<QueryTypes.EpochParameters>(
            SQLQuery.get('epochs_latest_parameters'),
          );

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return handle404(reply);
        }

        if (rows[0].cost_models) {
          rows[0].cost_models_raw = rows[0].cost_models;
          rows[0].cost_models = costModelsMap(rows[0].cost_models);
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
