import { handleInvalidPolicy } from '@blockfrost/blockfrost-utils/lib/fastify';
import { isUnpaged } from '../../../utils/routes';
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

        const { rows }: { rows: ResponseTypes.PolicyPolicyId } = isUnpaged(request)
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
