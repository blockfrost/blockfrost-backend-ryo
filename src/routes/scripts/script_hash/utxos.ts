import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../types/responses/scripts.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/:script_hash/utxos',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/utxos'),
    method: 'GET',
    handler: async (
      request: FastifyRequest<QueryTypes.RequestParametersScriptHashUtxos>,
      reply,
    ) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('scripts_404'),
          [request.params.script_hash],
        );

        if (query404.rows.length === 0) {
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        const { rows }: { rows: QueryTypes.ScriptHashUtxosQuery[] } =
          await clientDbSync.query<QueryTypes.ScriptHashUtxosQuery>(
            SQLQuery.get('scripts_script_hash_utxos'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.script_hash,
            ],
          );

        gracefulRelease(clientDbSync);

        const result: ResponseTypes.ScriptHashUtxos = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        for (const row of rows) {
          const amount = [
            {
              unit: 'lovelace',
              quantity: row.amount_lovelace,
            },
            ...(row.amount ?? []),
          ];

          result.push({
            address: row.address,
            tx_hash: row.tx_hash,
            output_index: row.output_index,
            amount,
            block: row.block,
            data_hash: row.data_hash,
            inline_datum: row.inline_datum,
            reference_script_hash: row.reference_script_hash,
          });
        }

        return reply.send(result);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
