import { FastifyInstance, FastifyRequest } from 'fastify';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../sql/index.js';
import * as QueryTypes from '../../types/queries/pools.js';
import * as ResponseTypes from '../../types/responses/pools.js';
import { getDbSync, gracefulRelease } from '../../utils/database.js';
import { isUnpaged } from '../../utils/routes.js';
import { toJSONStream } from '../../utils/string-utils.js';
import { transformOffChainFetchError } from '../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/extended'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.PoolsExtended>(
              SQLQuery.get('pools_extended_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.PoolsExtended>(SQLQuery.get('pools_extended'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        gracefulRelease(clientDbSync);

        for (const row of rows) {
          if (row.metadata && row.metadata.fetch_error) {
            (row.metadata as NonNullable<ResponseTypes.PoolsExtended[number]['metadata']>).error =
              transformOffChainFetchError(row.metadata.fetch_error);
            // Remove the original fetch_error field
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (row.metadata as any).fetch_error;
          }
        }

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
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
