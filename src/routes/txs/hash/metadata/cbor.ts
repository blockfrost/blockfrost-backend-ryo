import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/tx.js';
import * as ResponseTypes from '../../../../types/responses/tx.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync, gracefulRelease } from '../../../../utils/database.js';
import { handle404 } from '../../../../utils/error-handler.js';
import { SQLQuery } from '../../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash/metadata/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/metadata/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxMetadataCbor } =
          await clientDbSync.query<QueryTypes.TxMetadataCbor>(
            SQLQuery.get('txs_hash_metadata_cbor'),
            [request.params.hash],
          );

        gracefulRelease(clientDbSync);

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
