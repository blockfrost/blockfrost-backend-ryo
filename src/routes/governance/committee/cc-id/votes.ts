import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { handle400Custom } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import {
  getCommitteeCredentialId,
  getGovActionId,
  validateCommitteeCredentialId,
} from '../../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/committee/:cc_id/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/committee/{cc_id}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersCommitteeCCID>, reply) => {
      let credential;

      try {
        credential = validateCommitteeCredentialId(request.params.cc_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed cc credential id.');
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.CommitteeVote>(
          SQLQuery.get('governance_committee_cc_id_votes'),
          [
            request.query.order,
            request.query.count,
            request.query.page,
            credential.raw,
            credential.hasScript,
            credential.type,
          ],
        );

        gracefulRelease(clientDbSync);

        const enriched = rows.map(({ voter_hot_hex, voter_hot_has_script, ...rest }) => ({
          ...rest,
          voter_hot_id: getCommitteeCredentialId('hot', voter_hot_hex, voter_hot_has_script),
          proposal_id: getGovActionId(rest.proposal_tx_hash, rest.proposal_index),
        }));

        return reply.send(enriched);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
