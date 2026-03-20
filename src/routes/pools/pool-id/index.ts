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
    url: '/pools/:pool_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const rows: ResponseTypes.PoolID[] =
          await db.any<QueryTypes.PoolID>(SQLQuery.get('pools_pool_id'), [pool_id]);

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);

    },
  });
}

export default route;
