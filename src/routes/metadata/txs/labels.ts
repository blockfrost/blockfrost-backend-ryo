import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes';
import { toJSONStream } from '../../../utils/string-utils';

import * as QueryTypes from '../../../types/queries/metadata';
import * as ResponseTypes from '../../../types/responses/metadata';
import { getDbSync } from '../../../utils/database';
import { SQLQuery } from '../../../sql';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/metadata/txs/labels',
    method: 'GET',
    schema: getSchemaForEndpoint('/metadata/txs/labels'),
    handler: async (request: FastifyRequest<QueryTypes.RequestLabels>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.MetadataTxLabels } = unpaged
          ? await clientDbSync.query<QueryTypes.MetadataTxLabels>(
              SQLQuery.get('metadata_txs_labels_unpaged'),
              [request.query.order],
            )
          : await clientDbSync.query<QueryTypes.MetadataTxLabels>(
              SQLQuery.get('metadata_txs_labels'),
              [request.query.order, request.query.count, request.query.page],
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
