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
    url: '/pools/:pool_id/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/metadata'),
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

        const { rows } = await clientDbSync.query<QueryTypes.PoolMetadata>(
          SQLQuery.get('pools_pool_id_metadata'),
          [pool_id],
        );

        if (rows.length === 0) {
          clientDbSync.release();
          return reply.send({});
        }

        clientDbSync.release();

        const poolMetadataText = rows[0].metadata_text;
        const poolMetadataTextChecked =
          poolMetadataText === null
            ? {
                name: null,
                description: null,
                homepage: null,
              }
            : poolMetadataText;

        const response: ResponseTypes.PoolMetadata = {
          pool_id: rows[0].pool_id,
          hex: rows[0].hex,
          url: rows[0].url,
          hash: rows[0].hash,
          ticker: rows[0].ticker,
          name: poolMetadataTextChecked.name === undefined ? null : poolMetadataTextChecked.name,
          description:
            poolMetadataTextChecked.description === undefined
              ? null
              : poolMetadataTextChecked.description,
          homepage:
            poolMetadataTextChecked.homepage === undefined
              ? null
              : poolMetadataTextChecked.homepage,
        };

        return reply.send(response);
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
