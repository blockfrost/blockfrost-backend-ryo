import { FastifyInstance, FastifyRequest } from 'fastify';
import * as ResponseTypes from '../../../../types/responses/accounts.js';
import * as QueryTypes from '../../../../types/queries/accounts.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';
import { validateStakeAddress } from '../../../../utils/validation.js';
import { SQLQuery } from '../../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address/addresses/total',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/addresses/total'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.AccountAddressesTotal>(
          SQLQuery.get('accounts_stake_address_addresses_total'),
          [request.params.stake_address],
        );

        clientDbSync.release();

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

        const result: ResponseTypes.AccountAddressesTotal = {
          stake_address: rows[0].stake_address,
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
