import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/assets.js';
import * as ResponseTypes from '../../types/responses/assets.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync, gracefulRelease } from '../../utils/database.js';
import { SQLQuery } from '../../sql/index.js';
import { isUnpaged } from '../../utils/routes.js';
import { toJSONStream } from '../../utils/string-utils.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/assets',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.Assets } = unpaged
          ? await clientDbSync.query<QueryTypes.Assets>(SQLQuery.get('assets_unpaged'), [
              request.query.order,
            ])
          : await clientDbSync.query<QueryTypes.Assets>(SQLQuery.get('assets'), [
              request.query.order,
              request.query.count,
              request.query.page,
            ]);

        gracefulRelease(clientDbSync);

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
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
