import {
  getMetadataFromOutputDatum,
  getReferenceNFT,
} from '@blockfrost/blockfrost-utils/lib/cip68.js';
import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation.js';
import {
  getOnchainMetadata,
  getSchemaForEndpoint,
  validateCIP68Metadata,
} from '@blockfrost/openapi';
import { AssetFingerprint } from '../../../utils/cip14.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/assets.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { fetchAssetMetadata } from '../../../utils/token-registry.js';

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

        if (rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        let onchainMetadata: unknown | null = null;
        let onchainMetadataExtra: string | null = null;
        let onchainMetadataStandard: string | null = null;
        const unit = `${rows[0].policy_id}${rows[0].asset_name}`;
        const referenceNFT = getReferenceNFT(unit);

        if (referenceNFT) {
          // Retrieve reference NFT metadata for CIP68 asset
          const { rows } = await clientDbSync.query<QueryTypes.AssetOutputDatum>(
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
                onchainMetadataStandard = result.version;
                onchainMetadataExtra = result.extra ?? null;
              }
            } catch (error) {
              // Invalid datum hex, should not happen
              console.error(`Error while validating CIP68 datum ${datumHex}`, error);
            }
          }
        }

        clientDbSync.release();

        if (!onchainMetadata) {
          // validate CIP25 on-chain metadata if CIP68 metadata are not present (or not valid)
          const { onchainMetadata: CIP25OnchainMetadata, validCIPversion } = getOnchainMetadata(
            rows[0].onchain_metadata,
            rows[0].asset_name,
            rows[0].policy_id,
            rows[0].onchain_metadata_cbor,
          );

          onchainMetadata = CIP25OnchainMetadata;
          onchainMetadataStandard = validCIPversion;
        }

        // retrieve off-chain metadata
        const metadata = await fetchAssetMetadata(request.params.asset);

        const fingerprint = AssetFingerprint.fromParts(
          Uint8Array.from(Buffer.from(rows[0].policy_id, 'hex')),
          Uint8Array.from(Buffer.from(rows[0].asset_name ?? '', 'hex')),
        ).fingerprint();

        return reply.send({
          ...rows[0],
          metadata,
          onchain_metadata: onchainMetadata,
          onchain_metadata_standard: onchainMetadataStandard,
          onchain_metadata_extra: onchainMetadataExtra,
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
