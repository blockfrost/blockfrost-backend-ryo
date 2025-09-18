import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../../utils/database.js';
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
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.ProposalsProposalMetadata>(
          SQLQuery.get('governance_proposals_proposal_metadata'),
          [request.params.tx_hash, request.params.cert_index],
        );

        gracefulRelease(clientDbSync);

        const row: ResponseTypes.ProposalsProposalMetadataV2 = enhanceProposal(rows[0]);

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
