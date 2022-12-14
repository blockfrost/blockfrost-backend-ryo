import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/pools';
import * as ResponseTypes from '../../../types/responses/pools';
import { getDbSync } from '../../../utils/database';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import { validateAndConvertPool } from '../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/:pool_id/updates',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/updates'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.PoolUpdates } =
          await clientDbSync.query<QueryTypes.PoolUpdates>(SQLQuery.get('pools_pool_id_updates'), [
            request.query.order,
            request.query.count,
            request.query.page,
            pool_id,
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
