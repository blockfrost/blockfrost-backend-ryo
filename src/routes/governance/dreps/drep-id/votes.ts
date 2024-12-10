import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { handle400Custom } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { validateDRepId } from '../../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:drep_id/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps/{drep_id}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDRepID>, reply) => {
      let drepValidation;

      try {
        drepValidation = validateDRepId(request.params.drep_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed drep id.');
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.DRepsDrepIDUpdates } = unpaged
          ? await clientDbSync.query<QueryTypes.DRepsDrepIDUpdates>(
              SQLQuery.get('governance_dreps_drep_id_votes_unpaged'),
              [
                request.query.order,
                drepValidation.dbSync.raw,
                drepValidation.dbSync.id,
                drepValidation.dbSync.hasScript,
              ],
            )
          : await clientDbSync.query<QueryTypes.DRepsDrepIDUpdates>(
              SQLQuery.get('governance_dreps_drep_id_votes'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                drepValidation.dbSync.raw,
                drepValidation.dbSync.id,
                drepValidation.dbSync.hasScript,
              ],
            );

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
