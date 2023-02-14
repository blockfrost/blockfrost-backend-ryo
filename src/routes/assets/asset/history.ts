import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import * as QueryTypes from '../../../types/queries/assets.js';
import * as ResponseTypes from '../../../types/responses/assets.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation.js';
import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify.js';

async function route(fastify: FastifyInstance) {
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

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.AssetHistory } = unpaged
          ? await clientDbSync.query<QueryTypes.AssetHistory>(
              SQLQuery.get('assets_asset_history_unpaged'),
              [request.query.order, request.params.asset],
            )
          : await clientDbSync.query<QueryTypes.AssetHistory>(
              SQLQuery.get('assets_asset_history'),
              [request.query.order, request.query.count, request.query.page, request.params.asset],
            );

        clientDbSync.release();

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(rows, reply.raw);
          return reply;
        } else {
          return reply.send(rows);
        }
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
