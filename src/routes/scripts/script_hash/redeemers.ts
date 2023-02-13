import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../types/responses/scripts.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404 } from '../../../utils/error-handler.js';
import { SQLQuery } from '../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/:script_hash/redeemers',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/redeemers'),
    method: 'GET',
    handler: async (
      request: FastifyRequest<QueryTypes.RequestParametersScriptHashRedeemers>,
      reply,
    ) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('scripts_404'),
          [request.params.script_hash],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.ScriptHashRedeemers } = unpaged
          ? await clientDbSync.query<QueryTypes.ScriptHashRedeemers>(
              SQLQuery.get('scripts_script_hash_redeemers_unpaged'),
              [request.query.order, request.params.script_hash],
            )
          : await clientDbSync.query<QueryTypes.ScriptHashRedeemers>(
              SQLQuery.get('scripts_script_hash_redeemers'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.script_hash,
              ],
            );

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
