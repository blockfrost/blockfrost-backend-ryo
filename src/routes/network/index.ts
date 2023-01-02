import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../sql';
import * as QueryTypes from '../../types/queries/network';
import * as ResponseTypes from '../../types/responses/network';
import { getDbSync } from '../../utils/database';

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

        clientDbSync.release();
        return reply.send(rows[0]);
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
