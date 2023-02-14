import { FastifyInstance, FastifyRequest } from 'fastify';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/pools.js';
import * as ResponseTypes from '../../types/responses/pools.js';
import { getDbSync } from '../../utils/database.js';
import { isUnpaged } from '../../utils/routes.js';
import { toJSONStream } from '../../utils/string-utils.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/extended'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.PoolsExtended } = unpaged
          ? await clientDbSync.query<QueryTypes.PoolsExtended>(
              SQLQuery.get('pools_extended_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.PoolsExtended>(SQLQuery.get('pools_extended'), [
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
