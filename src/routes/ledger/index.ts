import { FastifyInstance } from 'fastify';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import * as ResponseTypes from '../../types/responses/ledger.js';
import { getConfig } from '../../config.js';
import { GENESIS } from '../../constants/genesis.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/genesis',
    method: 'GET',
    schema: getSchemaForEndpoint('/genesis'),
    handler: async (_request, reply) => {
      const network = getConfig().network;
      const genesisData: ResponseTypes.Ledger | undefined = GENESIS[network];

      if (genesisData) {
        return reply.send(genesisData);
      } else {
        return reply.code(500).header('Content-Type', 'application/json; charset=utf-8').send({
          error: 'Internal Server Error',
          message: 'Internal Server Error',
          status_code: 500,
        });
      }
    },
  });
}

export default route;
