import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../utils/routes';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../sql';
import * as QueryTypes from '../../types/queries/pools';
import * as ResponseTypes from '../../types/responses/pools';
import { getDbSync } from '../../utils/database';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/retired',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/retired'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.PoolRetire } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.PoolsRetire>(
              SQLQuery.get('pools_retired_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.PoolsRetire>(SQLQuery.get('pools_retired'), [
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
