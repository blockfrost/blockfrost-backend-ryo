import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../../../sql/index.js';
import * as QueryTypes from '../../../../../types/queries/blocks.js';
import * as ResponseTypes from '../../../../../types/responses/blocks.js';
import { getDbSync } from '../../../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../../../utils/error-handler.js';
import { validatePositiveInRangeSignedInt } from '../../../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/epoch/:epoch_number/slot/:slot_number',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/epoch/{epoch_number}/slot/{slot_number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersEpochSlot>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.epoch_number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        if (!validatePositiveInRangeSignedInt(request.params.slot_number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed slot_number.');
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<ResponseTypes.Block>(
            SQLQuery.get('blocks_epoch_number_slot_slot_number'),
            [request.params.epoch_number, request.params.slot_number],
          );

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
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
