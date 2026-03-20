import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync } from '../../../../../utils/database.js';
import { handle404 } from '../../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { enhanceProposal } from '../../../../../utils/governance.js';

export const proposalParametersHandler = async (
  fastify: FastifyInstance,
  proposal: QueryTypes.RequestParametersProposal['Params'],
  reply: FastifyReply,
) => {
  const db = getDbSync(fastify);

    const rows = await db.any<QueryTypes.ProposalsProposalParameters>(
      SQLQuery.get('governance_proposals_proposal_parameters'),
      [proposal.tx_hash, proposal.cert_index],
    );

    const row: ResponseTypes.ProposalsProposalParameters = enhanceProposal(rows[0]);

    if (!row) {
      return handle404(reply);
    }
    return reply.send(row);

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
