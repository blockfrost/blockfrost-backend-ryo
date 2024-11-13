import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle404 } from '@blockfrost/blockfrost-utils/lib/fastify.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.TxCbor[] } =
          await clientDbSync.query<QueryTypes.TxCbor>(SQLQuery.get('txs_hash_cbor'), [
            request.params.hash,
          ]);

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
