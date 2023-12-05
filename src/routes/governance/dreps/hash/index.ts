import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../types/responses/blocks.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { DrepRequestParameters } from '../../../../types/queries/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:hash',
    method: 'GET',
    // TODO: add schema when available
    // schema: getSchemaForEndpoint('/governance/dreps/{hash}'),
    handler: async (request: FastifyRequest<DrepRequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.Block[] } = await clientDbSync.query<QueryTypes.Block>(
        SQLQuery.get('governance_dreps_details'),
        [request.params.hash],
      );

      clientDbSync.release();

      const row = rows[0];

      if (!row) {
        return handle404(reply);
      }
      return reply.send(row);
    },
  });
}

export default route;
