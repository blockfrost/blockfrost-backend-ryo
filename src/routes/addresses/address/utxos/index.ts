import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql';
import * as QueryTypes from '../../../../types/queries/addresses';
import * as ResponseTypes from '../../../../types/responses/addresses';
import { getDbSync } from '../../../../utils/database';
import { handle404, handleInvalidAddress } from '../../../../utils/error-handler';
import { getAddressTypeAndPaymentCred } from '../../../../utils/validation';

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

        const { rows } = isUnpaged(request)
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
            row.amount !== null
              ? [
                  {
                    unit: 'lovelace',
                    quantity: row.amount_lovelace,
                  },
                  ...row.amount,
                ]
              : [
                  {
                    unit: 'lovelace',
                    quantity: row.amount_lovelace,
                  },
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
