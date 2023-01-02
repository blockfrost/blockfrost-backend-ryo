import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/assets';
import * as ResponseTypes from '../../types/responses/assets';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../utils/database';
import { SQLQuery } from '../../sql';

async function route(fastify: FastifyInstance) {
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
}

export default route;
