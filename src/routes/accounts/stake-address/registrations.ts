import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import * as ResponseTypes from '../../../types/responses/accounts.js';
import * as QueryTypes from '../../../types/queries/accounts.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { handle400Custom, handle404 } from '../../../utils/error-handler.js';
import { validateStakeAddress } from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address/registrations',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/registrations'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          gracefulRelease(clientDbSync);
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          gracefulRelease(clientDbSync);
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.AccountRegistrations } = unpaged
          ? await clientDbSync.query<QueryTypes.AccountRegistrations>(
              SQLQuery.get('accounts_stake_address_registrations_unpaged'),
              [request.query.order, request.params.stake_address],
            )
          : await clientDbSync.query<QueryTypes.AccountRegistrations>(
              SQLQuery.get('accounts_stake_address_registrations'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.stake_address,
              ],
            );

        gracefulRelease(clientDbSync);

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
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
