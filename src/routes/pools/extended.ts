import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../utils/routes';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../sql';
import * as QueryTypes from '../../types/queries/pools';
import * as ResponseTypes from '../../types/responses/pools';
import { getDbSync } from '../../utils/database';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/extended'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.PoolsExtended } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.PoolsExtended>(
              SQLQuery.get('pools_extended_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.PoolsExtended>(SQLQuery.get('pools_extended'), [
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
