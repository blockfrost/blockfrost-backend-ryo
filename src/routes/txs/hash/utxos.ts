import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash/utxos',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/utxos'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);
      /*
        This is a special query since address is just a list of inputs and outputs.
        Moreover, inputs are just previous outputs
        (hence txi.tx_out_id which point to the previously unspent txo, which is now being consumed).
        It's important to use tx_out_index as well, otherwise, all previous outputs (all their indexes) would be matched and returned.
      */

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const inputs = await clientDbSync.query<QueryTypes.TxUtxoInputs>(
          SQLQuery.get('txs_hash_utxos_1'),
          [request.params.hash],
        );

        const outputs = await clientDbSync.query<QueryTypes.TxUtxoOutputs>(
          SQLQuery.get('txs_hash_utxos_2'),
          [request.params.hash],
        );

        clientDbSync.release();

        const responseInputs: ResponseTypes.TxUtxoInputs = [];
        const responseOutputs: ResponseTypes.TxUtxoOutputs = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        for (const row of inputs.rows) {
          if (row.amount) {
            responseInputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }, ...row.amount],
              tx_hash: row.tx_hash,
              output_index: row.output_index,
              collateral: row.collateral,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
              reference: row.reference,
            });
          } else {
            responseInputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }],
              tx_hash: row.tx_hash,
              output_index: row.output_index,
              collateral: row.collateral,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
              reference: row.reference,
            });
          }
        }
        for (const row of outputs.rows) {
          if (row.amount) {
            responseOutputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }, ...row.amount],
              collateral: row.collateral,
              output_index: row.output_index,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
            });
          } else {
            responseOutputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }],
              collateral: row.collateral,
              output_index: row.output_index,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
            });
          }
        }

        const response: {
          hash: string;
          inputs: ResponseTypes.TxUtxoInputs;
          outputs: ResponseTypes.TxUtxoOutputs;
        } = {
          hash: request.params.hash,
          inputs: responseInputs,
          outputs: responseOutputs,
        };

        return reply.send(response);
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
