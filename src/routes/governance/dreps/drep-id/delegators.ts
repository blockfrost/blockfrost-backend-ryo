import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:drep_id/delegators',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps/{drep_id}/delegators'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.DRepsDrepIDDelegators } =
        await clientDbSync.query<QueryTypes.DRepsDrepIDDelegators>(
          SQLQuery.get('governance_dreps_drep_id_delegators'),
          [request.query.order, request.query.count, request.query.page, request.params.drep_id],
        );

      clientDbSync.release();

      if (rows.length === 0) {
        return reply.send([]);
      }

      return reply.send(rows);
    },
  });
}

export default route;
