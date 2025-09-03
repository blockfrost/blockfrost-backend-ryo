import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../../utils/database.js';
import { handle404 } from '../../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { enhanceProposal } from '../../../../../utils/governance.js';

export const proposalParametersHandler = async (
  fastify: FastifyInstance,
  proposal: QueryTypes.RequestParametersProposal['Params'],
  reply: FastifyReply,
) => {
  const clientDbSync = await getDbSync(fastify);

  try {
    const { rows } = await clientDbSync.query<QueryTypes.ProposalsProposalParameters>(
      SQLQuery.get('governance_proposals_proposal_parameters'),
      [proposal.tx_hash, proposal.cert_index],
    );

    gracefulRelease(clientDbSync);

    const row: ResponseTypes.ProposalsProposalParameters = enhanceProposal(rows[0]);

    if (!row) {
      return handle404(reply);
    }
    return reply.send(row);
  } catch (error) {
    gracefulRelease(clientDbSync);
    throw error;
  }
};

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/parameters',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/parameters'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposal>, reply) =>
      proposalParametersHandler(fastify, request.params, reply),
  });
}

export default route;
