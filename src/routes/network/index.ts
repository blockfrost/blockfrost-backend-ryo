import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/network.js';
import * as ResponseTypes from '../../types/responses/network.js';
import { getDbSync, gracefulRelease } from '../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/network',
    method: 'GET',
    schema: getSchemaForEndpoint('/network'),
    handler: async (_request: FastifyRequest, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.Network[] } =
          await clientDbSync.query<QueryTypes.Network>(SQLQuery.get('network'));

        gracefulRelease(clientDbSync);
        return reply.send(rows[0]);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
