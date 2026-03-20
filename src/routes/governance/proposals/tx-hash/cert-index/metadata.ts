import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync } from '../../../../../utils/database.js';
import { handle404 } from '../../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { enhanceProposal } from '../../../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/metadata'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposal>, reply) => {
      const db = getDbSync(fastify);

        const rows = await db.any<QueryTypes.ProposalsProposalMetadata>(
          SQLQuery.get('governance_proposals_proposal_metadata'),
          [request.params.tx_hash, request.params.cert_index],
        );

        const row: ResponseTypes.ProposalsProposalMetadataV2 = enhanceProposal(rows[0]);

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);

    },
  });
}

export default route;
