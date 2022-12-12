import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/addresses';
import * as ResponseTypes from '../../types/responses/addresses';
import { getDbSync } from '../../utils/database';
import { getSchemaForEndpoint, getOnchainMetadata } from '@blockfrost/openapi';
import { getAdditionalParametersFromRequest } from '../../utils/string-utils';
import { handle400Custom, handle404, handleInvalidAddress } from '../../utils/error-handler';
import { getAddressTypeAndPaymentCred, paymentCredToBech32Address } from '../../utils/validation';
import { SQLQuery } from '../../sql';
import { fetchAssetMetadata } from '../../utils/token-registry';
import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation';

async function addresses(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
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

        const { rows } = await clientDbSync.query<QueryTypes.AddressQuery>(
          SQLQuery.get('addresses_address'),
          [request.params.address, paymentCred],
        );

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address);

          if (bech32paymentCred) rows[0].address = bech32paymentCred;
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

        clientDbSync.release();

        return reply.send(result);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/addresses/:address/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/extended'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
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
        const { rows } = await clientDbSync.query<QueryTypes.AddressExtendedQuery>(
          SQLQuery.get('addresses_address_extended'),
          [request.params.address, paymentCred],
        );

        clientDbSync.release();

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address);

          if (bech32paymentCred) rows[0].address = bech32paymentCred;
        }

        const assetsAmount: ResponseTypes.AmountExtended = [];

        // add off-chain data to all assets if they exist
        if (rows[0].amount) {
          for (const asset of rows[0].amount) {
            const unit = `${asset.policy_id}${asset.asset_name}`;
            const registryData = await fetchAssetMetadata(unit);
            const { onchainMetadata } = getOnchainMetadata(
              asset.onchain_metadata,
              asset.asset_name,
              asset.policy_id,
            );

            assetsAmount.push({
              unit: unit,
              quantity: asset.quantity,
              decimals: registryData?.decimals ?? null,
              has_nft_onchain_metadata: onchainMetadata !== null,
            });
          }
        }

        // quantities/amounts are returned as string from database so they won't overflow JS number
        const result: ResponseTypes.AddressExtended = rows[0].amount
          ? {
              address: rows[0].address,
              amount: [
                {
                  unit: 'lovelace',
                  quantity: rows[0].amount_lovelace,
                  decimals: 6,
                  has_nft_onchain_metadata: false,
                },
                ...assetsAmount,
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
                  decimals: 6,
                  has_nft_onchain_metadata: false,
                },
              ],
              stake_address: rows[0].stake_address,
              type: addressType,
              script: rows[0].script,
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

  fastify.route({
    url: '/addresses/:address/total',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/total'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
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

        const { rows } = await clientDbSync.query<QueryTypes.AddressTotalQuery>(
          SQLQuery.get('addresses_address_total'),
          [request.params.address, paymentCred],
        );

        clientDbSync.release();

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address);

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

  fastify.route({
    url: '/addresses/:address/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersTxs>, reply) => {
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

        const { rows } = await clientDbSync.query<QueryTypes.AddressTx>(
          SQLQuery.get('addresses_address_txs'),
          [
            request.query.order,
            request.query.count,
            request.query.page,
            request.params.address,
            paymentCred,
          ],
        );

        clientDbSync.release();

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
        }
        return reply.send(list);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/addresses/:address/transactions',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/transactions'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersTransactions>, reply) => {
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

        // in case there are missing parameter,s they are being undefined
        // in node-postgres, undefined is treated as null
        const fromToParameters = getAdditionalParametersFromRequest(
          request.query.from,
          request.query.to,
        );

        if (fromToParameters === 'outOfRangeOrMalformedErr') {
          clientDbSync.release();
          return handle400Custom(
            reply,
            'Invalid (malformed or out of range) from/to parameter(s).',
          );
        }

        const { rows }: { rows: ResponseTypes.AddressTransactions } =
          await clientDbSync.query<QueryTypes.AddressTransactionsQuery>(
            SQLQuery.get('addresses_address_transactions'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.address,
              paymentCred,
              fromToParameters[0],
              fromToParameters[1],
              fromToParameters[2],
              fromToParameters[3],
            ],
          );

        clientDbSync.release();

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

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

        const { rows } = await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
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

  fastify.route({
    url: '/addresses/:address/utxos/:asset',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/utxos/{asset}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersUtxosAsset>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }

      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
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

        const query404_asset = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404_asset.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.AddressUtxosQuery>(
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

module.exports = addresses;
