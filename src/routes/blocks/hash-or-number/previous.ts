import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../types/responses/blocks.js';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { getDbSync } from '../../../utils/database.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import {
  validatePositiveInRangeSignedInt,
  validateBlockHash,
  isNumber,
} from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/:hash_or_number/previous',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/previous'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const db = getDbSync(fastify);

        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.length === 0) {
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const rows: ResponseTypes.Block[] = unpaged
          ? await db.any<QueryTypes.Block>(
              SQLQuery.get('blocks_hash_or_number_previous_unpaged'),
              [request.params.hash_or_number],
            )
          : await db.any<QueryTypes.Block>(
              SQLQuery.get('blocks_hash_or_number_previous'),
              [request.params.hash_or_number, request.query.count, request.query.page],
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
