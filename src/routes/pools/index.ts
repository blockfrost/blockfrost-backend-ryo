import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../sql';
import * as QueryTypes from '../../types/queries/pools';
import { getDbSync } from '../../utils/database';

async function pools(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Pools>(SQLQuery.get('pools'), [
          request.query.order,
          request.query.count,
          request.query.page,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.pool_id);
        }

        return reply.send(list);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

module.exports = pools;
