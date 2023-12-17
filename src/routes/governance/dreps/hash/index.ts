import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:hash',
    method: 'GET',
    // TODO: add schema when available
    // schema: getSchemaForEndpoint('/governance/dreps/{hash}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.DRepsDrepID } =
        await clientDbSync.query<QueryTypes.DRepsDrepID>(SQLQuery.get('governance_dreps_drep_id'), [
          request.params.drep_id,
        ]);

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
