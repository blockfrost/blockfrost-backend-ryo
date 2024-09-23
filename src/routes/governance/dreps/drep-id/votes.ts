import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { handle400Custom } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { drepIdToRaw } from '../../../../utils/bech32.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:drep_id/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps/{drep_id}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      let drepHex;

      try {
        drepHex = drepIdToRaw(request.params.drep_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed drep id.');
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.DRepsDrepIDUpdates } = unpaged
          ? await clientDbSync.query<QueryTypes.DRepsDrepIDUpdates>(
              SQLQuery.get('governance_dreps_drep_id_votes_unpaged'),
              [request.query.order, request.params.drep_id],
            )
          : await clientDbSync.query<QueryTypes.DRepsDrepIDUpdates>(
              SQLQuery.get('governance_dreps_drep_id_votes'),
              [request.query.order, request.query.count, request.query.page, drepHex],
            );

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
