import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql';
import * as QueryTypes from '../../../../types/queries/epochs';
import * as ResponseTypes from '../../../../types/responses/epochs';
import { getDbSync } from '../../../../utils/database';
import { handle400Custom, handle404 } from '../../../../utils/error-handler';
import {
  validateAndConvertPool,
  validatePositiveInRangeSignedInt,
} from '../../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/stakes/:pool_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/stakes/{pool_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestStakePoolIdParameters>, reply) => {
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

        const { rows }: { rows: ResponseTypes.EpochStakesPoolId } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.EpochStakesPoolId>(
              SQLQuery.get('epochs_number_stakes_pool_id_unpaged'),
              [request.params.number, pool_id],
            )
          : await clientDbSync.query<QueryTypes.EpochStakesPoolId>(
              SQLQuery.get('epochs_number_stakes_pool_id'),
              [request.params.number, request.query.count, request.query.page, pool_id],
            );

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
