import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { proposalWithdrawalsHandler } from '../tx-hash/cert-index/withdrawals.js';
import { validateGovActionId } from '../../../../utils/governance.js';
import { handle400Custom } from '../../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:gov_action_id/withdrawals',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{gov_action_id}/withdrawals'),

    handler: async (request: FastifyRequest<QueryTypes.RequestParametersGovActionPaged>, reply) => {
      let parsedGovAction;

      try {
        parsedGovAction = validateGovActionId(request.params.gov_action_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed gov action id.');
      }
      return proposalWithdrawalsHandler(fastify, parsedGovAction, request, reply);
    },
  });
}

export default route;
