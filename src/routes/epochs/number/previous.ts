import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { getConfig } from '../../../config';
import { GENESIS } from '../../../constants/genesis';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/epochs';
import * as ResponseTypes from '../../../types/responses/epochs';
import { getDbSync } from '../../../utils/database';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import { validatePositiveInRangeSignedInt } from '../../../utils/validation';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/previous',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/previous'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
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

        const network = getConfig().network;
        const epochLength = GENESIS[network].epoch_length;

        const { rows }: { rows: ResponseTypes.Epoch[] } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.Epoch>(
              SQLQuery.get('epochs_number_previous_unpaged'),
              [request.params.number, epochLength],
            )
          : await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_number_previous'), [
              request.params.number,
              request.query.count,
              request.query.page,
              epochLength,
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
