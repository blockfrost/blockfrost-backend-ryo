import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes';
import * as QueryTypes from '../../../types/queries/blocks';
import * as ResponseTypes from '../../../types/responses/blocks';
import { getDbSync } from '../../../utils/database';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import {
  validatePositiveInRangeSignedInt,
  validateBlockHash,
  isNumber,
} from '../../../utils/validation';
import { SQLQuery } from '../../../sql';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/:hash_or_number/next',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/next'),
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

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.Block[] } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.Block>(
              SQLQuery.get('blocks_hash_or_number_next_unpaged'),
              [request.params.hash_or_number],
            )
          : await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_hash_or_number_next'), [
              request.params.hash_or_number,
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

module.exports = route;
