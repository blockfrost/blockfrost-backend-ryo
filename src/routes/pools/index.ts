import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../utils/routes.js';
import { toJSONStream } from '../../utils/string-utils.js';
import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/pools.js';
import { getDbSync } from '../../utils/database.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function pools(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.Pools>(SQLQuery.get('pools_unpaged'), [
              request.query.order,
            ])
          : await clientDbSync.query<QueryTypes.Pools>(SQLQuery.get('pools'), [
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

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(list, reply.raw);
          return reply;
        } else {
          return reply.send(list);
        }
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

export default pools;
