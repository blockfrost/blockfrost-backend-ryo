import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { toJSONStream } from '../../../../utils/string-utils.js';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/addresses.js';
import * as ResponseTypes from '../../../../types/responses/addresses.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle404, handleInvalidAddress } from '../../../../utils/error-handler.js';
import { getAddressTypeAndPaymentCred } from '../../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address/utxos',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/utxos'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersUtxos>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('addresses_404'),
          [request.params.address, paymentCred],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
              SQLQuery.get('addresses_address_utxos_unpaged'),
              [request.query.order, request.params.address, paymentCred],
            )
          : await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
              SQLQuery.get('addresses_address_utxos'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.address,
                paymentCred,
              ],
            );

        clientDbSync.release();

        const result: ResponseTypes.AddressUtxos = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        for (const row of rows) {
          let amount = null;

          amount =
            row.amount === null
              ? [
                  {
                    unit: 'lovelace',
                    quantity: row.amount_lovelace,
                  },
                ]
              : [
                  {
                    unit: 'lovelace',
                    quantity: row.amount_lovelace,
                  },
                  ...row.amount,
                ];
          result.push({
            address: row.address,
            tx_hash: row.tx_hash,
            tx_index: row.tx_index,
            output_index: row.output_index,
            amount,
            block: row.block,
            data_hash: row.data_hash,
            inline_datum: row.inline_datum,
            reference_script_hash: row.reference_script_hash,
          });
        }
        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(result, reply.raw);
          return reply;
        } else {
          return reply.send(result);
        }
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
