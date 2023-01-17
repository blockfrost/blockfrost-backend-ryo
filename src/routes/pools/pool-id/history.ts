import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes';
import { toJSONStream } from '../../../utils/string-utils';

import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/pools';
import * as ResponseTypes from '../../../types/responses/pools';
import { getDbSync } from '../../../utils/database';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import { validateAndConvertPool } from '../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/:pool_id/history',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/history'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.PoolHistory } = unpaged
          ? await clientDbSync.query<QueryTypes.PoolHistory>(
              SQLQuery.get('pools_pool_id_history_unpaged'),
              [request.query.order, pool_id],
            )
          : await clientDbSync.query<QueryTypes.PoolHistory>(
              SQLQuery.get('pools_pool_id_history'),
              [request.query.order, request.query.count, request.query.page, pool_id],
            );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          toJSONStream(rows, reply.raw);
          return reply.raw.end();
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
