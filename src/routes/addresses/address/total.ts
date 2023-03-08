import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/addresses.js';
import * as ResponseTypes from '../../../types/responses/addresses.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404, handleInvalidAddress } from '../../../utils/error-handler.js';
import {
  getAddressTypeAndPaymentCred,
  paymentCredToBech32Address,
} from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address/total',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/total'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const { addressType, paymentCred, paymentCredPrefix } = getAddressTypeAndPaymentCred(
        request.params.address,
      );

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

        const { rows } = await clientDbSync.query<QueryTypes.AddressTotalQuery>(
          SQLQuery.get('addresses_address_total'),
          [request.params.address, paymentCred],
        );

        clientDbSync.release();

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address, paymentCredPrefix);

          if (bech32paymentCred) rows[0].address = bech32paymentCred;
        }

        let result_outputs = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        result_outputs = rows[0].sent_amount
          ? [
              {
                unit: 'lovelace',
                quantity: rows[0].sent_amount_lovelace,
              },
              ...rows[0].sent_amount,
            ]
          : [
              {
                unit: 'lovelace',
                quantity: rows[0].sent_amount_lovelace,
              },
            ];

        let result_inputs = [];

        result_inputs = rows[0].received_amount
          ? [
              {
                unit: 'lovelace',
                quantity: rows[0].received_amount_lovelace,
              },
              ...rows[0].received_amount,
            ]
          : [
              {
                unit: 'lovelace',
                quantity: rows[0].received_amount_lovelace,
              },
            ];

        const result: ResponseTypes.AddressTotal = {
          address: rows[0].address,
          received_sum: result_inputs,
          sent_sum: result_outputs,
          tx_count: rows[0].tx_count,
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
