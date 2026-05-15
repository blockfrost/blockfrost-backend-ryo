import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/governance.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getCommitteeCredentialId, getGovActionId } from '../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/committee/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/committee/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.CommitteeVote>(
          SQLQuery.get('governance_committee_votes'),
          [request.query.order, request.query.count, request.query.page],
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
