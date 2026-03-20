import { FastifyInstance, FastifyRequest } from 'fastify';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/pools.js';
import * as ResponseTypes from '../../../types/responses/pools.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateAndConvertPool } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/:pool_id/blocks',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/blocks'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.length === 0) {
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const rows = unpaged
          ? await db.any<QueryTypes.PoolBlocks>(
              SQLQuery.get('pools_pool_id_blocks_unpaged'),
              [request.query.order, pool_id],
            )
          : await db.any<QueryTypes.PoolBlocks>(SQLQuery.get('pools_pool_id_blocks'), [
              request.query.order,
              request.query.count,
              request.query.page,
              pool_id,
            ]);

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: ResponseTypes.PoolBlocks = [];

        for (const row of rows) {
          list.push(row.block);
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

    },
  });
}

export default route;
