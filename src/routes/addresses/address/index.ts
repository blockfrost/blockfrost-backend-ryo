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
    url: '/addresses/:address',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const { addressType, paymentCred, paymentCredPrefix } = getAddressTypeAndPaymentCred(
        request.params.address,
      );

      if (!addressType) {
        return handleInvalidAddress(reply);
      }

      const db = getDbSync(fastify);

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('addresses_404'),
          [request.params.address, paymentCred],
        );

        if (query404.length === 0) {
          return handle404(reply);
        }

        const rows = await db.any<QueryTypes.AddressQuery>(
          SQLQuery.get('addresses_address'),
          [request.params.address, paymentCred],
        );

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          // Note: for addr_vk it will output addr_vkh
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address, paymentCredPrefix);

          if (bech32paymentCred) {
            rows[0].address = bech32paymentCred;
          }
        }

        // quantities/amounts are returned as string from database so they won't overflow JS number

        const result: ResponseTypes.Address = rows[0].amount
          ? {
              address: rows[0].address,
              amount: [
                {
                  unit: 'lovelace',
                  quantity: rows[0].amount_lovelace,
                },
                ...rows[0].amount,
              ],
              stake_address: rows[0].stake_address,
              type: addressType,
              script: rows[0].script,
            }
          : {
              address: rows[0].address,
              amount: [
                {
                  unit: 'lovelace',
                  quantity: rows[0].amount_lovelace,
                },
              ],
              stake_address: rows[0].stake_address,
              type: addressType,
              script: rows[0].script,
            };

        return reply.send(result);

    },
  });
}

export default route;
