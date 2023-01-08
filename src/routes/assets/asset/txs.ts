import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify';
import { isUnpaged } from '../../../utils/routes';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/assets';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';

async function route(fastify: FastifyInstance) {
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

        const { rows } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.AssetTxs>(
              SQLQuery.get('assets_asset_txs_unpaged'),
              [request.query.order, request.params.asset],
            )
          : await clientDbSync.query<QueryTypes.AssetTxs>(SQLQuery.get('assets_asset_txs'), [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.asset,
            ]);

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
}

export default route;
