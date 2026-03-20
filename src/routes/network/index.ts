import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/network.js';
import * as ResponseTypes from '../../types/responses/network.js';
import { getDbSync } from '../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/network',
    method: 'GET',
    schema: getSchemaForEndpoint('/network'),
    handler: async (_request: FastifyRequest, reply) => {
      const db = getDbSync(fastify);

        const rows: ResponseTypes.Network[] =
          await db.any<QueryTypes.Network>(SQLQuery.get('network'));

        return reply.send(rows[0]);

    },
  });
}

export default route;
