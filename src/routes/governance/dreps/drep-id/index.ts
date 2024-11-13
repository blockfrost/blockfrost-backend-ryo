import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { validateDRepId } from '../../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:drep_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps/{drep_id}'),

    handler: async (request: FastifyRequest<QueryTypes.RequestDRepID>, reply) => {
      let drepValidation;

      try {
        drepValidation = validateDRepId(request.params.drep_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed drep id.');
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.DRepsDrepID[] } =
          await clientDbSync.query<QueryTypes.DRepsDrepID>(
            SQLQuery.get('governance_dreps_drep_id'),
            [drepValidation.raw, drepValidation.id],
          );

        gracefulRelease(clientDbSync);
        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
