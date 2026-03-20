import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/governance.js';
import * as ResponseTypes from '../../../../types/responses/governance.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import {
  validateDRepId,
  enhanceDRep,
  transformOffChainFetchError,
} from '../../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps/:drep_id/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps/{drep_id}/metadata'),

    handler: async (request: FastifyRequest<QueryTypes.RequestDRepID>, reply) => {
      let drepValidation;

      try {
        drepValidation = validateDRepId(request.params.drep_id);
      } catch {
        return handle400Custom(reply, 'Invalid or malformed drep id.');
      }

      const db = getDbSync(fastify);

        const rows = await db.any<QueryTypes.DRepsDrepIDMetadata>(
          SQLQuery.get('governance_dreps_drep_id_metadata'),
          [drepValidation.dbSync.raw, drepValidation.dbSync.id, drepValidation.dbSync.hasScript],
        );

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }

        const { fetch_error, ...rowWithoutFetchError } = row;

        const rowWithFetchError: ResponseTypes.DRepsDrepIDMetadata = {
          ...rowWithoutFetchError,
          ...(fetch_error && { error: transformOffChainFetchError(fetch_error) }),
        };

        const data = enhanceDRep(rowWithFetchError, drepValidation);

        return reply.send(data);

    },
  });
}

export default route;
