import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/addresses.js';
import * as AssetQueryTypes from '../../../types/queries/assets.js';
import * as ResponseTypes from '../../../types/responses/addresses.js';
import { getDbSync } from '../../../utils/database.js';
import {
  getSchemaForEndpoint,
  getOnchainMetadata,
  validateCIP68Metadata,
} from '@blockfrost/openapi';
import { handle404, handleInvalidAddress } from '../../../utils/error-handler.js';
import {
  getAddressTypeAndPaymentCred,
  paymentCredToBech32Address,
} from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';
import { fetchAssetMetadata } from '../../../utils/token-registry.js';
import {
  getMetadataFromOutputDatum,
  getReferenceNFT,
} from '@blockfrost/blockfrost-utils/lib/cip68.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/extended'),
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
        const { rows } = await clientDbSync.query<QueryTypes.AddressExtendedQuery>(
          SQLQuery.get('addresses_address_extended'),
          [request.params.address, paymentCred],
        );

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address, paymentCredPrefix);

          if (bech32paymentCred) rows[0].address = bech32paymentCred;
        }

        const assetsAmount: ResponseTypes.AmountExtended = [];

        // add off-chain data to all assets if they exist
        if (rows[0].amount) {
          for (const asset of rows[0].amount) {
            const unit = `${asset.policy_id}${asset.asset_name}`;
            const registryData = await fetchAssetMetadata(unit);
            let decimals = registryData?.decimals ?? null;

            let onchainMetadata:
              | ReturnType<typeof getOnchainMetadata>['onchainMetadata']
              | Extract<ReturnType<typeof validateCIP68Metadata>, { metadata: unknown }>['metadata']
              | null = null;

            const referenceNFT = getReferenceNFT(unit);

            if (referenceNFT) {
              // asset is NFT 222 or FT 333, retrieve its reference NFT metadata (CIP68)
              const { rows } = await clientDbSync.query<AssetQueryTypes.AssetOutputDatum>(
                SQLQuery.get('assets_asset_utxo_datum'),
                [referenceNFT.hex],
              );

              const datumHex = rows[0] ? rows[0].cbor : null;

              if (datumHex) {
                try {
                  const datumMetadata = getMetadataFromOutputDatum(datumHex, {
                    standard: referenceNFT.standard,
                  });
                  const result = validateCIP68Metadata(datumMetadata, referenceNFT.standard);

                  if (result) {
                    onchainMetadata = result.metadata;
                    decimals =
                      (referenceNFT.standard === 'ft' || referenceNFT.standard === 'rft') &&
                      typeof result.metadata.decimals === 'number'
                        ? result.metadata.decimals
                        : decimals;
                  }
                } catch (error) {
                  // Invalid datum hex, should not happen
                  console.error(`Error while validating CIP68 datum ${datumHex}`, error);
                }
              }
            }

            if (!onchainMetadata) {
              // validate CIP25 on-chain metadata if CIP68 metadata are not present (or not valid)
              const { onchainMetadata: CIP25OnchainMetadata } = getOnchainMetadata(
                asset.onchain_metadata,
                asset.asset_name,
                asset.policy_id,
                asset.onchain_metadata_cbor,
              );

              onchainMetadata = CIP25OnchainMetadata;
            }

            assetsAmount.push({
              unit: unit,
              quantity: asset.quantity,
              decimals: decimals,
              has_nft_onchain_metadata: onchainMetadata !== null,
            });
          }
        }

        clientDbSync.release();

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
}

export default route;
