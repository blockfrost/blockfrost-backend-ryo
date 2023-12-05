import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../types/responses/blocks.js';
import { getDbSync } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { DrepRequestParameters } from '../../../../types/queries/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:hash/distribution',
    method: 'GET',
    // TODO: add schema when available
    // schema: getSchemaForEndpoint('/governance/dreps/{hash}/distribution'),
    handler: async (request: FastifyRequest<DrepRequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.Block[] } = await clientDbSync.query<QueryTypes.Block>(
        SQLQuery.get('governance_dreps_distribution'),
        [request.params.hash, request.query.order, request.query.count, request.query.page],
      );

      clientDbSync.release();

      return reply.send(rows);
    },
  });
}

export default route;
