import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/governance.js';
import * as ResponseTypes from '../../types/responses/governance.js';
import { getDbSync } from '../../utils/database.js';
import { SQLQuery } from '../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.DRepsDrepIDVotes } =
        await clientDbSync.query<QueryTypes.DRepsDrepIDVotes>(SQLQuery.get('governance_votes'), [
          request.query.order,
          request.query.count,
          request.query.page,
        ]);

      clientDbSync.release();

      if (rows.length === 0) {
        return reply.send([]);
      }

      return reply.send(rows);
    },
  });
}

export default route;
