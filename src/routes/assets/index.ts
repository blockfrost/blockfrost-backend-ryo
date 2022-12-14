import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/assets';
import * as ResponseTypes from '../../types/responses/assets';
import { getSchemaForEndpoint, validateSchema } from '@blockfrost/openapi';
import AssetFingerprint from '@emurgo/cip14-js';
import { getDbSync } from '../../utils/database';
import { handle404 } from '../../utils/error-handler';
import { SQLQuery } from '../../sql';
import { getOnchainMetadata } from '@blockfrost/openapi';
import { fetchAssetMetadata } from '../../utils/token-registry';
import { validateAsset, validatePolicy } from '@blockfrost/blockfrost-utils/lib/validation';
import { handleInvalidAsset, handleInvalidPolicy } from '@blockfrost/blockfrost-utils/lib/fastify';
import {
  getMetadataFromOutputDatum,
  ReferenceMetadataDatum,
  toCip68Assets,
} from '../../utils/cip68';

async function assets(fastify: FastifyInstance) {
  fastify.route({
    url: '/assets',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.Assets } =
          await clientDbSync.query<QueryTypes.Assets>(SQLQuery.get('assets'), [
            request.query.order,
            request.query.count,
            request.query.page,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

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

  fastify.route({
    url: '/assets/:asset/history',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}/history'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AssetHistory } =
          await clientDbSync.query<QueryTypes.AssetHistory>(SQLQuery.get('assets_asset_history'), [
            request.query.order,
            request.query.count,
            request.query.page,
            request.params.asset,
          ]);

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
    url: '/assets/:asset/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.AssetTxs>(
          SQLQuery.get('assets_asset_txs'),
          [request.query.order, request.query.count, request.query.page, request.params.asset],
        );

        clientDbSync.release();

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.tx_hash);
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
    url: '/assets/:asset/transactions',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}/transactions'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AssetTransactions } =
          await clientDbSync.query<QueryTypes.AssetTransactions>(
            SQLQuery.get('assets_asset_transactions'),
            [request.query.order, request.query.count, request.query.page, request.params.asset],
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
    url: '/assets/policy/:policy_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/policy/{policy_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsPolicyParameters>, reply) => {
      const isPolicyValid = validatePolicy(request.params.policy_id);

      if (!isPolicyValid) {
        return handleInvalidPolicy(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_policy_404'),
          [request.params.policy_id],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }
        const { rows }: { rows: ResponseTypes.PolicyPolicyId } =
          await clientDbSync.query<QueryTypes.PolicyId>(SQLQuery.get('assets_policy_policy_id'), [
            request.query.order,
            request.query.count,
            request.query.page,
            request.params.policy_id,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

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
    url: '/assets/:asset/addresses',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}/addresses'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AssetAddresses } =
          await clientDbSync.query<QueryTypes.AssetAddresses>(
            SQLQuery.get('assets_asset_addresses'),
            [request.query.order, request.query.count, request.query.page, request.params.asset],
          );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

module.exports = assets;
