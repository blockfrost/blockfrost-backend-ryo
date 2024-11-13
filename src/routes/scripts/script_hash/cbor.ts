import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../types/responses/scripts.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/:script_hash/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersScriptHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.ScriptHashCbor[] } =
          await clientDbSync.query<QueryTypes.ScriptHashCbor>(
            SQLQuery.get('scripts_script_hash_cbor'),
            [request.params.script_hash],
          );

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
