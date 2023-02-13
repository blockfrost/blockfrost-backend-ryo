import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Tx>(SQLQuery.get('txs_hash'), [
          request.params.hash,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        // all possible bigints are returned as string from database so they won't overflow JS number
        const result: ResponseTypes.Tx = rows[0].amount
          ? {
              hash: rows[0].hash,
              block: rows[0].block,
              block_height: rows[0].block_height,
              block_time: rows[0].block_time,
              slot: rows[0].slot,
              index: rows[0].index,
              output_amount: [
                { unit: 'lovelace', quantity: rows[0].amount_lovelace },
                ...rows[0].amount,
              ],
              fees: rows[0].fees,
              deposit: rows[0].deposit,
              size: rows[0].size,
              invalid_before: rows[0].invalid_before,
              invalid_hereafter: rows[0].invalid_hereafter,
              utxo_count: rows[0].utxo_count,
              withdrawal_count: rows[0].withdrawal_count,
              mir_cert_count: rows[0].mir_cert_count,
              delegation_count: rows[0].delegation_count,
              stake_cert_count: rows[0].stake_cert_count,
              pool_update_count: rows[0].pool_update_count,
              pool_retire_count: rows[0].pool_retire_count,
              asset_mint_or_burn_count: rows[0].asset_mint_or_burn_count,
              redeemer_count: rows[0].redeemer_count,
              valid_contract: rows[0].valid_contract,
            }
          : {
              hash: rows[0].hash,
              block: rows[0].block,
              block_height: rows[0].block_height,
              block_time: rows[0].block_time,
              slot: rows[0].slot,
              index: rows[0].index,
              output_amount: [{ unit: 'lovelace', quantity: rows[0].amount_lovelace }],
              fees: rows[0].fees,
              deposit: rows[0].deposit,
              size: rows[0].size,
              invalid_before: rows[0].invalid_before,
              invalid_hereafter: rows[0].invalid_hereafter,
              utxo_count: rows[0].utxo_count,
              withdrawal_count: rows[0].withdrawal_count,
              mir_cert_count: rows[0].mir_cert_count,
              delegation_count: rows[0].delegation_count,
              stake_cert_count: rows[0].stake_cert_count,
              pool_update_count: rows[0].pool_update_count,
              pool_retire_count: rows[0].pool_retire_count,
              asset_mint_or_burn_count: rows[0].asset_mint_or_burn_count,
              redeemer_count: rows[0].redeemer_count,
              valid_contract: rows[0].valid_contract,
            };

        return reply.send(result);
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
