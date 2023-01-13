import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../../types/queries/nutlink.js';
import * as ResponseTypes from '../../../../types/responses/nutlink.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../../utils/database.js';
import { handle404, handleInvalidAddress } from '../../../../utils/error-handler.js';
import { getAddressTypeAndPaymentCred } from '../../../../utils/validation.js';
import { SQLQuery } from '../../../../sql/index.js';
import { isUnpaged } from '../../../../utils/routes.js';
import { toJSONStream } from '../../../../utils/string-utils.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/nutlink/:address/tickers/:ticker',
    method: 'GET',
    schema: getSchemaForEndpoint('/nutlink/{address}/tickers/{ticker}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersAddressTicker>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404_address = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('nutlink_address_404'),
          [request.params.address, paymentCred],
        );

        if (query404_address.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const query404_ticker = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('nutlink_ticker_404'),
          [request.params.ticker],
        );

        if (query404_ticker.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const unpaged = isUnpaged(request);
        const { rows }: { rows: ResponseTypes.NutlinkAddressTicker } = unpaged
          ? await clientDbSync.query<QueryTypes.NutlinkAddressTicker>(
              SQLQuery.get('nutlink_address_tickers_ticker_unpaged'),
              [request.query.order, request.params.address, paymentCred, request.params.ticker],
            )
          : await clientDbSync.query<QueryTypes.NutlinkAddressTicker>(
              SQLQuery.get('nutlink_address_tickers_ticker'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.address,
                paymentCred,
                request.params.ticker,
              ],
            );

        clientDbSync.release();

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
