import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../../utils/routes.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposalPaged>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.ProposalsProposalVotes } = unpaged
          ? await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
              SQLQuery.get('governance_proposals_proposal_votes_unpaged'),
              [request.query.order, request.params.tx_hash, request.params.cert_index],
            )
          : await clientDbSync.query<QueryTypes.ProposalsProposalVotes>(
              SQLQuery.get('governance_proposals_proposal_votes'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.tx_hash,
                request.params.cert_index,
              ],
            );

        clientDbSync.release();

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

export default route;
