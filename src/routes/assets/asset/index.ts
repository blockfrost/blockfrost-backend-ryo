import { getReferenceNFT } from '@blockfrost/blockfrost-utils/lib/cip68';
import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation';
import { getSchemaForEndpoint, validateCIP68Metadata } from '@blockfrost/openapi';
import { getOnchainMetadata } from '@blockfrost/openapi';
import AssetFingerprint from '@emurgo/cip14-js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/assets';
import { getMetadataFromOutputDatum } from '../../../utils/cip68';
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

        let onchainMetadata: unknown | null = null;
        let onchainMetadataStandard: string | null = null;
        const unit = `${rows[0].policy_id}${rows[0].asset_name}`;
        const referenceNFT = getReferenceNFT(unit);

        if (referenceNFT) {
          // asset is NFT 222 or FT 333, retrieve its reference NFT metadata (CIP68)
          const { rows } = await clientDbSync.query<QueryTypes.AssetOutputDatum>(
            SQLQuery.get('assets_asset_utxo_datum'),
            [referenceNFT.hex],
          );
          const datumHex = rows[0].cbor;

          if (datumHex) {
            const datumMetadata = getMetadataFromOutputDatum(datumHex);
            const result = validateCIP68Metadata(datumMetadata, referenceNFT.standard);

            if (result) {
              onchainMetadata = result.metadata;
              onchainMetadataStandard = result.version;
            }
          }
        }

        if (!onchainMetadata) {
          // validate CIP25 on-chain metadata if CIP68 metadata are not present (or not valid)
          const { onchainMetadata: CIP25OnchainMetadata, validCIPversion } = getOnchainMetadata(
            rows[0].onchain_metadata,
            rows[0].asset_name,
            rows[0].policy_id,
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
