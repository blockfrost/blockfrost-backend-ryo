import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import { handle400Custom } from '../../../../utils/error-handler.js';
import { validateGovActionId } from '../../../../utils/governance.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { proposalParametersHandler } from '../tx-hash/cert-index/parameters.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/proposals/:gov_action_id/parameters',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/proposals/{gov_action_id}/parameters'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersGovAction>, reply) => {
      let parsedGovAction;

      try {
        parsedGovAction = validateGovActionId(request.params.gov_action_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed gov action id.');
      }
      return proposalParametersHandler(fastify, parsedGovAction, reply);
    },
  });
}

export default route;
