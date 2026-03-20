import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../types/responses/scripts.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/:script_hash/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersScriptHash>, reply) => {
      const db = getDbSync(fastify);

        const rows: ResponseTypes.ScriptHashCbor[] =
          await db.any<QueryTypes.ScriptHashCbor>(
            SQLQuery.get('scripts_script_hash_cbor'),
            [request.params.script_hash],
          );

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);

    },
  });
}

export default route;
