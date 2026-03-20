import { FastifyInstance, FastifyRequest } from 'fastify';
import * as ResponseTypes from '../../../types/responses/accounts.js';
import * as QueryTypes from '../../../types/queries/accounts.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getAdditionalParametersFromRequest } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateStakeCred } from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address/transactions',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/transactions'),
    handler: async (
      request: FastifyRequest<QueryTypes.RequestAccountTransactionsParameters>,
      reply,
    ) => {
      const db = getDbSync(fastify);

        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeCred(request.params.stake_address);

        if (!isStakeAddressValid) {
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [isStakeAddressValid.dbSyncAddr],
        );

        if (query404.length === 0) {
          return handle404(reply);
        }

        // in case there are missing parameter,s they are being undefined
        // in node-postgres, undefined is treated as null
        const fromToParameters = getAdditionalParametersFromRequest(
          request.query.from,
          request.query.to,
        );

        if (fromToParameters === 'outOfRangeOrMalformedErr') {
          return handle400Custom(
            reply,
            'Invalid (malformed or out of range) from/to parameter(s).',
          );
        }

        const rows: ResponseTypes.AccountTransactions =
          await db.any<QueryTypes.AccountTransactionsQuery>(
            SQLQuery.get('accounts_stake_address_transactions'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              isStakeAddressValid.dbSyncAddr,
              fromToParameters[0],
              fromToParameters[1],
              fromToParameters[2],
              fromToParameters[3],
            ],
          );

        return reply.send(rows);

    },
  });
}

export default route;
