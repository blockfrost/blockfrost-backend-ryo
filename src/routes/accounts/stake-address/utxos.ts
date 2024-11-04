import { validateStakeAddress } from '../../../utils/validation.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as ResponseTypes from '../../../types/responses/accounts.js';
import * as QueryTypes from '../../../types/queries/accounts.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address/utxos',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/utxos'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          gracefulRelease(clientDbSync);
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.AccountUtxosQuery>(
              SQLQuery.get('accounts_stake_address_utxos_unpaged'),
              [request.query.order, request.params.stake_address],
            )
          : await clientDbSync.query<QueryTypes.AccountUtxosQuery>(
              SQLQuery.get('accounts_stake_address_utxos'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.stake_address,
              ],
            );

        gracefulRelease(clientDbSync);

        const result: ResponseTypes.AccountUtxos = rows.map(row => ({
          address: row.address,
          tx_hash: row.tx_hash,
          tx_index: row.tx_index,
          output_index: row.output_index,
          amount: [
            {
              unit: 'lovelace',
              quantity: row.amount_lovelace,
            },
            ...(row.amount ?? []),
          ],
          block: row.block,
          data_hash: row.data_hash,
          inline_datum: row.inline_datum,
          reference_script_hash: row.reference_script_hash,
        }));

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
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
