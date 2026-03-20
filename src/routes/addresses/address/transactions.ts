import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes.js';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/addresses.js';
import * as ResponseTypes from '../../../types/responses/addresses.js';
import { getDbSync } from '../../../utils/database.js';
import { handle400Custom, handle404, handleInvalidAddress } from '../../../utils/error-handler.js';
import { toJSONStream } from '../../../utils/string-utils.js';
import { getAdditionalParametersFromRequest } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { getAddressTypeAndPaymentCred } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/addresses/:address/transactions',
    method: 'GET',
    schema: getSchemaForEndpoint('/addresses/{address}/transactions'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersTransactions>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }
      const db = getDbSync(fastify);

        const query404 = await db.any<QueryTypes.ResultFound>(
          SQLQuery.get('addresses_404'),
          [request.params.address, paymentCred],
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

        const unpaged = isUnpaged(request);
        const rows: ResponseTypes.AddressTransactions = unpaged
          ? await db.any<QueryTypes.AddressTransactionsQuery>(
              SQLQuery.get('addresses_address_transactions_unpaged'),
              [
                request.query.order,
                request.params.address,
                paymentCred,
                fromToParameters[0],
                fromToParameters[1],
                fromToParameters[2],
                fromToParameters[3],
              ],
            )
          : await db.any<QueryTypes.AddressTransactionsQuery>(
              SQLQuery.get('addresses_address_transactions'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.address,
                paymentCred,
                fromToParameters[0],
                fromToParameters[1],
                fromToParameters[2],
                fromToParameters[3],
              ],
            );

        if (unpaged) {
          // Use of Reply.raw functions is at your own risk as you are skipping all the Fastify logic of handling the HTTP response
          // https://www.fastify.io/docs/latest/Reference/Reply/#raw
          reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
          await toJSONStream(rows, reply.raw);
          return reply;
        } else {
          return reply.send(rows);
        }

    },
  });
}

export default route;
