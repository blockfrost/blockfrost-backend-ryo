import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../utils/routes';
import * as QueryTypes from '../../types/queries/assets';
import * as ResponseTypes from '../../types/responses/assets';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../utils/database';
import { SQLQuery } from '../../sql';
import { toJSONStream } from '../../utils/string-utils';

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

        clientDbSync.release();

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
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

export default route;
