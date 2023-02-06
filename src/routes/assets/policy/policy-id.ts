import { handleInvalidPolicy } from '@blockfrost/blockfrost-utils/lib/fastify';
import { isUnpaged } from '../../../utils/routes';
import { toJSONStream } from '../../../utils/string-utils';

import { validatePolicy } from '@blockfrost/blockfrost-utils/lib/validation';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/assets';
import * as ResponseTypes from '../../../types/responses/assets';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/assets/policy/:policy_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/assets/policy/{policy_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAssetsPolicyParameters>, reply) => {
      const isPolicyValid = validatePolicy(request.params.policy_id);

      if (!isPolicyValid) {
        return handleInvalidPolicy(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('assets_policy_404'),
          [request.params.policy_id],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.PolicyPolicyId } = unpaged
          ? await clientDbSync.query<QueryTypes.PolicyId>(
              SQLQuery.get('assets_policy_policy_id_unpaged'),
              [request.query.order, request.params.policy_id],
            )
          : await clientDbSync.query<QueryTypes.PolicyId>(SQLQuery.get('assets_policy_policy_id'), [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.policy_id,
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
