import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/assets.js';
import * as ResponseTypes from '../../../types/responses/assets.js';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { validateAsset } from '@blockfrost/blockfrost-utils/lib/validation.js';
import { handleInvalidAsset } from '@blockfrost/blockfrost-utils/lib/fastify.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/assets/:asset/addresses',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/{asset}/addresses'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const isAssetValid = validateAsset(request.params.asset);

      if (!isAssetValid) {
        return handleInvalidAsset(reply);
      }

      const db = getDbSync(fastify);

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('assets_404'),
          [request.params.asset],
        );

        if (query404.length === 0) {
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const rows: ResponseTypes.AssetAddresses = unpaged
          ? await db.any<QueryTypes.AssetAddresses>(
              SQLQuery.get('assets_asset_addresses_unpaged'),
              [request.query.order, request.params.asset],
            )
          : await db.any<QueryTypes.AssetAddresses>(
              SQLQuery.get('assets_asset_addresses'),
              [request.query.order, request.query.count, request.query.page, request.params.asset],
            );

        if (rows.length === 0) {
          return reply.send([]);
        }

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(rows, reply.raw);
          return reply;
        } else {
          return reply.send(rows);
        }

    },
  });
}

export default route;
