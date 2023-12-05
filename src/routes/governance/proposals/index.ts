import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/governance.js';
import * as ResponseTypes from '../../../types/responses/governance.js';
import { getDbSync } from '../../../utils/database.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.Proposals } = unpaged
          ? await clientDbSync.query<QueryTypes.Proposals>(
              SQLQuery.get('governance_proposals_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.Proposals>(SQLQuery.get('governance_proposals'), [
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
