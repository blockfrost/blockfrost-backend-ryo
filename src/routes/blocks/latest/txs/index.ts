import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { toJSONStream } from '../../../../utils/string-utils.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../types/responses/blocks.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/latest/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersLatest>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.BlockTxs>(
              SQLQuery.get('blocks_latest_txs_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.BlockTxs>(SQLQuery.get('blocks_latest_txs'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: ResponseTypes.BlockTxs = [];

        for (const row of rows) {
          list.push(row.hash);
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
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
