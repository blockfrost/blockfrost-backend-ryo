import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/pools.js';
import * as ResponseTypes from '../../../types/responses/pools.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateAndConvertPool } from '../../../utils/validation.js';
import { enhancePoolMetadata } from '../../../utils/transformations.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools/:pool_id/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/metadata'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          gracefulRelease(clientDbSync);
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.PoolMetadata>(
          SQLQuery.get('pools_pool_id_metadata'),
          [pool_id],
        );

        if (rows.length === 0) {
          gracefulRelease(clientDbSync);
          return reply.send({});
        }

        gracefulRelease(clientDbSync);

        const data: ResponseTypes.PoolMetadata = enhancePoolMetadata(rows[0]);

        return reply.send(data);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
