import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../types/responses/blocks.js';
import { getDbSync } from '../../../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/latest/txs/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest/txs/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersLatest>, reply) => {
      const db = getDbSync(fastify);

        const rows: ResponseTypes.BlockTxsCbor =
          await db.any<QueryTypes.BlockTxsCbor>(
            SQLQuery.get('blocks_latest_txs_cbor'),
            [request.query.order, request.query.count, request.query.page],
          );

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);

    },
  });
}

export default route;
