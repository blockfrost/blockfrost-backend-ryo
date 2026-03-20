import { FastifyInstance, FastifyRequest } from 'fastify';
import * as ResponseTypes from '../../../types/responses/accounts.js';
import * as QueryTypes from '../../../types/queries/accounts.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateStakeAddress } from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';
import { dbSyncDRepToCIP129 } from '../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const db = getDbSync(fastify);

        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const rows: (ResponseTypes.Account & { drep_id_has_script: boolean })[] =
          await db.any<QueryTypes.Account>(SQLQuery.get('accounts_stake_address'), [
            request.params.stake_address,
          ]);

        if (rows.length === 0) {
          return handle404(reply);
        }

        const row = rows[0];

        if (row.drep_id) {
          // Convert legacy drep_id  to CIP129 format
          const cip129DRep = dbSyncDRepToCIP129({
            drep_id: row.drep_id,
            has_script: row.drep_id_has_script,
          });

          row.drep_id = cip129DRep.id;
        }
        return reply.send(row);

    },
  });
}

export default route;
