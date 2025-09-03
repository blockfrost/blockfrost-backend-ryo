import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../../utils/routes.js';

export const proposalWithdrawalsHandler = async (
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
    const { rows }: { rows: ResponseTypes.ProposalsProposalWithdrawals } = unpaged
      ? await clientDbSync.query<QueryTypes.ProposalsProposalWithdrawals>(
          SQLQuery.get('governance_proposals_proposal_withdrawals_unpaged'),
          [request.query.order, proposal.tx_hash, proposal.cert_index],
        )
      : await clientDbSync.query<QueryTypes.ProposalsProposalWithdrawals>(
          SQLQuery.get('governance_proposals_proposal_withdrawals'),
          [
            request.query.order,
            request.query.count,
            request.query.page,
            proposal.tx_hash,
            proposal.cert_index,
          ],
        );

    gracefulRelease(clientDbSync);

    return reply.send(rows);
  } catch (error) {
    gracefulRelease(clientDbSync);
    throw error;
  }
};

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/withdrawals',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/withdrawals'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposalPaged>, reply) =>
      proposalWithdrawalsHandler(fastify, request.params, request, reply),
  });
}

export default route;
