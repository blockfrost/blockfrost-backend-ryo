import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../types/responses/blocks.js';
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
    url: '/blocks/:hash_or_number',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_hash_or_number'), [
            request.params.hash_or_number,
          ]);

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
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
