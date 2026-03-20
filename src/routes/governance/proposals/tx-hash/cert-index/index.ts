import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { handle404 } from '../../../../../utils/error-handler.js';
import { enhanceProposal } from '../../../../../utils/governance.js';

export const proposalHandler = async (
  fastify: FastifyInstance,
  proposal: QueryTypes.RequestParametersProposal['Params'],
  reply: FastifyReply,
) => {
  const db = getDbSync(fastify);

    const rows = await db.any<QueryTypes.ProposalsProposal>(
      SQLQuery.get('governance_proposals_proposal'),
      [proposal.tx_hash, proposal.cert_index],
    );

    const row: ResponseTypes.ProposalsProposal = enhanceProposal(rows[0]);

    if (!row) {
      return handle404(reply);
    }
    return reply.send(row);

};

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposal>, reply) =>
      proposalHandler(fastify, request.params, reply),
  });
}

export default route;
