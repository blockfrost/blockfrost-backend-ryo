import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../../types/responses/scripts.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/datum/:datum_hash',
    schema: getSchemaForEndpoint('/scripts/datum/{datum_hash}'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDatumHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.DatumHash[] } =
          await clientDbSync.query<QueryTypes.DatumHash>(SQLQuery.get('scripts_datum_datum_hash'), [
            request.params.datum_hash,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

export default network;
