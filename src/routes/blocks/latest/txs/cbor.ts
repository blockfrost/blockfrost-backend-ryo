import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/latest/txs/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest/txs/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersLatest>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.BlockTxs>(
          SQLQuery.get('blocks_latest_txs_cbor'),
          [request.query.order, request.query.count, request.query.page],
        );

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
