import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../../utils/routes';
import * as QueryTypes from '../../../../types/queries/nutlink';
import * as ResponseTypes from '../../../../types/responses/nutlink';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../../utils/database';

import { handle404, handleInvalidAddress } from '../../../../utils/error-handler';
import { getAddressTypeAndPaymentCred } from '../../../../utils/validation';
import { SQLQuery } from '../../../../sql';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/nutlink/:address/tickers',
    method: 'GET',
    schema: getSchemaForEndpoint('/nutlink/{address}/tickers'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAddressParameters>, reply) => {
      const { addressType, paymentCred } = getAddressTypeAndPaymentCred(request.params.address);

      if (!addressType) {
        return handleInvalidAddress(reply);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('nutlink_address_404'),
          [request.params.address, paymentCred],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.NutlinkAddressTickers } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.NutlinkAddressTickers>(
              SQLQuery.get('nutlink_address_tickers_unpaged'),
              [request.query.order, request.params.address, paymentCred],
            )
          : await clientDbSync.query<QueryTypes.NutlinkAddressTickers>(
              SQLQuery.get('nutlink_address_tickers'),
              [
                request.query.order,
                request.query.count,
                request.query.page,
                request.params.address,
                paymentCred,
              ],
            );

        clientDbSync.release();

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
