import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql';
import * as QueryTypes from '../../../../types/queries/epochs';
import * as ResponseTypes from '../../../../types/responses/epochs';
import { getDbSync } from '../../../../utils/database';
import { handle400Custom, handle404 } from '../../../../utils/error-handler';
import { validatePositiveInRangeSignedInt } from '../../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/stakes',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/stakes'),
    handler: async (request: FastifyRequest<QueryTypes.RequestStakeParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_404'),
          [request.params.number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.EpochStakes } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.EpochStake>(
              SQLQuery.get('epochs_number_stakes_unpaged'),
              [request.params.number],
            )
          : await clientDbSync.query<QueryTypes.EpochStake>(SQLQuery.get('epochs_number_stakes'), [
              request.params.number,
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
