import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/pools.js';
import * as ResponseTypes from '../../../types/responses/pools.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateAndConvertPool } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/:pool_id/relays',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/relays'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.length === 0) {
          return handle404(reply);
        }

        const rows: ResponseTypes.PoolRelays =
          await db.any<QueryTypes.PoolRelays>(SQLQuery.get('pools_pool_id_relays'), [
            pool_id,
          ]);

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);

    },
  });
}

export default route;
