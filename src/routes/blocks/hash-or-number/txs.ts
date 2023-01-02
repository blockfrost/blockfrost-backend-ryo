import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/blocks';
import { getDbSync } from '../../../utils/database';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import {
  isNumber,
  validateBlockHash,
  validatePositiveInRangeSignedInt,
} from '../../../utils/validation';

async function blocks(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/:hash_or_number/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.BlockTxs>(
              SQLQuery.get('blocks_hash_or_number_txs_unpaged'),
              [request.params.hash_or_number, request.query.order],
            )
          : await clientDbSync.query<QueryTypes.BlockTxs>(
              SQLQuery.get('blocks_hash_or_number_txs'),
              [
                request.params.hash_or_number,
                request.query.count,
                request.query.page,
                request.query.order,
              ],
            );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
        }

        return reply.send(list);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

module.exports = blocks;
