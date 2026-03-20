import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '@blockfrost/blockfrost-utils/lib/fastify.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        const rows: ResponseTypes.TxCbor[] =
          await db.any<QueryTypes.TxCbor>(SQLQuery.get('txs_hash_cbor'), [
            request.params.hash,
          ]);

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);

    },
  });
}

export default route;
