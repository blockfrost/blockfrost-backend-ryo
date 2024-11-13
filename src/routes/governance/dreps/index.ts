import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/governance.js';
import * as ResponseTypes from '../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.DReps } = unpaged
          ? await clientDbSync.query<QueryTypes.DReps>(SQLQuery.get('governance_dreps_unpaged'), [
              request.query.order,
            ])
          : await clientDbSync.query<QueryTypes.DReps>(SQLQuery.get('governance_dreps'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        gracefulRelease(clientDbSync);

        return reply.send(rows);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
