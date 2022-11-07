import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/assets';
import * as ResponseTypes from '../../types/responses/assets';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import AssetFingerprint from '@emurgo/cip14-js';
import { getDbSync } from '../../utils/database';
import { handle404 } from '../../utils/error-handler';
import * as Sentry from '@sentry/node';
import { SQLQuery } from '../../sql';
import { fetchAssetMetadata } from '../../utils/token-registry';

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
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Asset>(SQLQuery.get('assets_asset'), [
          request.params.asset,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        const registryData = await fetchAssetMetadata(request.params.asset);

        rows[0].metadata = registryData;

        try {
          if (rows[0].onchain_metadata) {
            const policyId = rows[0].policy_id;
            let assetNameUTF8;
            // try to convert asset name from hex to UTF-8, if it fails, no metadata will be displayed
            // there is no guarantee nor rule the name SHOULD be UTF-8, only a good will and sanity of the submitter

            if (rows[0].asset_name) {
              //assetNameUTF8 = `\\x${Buffer.from(rows[0].asset_name).toString('hex')}`;
              assetNameUTF8 = Buffer.from(rows[0].asset_name, 'hex').toString('utf8');
            }

            if (assetNameUTF8) {
              let onchainMetadata = null;

              try {
                // Check if the onchain_metadata for a specific coin exist (there may be more than 1 in metadata)
                // NOTE: adherence to standard https://github.com/cardano-foundation/CIPs/pull/85 is not checked at all
                // (people didn't like doing things right)
                onchainMetadata = rows[0].onchain_metadata[policyId][assetNameUTF8];
              } catch {
                // if not, we display all the information
                // console.info(`Mangled onchain_metadata JSON for: ${request.url}`);
              }
              if (onchainMetadata) {
                // if we find the correct asset, we display the data just for that specific asset
                rows[0].onchain_metadata = onchainMetadata;
              }
            } else {
              rows[0].onchain_metadata = null;
            }
          }
        } catch (error) {
          Sentry.captureException(error);
          console.error(`Error in metadata ${request.params.asset}`, error);
        }

        rows[0].fingerprint = AssetFingerprint.fromParts(
          Uint8Array.from(Buffer.from(rows[0].policy_id, 'hex')),
          Uint8Array.from(Buffer.from(rows[0].asset_name ?? '', 'hex')),
        ).fingerprint();

        return reply.send(rows[0] as ResponseTypes.Asset);
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
