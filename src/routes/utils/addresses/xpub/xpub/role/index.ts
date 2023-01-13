import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../../../types/queries/utils.js';
import * as ResponseTypes from '../../../../../../types/responses/utils.js';
import { handle400Custom } from '../../../../../../utils/error-handler.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import {
  isTestnet,
  validateDerivationXpub,
  validateInRangeUnsignedInt,
} from '../../../../../../utils/validation.js';
import { deriveAddress } from '@blockfrost/blockfrost-js';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/utils/addresses/xpub/:xpub/:role/:index',
    method: 'GET',
    schema: getSchemaForEndpoint('/utils/addresses/xpub/{xpub}/{role}/{index}'),
    handler: async (request: FastifyRequest<QueryTypes.Xpub>, reply) => {
      const { xpub, role, index } = request.params;

      if (!validateDerivationXpub(xpub)) {
        return handle400Custom(
          reply,
          'Invalid or malformed xpub format. Has to be hex of length 128.',
        );
      }

      if (!validateInRangeUnsignedInt(role)) {
        return handle400Custom(reply, 'Missing, out of range or malformed role.');
      }

      if (!validateInRangeUnsignedInt(index)) {
        return handle400Custom(reply, 'Missing, out of range or malformed index.');
      }

      const address = deriveAddress(xpub, role, index, isTestnet());

      const response: ResponseTypes.Xpub = {
        xpub: xpub,
        role: address.path[0],
        index: address.path[1],
        address: address.address,
      };

      return reply.send(response);
    },
  });
}

export default network;
