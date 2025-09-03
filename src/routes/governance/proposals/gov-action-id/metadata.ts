import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { enhanceProposal, validateGovActionId } from '../../../../utils/governance.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:gov_action_id/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{gov_action_id}/metadata'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersGovAction>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      let parsedGovAction;

      try {
        parsedGovAction = validateGovActionId(request.params.gov_action_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed gov action id.');
      }

      try {
        const { rows } = await clientDbSync.query<QueryTypes.ProposalsProposalMetadata>(
          SQLQuery.get('governance_proposals_proposal_metadata_v2'),
          [parsedGovAction.tx_hash, parsedGovAction.cert_index],
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
