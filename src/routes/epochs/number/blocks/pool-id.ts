import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  validatePositiveInRangeSignedInt,
  validateAndConvertPool,
} from '../../../../utils/validation';
import { SQLQuery } from '../../../../sql';
import * as QueryTypes from '../../../../types/queries/epochs';
import { getDbSync } from '../../../../utils/database';
import { handle404, handle400Custom } from '../../../../utils/error-handler';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/blocks/:pool_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/blocks/{pool_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestBlockPoolIdParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const query404_epoch = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_404'),
          [request.params.number],
        );

        if (query404_epoch.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_pool_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.EpochBlocksPoolId>(
              SQLQuery.get('epochs_number_blocks_pool_id_unpaged'),
              [request.query.order, request.params.number, pool_id],
            )
          : await clientDbSync.query<QueryTypes.EpochBlocksPoolId>(
              SQLQuery.get('epochs_number_blocks_pool_id'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.number,
                pool_id,
              ],
            );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
        }

        return reply.send(list);
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
