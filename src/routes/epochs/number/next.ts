import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { getConfig } from '../../../config.js';
import { GENESIS } from '../../../constants/genesis.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../types/responses/epochs.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404, handle400Custom } from '../../../utils/error-handler.js';
import { validatePositiveInRangeSignedInt } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/next',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/next'),
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

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.Epoch[] } = unpaged
          ? await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_number_next_unpaged'), [
              request.params.number,
              epochLength,
            ])
          : await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('epochs_number_next'), [
              request.params.number,
              request.query.count,
              request.query.page,
              epochLength,
            ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(rows, reply.raw);
          return reply;
        } else {
          return reply.send(rows);
        }
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
