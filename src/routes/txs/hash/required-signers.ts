import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '@blockfrost/blockfrost-utils/lib/fastify.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash/required_signers',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/required_signers'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        const query404 = await db.any<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.length === 0) {
          return handle404(reply);
        }

        const rows: ResponseTypes.TxWitnesses =
          await db.any<QueryTypes.TxWitnesses>(SQLQuery.get('txs_hash_wits'), [
            request.params.hash,
          ]);

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);

    },
  });
}

export default route;
