import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes';
import * as QueryTypes from '../../../types/queries/scripts';
import * as ResponseTypes from '../../../types/responses/scripts';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';
import { SQLQuery } from '../../../sql';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

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

        const { rows }: { rows: ResponseTypes.ScriptHashRedeemers } = isUnpaged(request)
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
