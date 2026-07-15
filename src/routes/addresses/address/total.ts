import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import { getConfig } from '../../../config.js';
import * as QueryTypes from '../../../types/queries/addresses.js';
import * as ResponseTypes from '../../../types/responses/addresses.js';
import { getDbSync, gracefulRelease, isOverTxOutLimit } from '../../../utils/database.js';
import { handle400Custom, handle404, handleInvalidAddress } from '../../../utils/error-handler.js';
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
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        // optional guard: reject addresses with more tx outputs than the configured
        // limit instead of running the expensive aggregation (unset or 0 = disabled)
        const { addressTotalsTxOutLimit } = getConfig().dbSync;

        if (addressTotalsTxOutLimit) {
          const overLimit = await isOverTxOutLimit(
            clientDbSync,
            'addresses_address_total_over_limit',
            [request.params.address, paymentCred],
            addressTotalsTxOutLimit,
          );

          if (overLimit) {
            gracefulRelease(clientDbSync);
            return handle400Custom(reply, 'Address is too large to compute totals for.');
          }
        }

        const { rows } = await clientDbSync.query<QueryTypes.AddressTotalQuery>(
          SQLQuery.get('addresses_address_total'),
          [request.params.address, paymentCred],
        );

        gracefulRelease(clientDbSync);

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
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
