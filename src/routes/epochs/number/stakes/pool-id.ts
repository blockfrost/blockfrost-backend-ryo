import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../../utils/routes.js';
import { toJSONStream } from '../../../../utils/string-utils.js';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../../sql/index.js';
import * as QueryTypes from '../../../../types/queries/epochs.js';
import * as ResponseTypes from '../../../../types/responses/epochs.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';
import {
  validateAndConvertPool,
  validatePositiveInRangeSignedInt,
} from '../../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/epochs/:number/stakes/:pool_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/epochs/{number}/stakes/{pool_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestStakePoolIdParameters>, reply) => {
      const db = getDbSync(fastify);

        if (!validatePositiveInRangeSignedInt(request.params.number)) {
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        const query404_epoch = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_404'),
          [request.params.number],
        );

        if (query404_epoch.length === 0) {
          return handle404(reply);
        }

        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('epochs_pool_404'),
          [pool_id],
        );

        if (query404_pool.length === 0) {
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const rows: ResponseTypes.EpochStakesPoolId = unpaged
          ? await db.any<QueryTypes.EpochStakesPoolId>(
              SQLQuery.get('epochs_number_stakes_pool_id_unpaged'),
              [request.params.number, pool_id],
            )
          : await db.any<QueryTypes.EpochStakesPoolId>(
              SQLQuery.get('epochs_number_stakes_pool_id'),
              [request.params.number, request.query.count, request.query.page, pool_id],
            );

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

    },
  });
}

export default route;
