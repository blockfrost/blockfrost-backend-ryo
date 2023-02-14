import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../utils/routes.js';
import { toJSONStream } from '../../utils/string-utils.js';
import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/pools.js';
import * as ResponseTypes from '../../types/responses/pools.js';
import { getDbSync } from '../../utils/database.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/retired',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/retired'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.PoolRetire } = unpaged
          ? await clientDbSync.query<QueryTypes.PoolsRetire>(
              SQLQuery.get('pools_retired_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.PoolsRetire>(SQLQuery.get('pools_retired'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(rows, reply.raw);
          return reply;
        } else {
          return reply.send(rows);
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

export default route;
