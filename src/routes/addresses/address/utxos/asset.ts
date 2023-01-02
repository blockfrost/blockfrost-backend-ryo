import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify';
import { isUnpaged } from '../../../../utils/routes';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql';
import * as QueryTypes from '../../../../types/queries/addresses';
import * as ResponseTypes from '../../../../types/responses/addresses';
import { getDbSync } from '../../../../utils/database';
import { handle404, handleInvalidAddress } from '../../../../utils/error-handler';
import { getAddressTypeAndPaymentCred } from '../../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address/utxos/:asset',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/utxos/{asset}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersUtxosAsset>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }

      // querying lovelace is a special case covering just UTxOs without assets
      if (request.params.asset !== 'lovelace') {
        const isAssetValid = validateAsset(request.params.asset);

        if (!isAssetValid) return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404_address = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('addresses_404'),
          [request.params.address, paymentCred],
        );

        if (query404_address.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        if (request.params.asset !== 'lovelace') {
          const query404_asset = await clientDbSync.query<QueryTypes.ResultFound>(
            SQLQuery.get('assets_404'),
            [request.params.asset],
          );

          if (query404_asset.rows.length === 0) {
            clientDbSync.release();
            return handle404(reply);
          }
        }

        const { rows } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
              SQLQuery.get('addresses_address_utxos_asset_unpaged'),
              [request.query.order, request.params.address, paymentCred, request.params.asset],
            )
          : await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
              SQLQuery.get('addresses_address_utxos_asset'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.address,
                paymentCred,
                request.params.asset,
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
