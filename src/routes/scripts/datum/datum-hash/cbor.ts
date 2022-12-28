import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/scripts';
import * as ResponseTypes from '../../../../types/responses/scripts';
import { getDbSync } from '../../../../utils/database';
import { handle404 } from '../../../../utils/error-handler';
import { SQLQuery } from '../../../../sql';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/datum/:datum_hash/cbor',
    schema: getSchemaForEndpoint('/scripts/datum/{datum_hash}/cbor'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDatumHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.DatumHashCbor[] } =
          await clientDbSync.query<QueryTypes.DatumHashCbor>(
            SQLQuery.get('scripts_datum_datum_hash_cbor'),
            [request.params.datum_hash],
          );

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

module.exports = network;
