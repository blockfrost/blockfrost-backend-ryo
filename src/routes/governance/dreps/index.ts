import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync } from '../../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps',
    method: 'GET',
    // TODO: add schema when available
    // schema: getSchemaForEndpoint('/epochs/latest'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.Epoch[] } =
          await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('governance_dreps'), [
            request.query.order,
            request.query.count,
            request.query.page,
          ]);

        clientDbSync.release();

        return reply.send(rows);
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
