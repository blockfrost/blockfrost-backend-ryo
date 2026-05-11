import { FastifyInstance } from 'fastify';
import * as QueryTypes from '../../../types/queries/governance.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getCommitteeCredentialId, getGovActionId } from '../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/committee',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/committee'),

    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Committee>(
          SQLQuery.get('governance_committee'),
          [],
        );

        gracefulRelease(clientDbSync);

        const row = rows[0];

        const members = row.members.map(m => ({
          ...m,
          cc_cold_id: getCommitteeCredentialId('cold', m.cc_cold_hex, m.cc_cold_has_script),
          cc_hot_id:
            m.cc_hot_hex !== null
              ? getCommitteeCredentialId('hot', m.cc_hot_hex, m.cc_hot_has_script!)
              : null,
        }));

        return reply.send({
          ...row,
          gov_action_id:
            row.proposal_tx_hash !== null && row.proposal_index !== null
              ? getGovActionId(row.proposal_tx_hash, row.proposal_index)
              : null,
          members,
        });
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
