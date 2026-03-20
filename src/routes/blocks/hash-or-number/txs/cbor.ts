import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../types/responses/blocks.js';
import { getDbSync } from '../../../../utils/database.js';
import {
  isNumber,
  validateBlockHash,
  validatePositiveInRangeSignedInt,
} from '../../../../utils/validation.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/:hash_or_number/txs/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/txs/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.length === 0) {
          return handle404(reply);
        }

        const rows: ResponseTypes.BlockTxsCbor =
          await db.any<QueryTypes.BlockTxsCbor>(
            SQLQuery.get('blocks_hash_or_number_txs_cbor'),
            [
              request.params.hash_or_number,
              request.query.count,
              request.query.page,
              request.query.order,
            ],
          );

        return reply.send(rows);

    },
  });
}

export default route;
