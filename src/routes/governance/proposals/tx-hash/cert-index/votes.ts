import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { dbSyncDRepToCIP129 } from '../../../../../utils/governance.js';
import { isUnpaged } from '../../../../../utils/routes.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposalPaged>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
              SQLQuery.get('governance_proposals_proposal_votes_unpaged'),
              [request.query.order, request.params.tx_hash, request.params.cert_index],
            )
          : await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
              SQLQuery.get('governance_proposals_proposal_votes'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.tx_hash,
                request.params.cert_index,
              ],
            );

        gracefulRelease(clientDbSync);

        for (const row of rows) {
          if (!row.voter.startsWith('drep')) {
            // Keep non-DRep voter unmodified
            continue;
          }

          // Convert voter id to CIP129 format
          const cip129DRep = dbSyncDRepToCIP129({
            drep_id: row.voter,
            has_script: row.voter_has_script,
          });

          row.voter = cip129DRep.id;
        }

        return reply.send(rows as ResponseTypes.ProposalsProposalVotes);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
