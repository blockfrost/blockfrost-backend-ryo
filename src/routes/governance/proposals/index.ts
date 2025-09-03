import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/governance.js';
import * as ResponseTypes from '../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';
import { enhanceProposal } from '../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.Proposals>(
              SQLQuery.get('governance_proposals_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.Proposals>(SQLQuery.get('governance_proposals'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        gracefulRelease(clientDbSync);

        const enhancedRows: ResponseTypes.Proposals = rows.map(row => enhanceProposal(row));

        return reply.send(enhancedRows);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
