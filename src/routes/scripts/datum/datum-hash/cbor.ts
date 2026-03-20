import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/scripts.js';
import * as ResponseTypes from '../../../../types/responses/scripts.js';
import { getDbSync } from '../../../../utils/database.js';
import { handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts/datum/:datum_hash/cbor',
    schema: getSchemaForEndpoint('/scripts/datum/{datum_hash}/cbor'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDatumHash>, reply) => {
      const db = getDbSync(fastify);

        const rows: ResponseTypes.DatumHashCbor[] =
          await db.any<QueryTypes.DatumHashCbor>(
            SQLQuery.get('scripts_datum_datum_hash_cbor'),
            [request.params.datum_hash],
          );

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);

    },
  });
}

export default network;
