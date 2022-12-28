import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation';
import { getSchemaForEndpoint, validateSchema } from '@blockfrost/openapi';
import { getOnchainMetadata } from '@blockfrost/openapi';
import AssetFingerprint from '@emurgo/cip14-js';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/assets';
import {
  getMetadataFromOutputDatum,
  ReferenceMetadataDatum,
  toCip68Assets,
} from '../../../utils/cip68';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';
import { fetchAssetMetadata } from '../../../utils/token-registry';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/assets/:asset',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Asset>(SQLQuery.get('assets_asset'), [
          request.params.asset,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        let referenceMetadata: ReferenceMetadataDatum | null = null;
        const assetHex = `${rows[0].policy_id}${rows[0].asset_name}`;
        const cip68Assets = toCip68Assets(assetHex);
        const isFT = cip68Assets?.ft === assetHex;
        const isNFT = cip68Assets?.nft === assetHex;

        if (isFT || isNFT) {
          // asset is NFT 222 or FT 333, retrieve its reference NFT metadata
          const { rows } = await clientDbSync.query<any>(SQLQuery.get('assets_asset_utxo_datum'), [
            cip68Assets.reference_nft,
          ]);
          const datumHex = rows[0];

          if (datumHex) {
            const datumMetadata = getMetadataFromOutputDatum(datumHex);

            if (isNFT) {
              const { isValid: isValidNFT } = validateSchema(
                'asset_onchain_metadata_cip68_nft_222',
                datumMetadata,
              );

              if (isValidNFT) {
                referenceMetadata = datumMetadata;
              }
            } else if (isFT) {
              const { isValid: isValidFT } = validateSchema(
                'asset_onchain_metadata_cip68_ft_333',
                datumMetadata,
              );

              if (isValidFT) {
                referenceMetadata = datumMetadata;
              }
            }
          }
        }

        // Validate onchain metadata
        const { onchainMetadata, validCIPversion } = getOnchainMetadata(
          rows[0].onchain_metadata,
          rows[0].asset_name,
          rows[0].policy_id,
        );

        const metadata = await fetchAssetMetadata(request.params.asset);
        const fingerprint = AssetFingerprint.fromParts(
          Uint8Array.from(Buffer.from(rows[0].policy_id, 'hex')),
          Uint8Array.from(Buffer.from(rows[0].asset_name ?? '', 'hex')),
        ).fingerprint();

        return reply.send({
          ...rows[0],
          metadata,
          onchain_metadata: referenceMetadata?.metadata ?? onchainMetadata,
          onchain_metadata_standard: referenceMetadata ? 'CIP68v1' : validCIPversion,
          fingerprint,
        });
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
