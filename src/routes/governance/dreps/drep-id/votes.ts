import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { handle400Custom } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { getGovActionId, validateDRepId } from '../../../../utils/governance.js';

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

      const db = getDbSync(fastify);

        const unpaged = isUnpaged(request);
        const rows = unpaged
          ? await db.any<QueryTypes.DRepsDrepIDVotes>(
              SQLQuery.get('governance_dreps_drep_id_votes_unpaged'),
              [
                request.query.order,
                drepValidation.dbSync.raw,
                drepValidation.dbSync.id,
                drepValidation.dbSync.hasScript,
              ],
            )
          : await db.any<QueryTypes.DRepsDrepIDVotes>(
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

        for (const row of rows as ResponseTypes.DRepsDrepIDVotes) {
          row.proposal_id = getGovActionId(row.proposal_tx_hash, row.proposal_cert_index);
        }

        return reply.send(rows);

    },
  });
}

export default route;
