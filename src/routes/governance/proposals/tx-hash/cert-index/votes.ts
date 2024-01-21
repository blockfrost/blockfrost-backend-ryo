import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../../types/responses/governance.js';
import { getDbSync } from '../../../../../utils/database.js';
import { SQLQuery } from '../../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:tx_hash/:cert_index/votes',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{tx_hash}/{cert_index}/votes'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersProposalVotes>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      const { rows }: { rows: ResponseTypes.ProposalsProposalVote } =
        await clientDbSync.query<QueryTypes.ProposalsProposalVote>(
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

      if (rows.length === 0) {
        return reply.send([]);
      }

      return reply.send(rows);
    },
  });
}

export default route;
