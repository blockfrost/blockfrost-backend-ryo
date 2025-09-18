import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { dbSyncDRepToCIP129 } from '../../../../../utils/governance.js';
import { isUnpaged } from '../../../../../utils/routes.js';

export const proposalVotesHandler = async (
  fastify: FastifyInstance,
  proposal: QueryTypes.RequestParametersProposal['Params'],
  request:
    | FastifyRequest<QueryTypes.RequestParametersGovActionPaged>
    | FastifyRequest<QueryTypes.RequestParametersProposalPaged>,
  reply: FastifyReply,
) => {
  const clientDbSync = await getDbSync(fastify);

  try {
    const unpaged = isUnpaged(request);
    const { rows } = unpaged
      ? await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
          SQLQuery.get('governance_proposals_proposal_votes_unpaged'),
          [request.query.order, proposal.tx_hash, proposal.cert_index],
        )
      : await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
          SQLQuery.get('governance_proposals_proposal_votes'),
          [
            request.query.order,
            request.query.count,
            request.query.page,
            proposal.tx_hash,
            proposal.cert_index,
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
};
async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposalPaged>, reply) =>
      proposalVotesHandler(fastify, request.params, request, reply),
  });
}

export default route;
