import { FastifyInstance, FastifyRequest } from 'fastify';
import * as ResponseTypes from '../../../types/responses/accounts';
import * as QueryTypes from '../../../types/queries/accounts';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../utils/database';
import { handle400Custom, handle404 } from '../../../utils/error-handler';
import { validateStakeAddress } from '../../../utils/validation';
import { SQLQuery } from '../../../sql';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address/mirs',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/mirs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountWithdrawalsAndMirs } =
          await clientDbSync.query<QueryTypes.AccountWithdrawalsAndMirs>(
            SQLQuery.get('accounts_stake_address_mirs'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
            ],
          );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
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
