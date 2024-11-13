import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { toJSONStream } from '../../../../utils/string-utils.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/epochs.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { handle404, handle400Custom } from '../../../../utils/error-handler.js';
import { validatePositiveInRangeSignedInt } from '../../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/blocks',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/blocks'),
    handler: async (request: FastifyRequest<QueryTypes.RequestBlockParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          gracefulRelease(clientDbSync);
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_404'),
          [request.params.number],
        );

        if (query404.rows.length === 0) {
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows } = unpaged
          ? await clientDbSync.query<QueryTypes.EpochBlocks>(
              SQLQuery.get('epochs_number_blocks_unpaged'),
              [request.query.order, request.params.number],
            )
          : await clientDbSync.query<QueryTypes.EpochBlocks>(SQLQuery.get('epochs_number_blocks'), [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.number,
            ]);

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
        }

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(list, reply.raw);
          return reply;
        } else {
          return reply.send(list);
        }
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
