import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../../types/queries/nutlink.js';
import * as ResponseTypes from '../../../types/responses/nutlink.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../../utils/database.js';
import axios from 'axios';
import * as Sentry from '@sentry/node';
import { handle404, handleInvalidAddress } from '../../../utils/error-handler.js';
import {
  getAddressTypeAndPaymentCred,
  paymentCredToBech32Address,
} from '../../../utils/validation.js';
import { SQLQuery } from '../../../sql/index.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/nutlink/:address',
    method: 'GET',
    schema: getSchemaForEndpoint('/nutlink/{address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const { addressType, paymentCred, paymentCredPrefix } = getAddressTypeAndPaymentCred(
        request.params.address,
      );

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

        const { rows }: { rows: ResponseTypes.NutlinkAddress[] } =
          await clientDbSync.query<QueryTypes.NutlinkAddress>(SQLQuery.get('nutlink_address'), [
            request.params.address,
            paymentCred,
          ]);

        clientDbSync.release();

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address, paymentCredPrefix);

          if (bech32paymentCred) rows[0].address = bech32paymentCred;
        }

        //rows[0].metadata = null;
        //metadata is already set to null by SQL, so we don't have to do it here

        try {
          let url = null;

          if (rows[0].metadata_url) {
            url = rows[0].metadata_url;
            // max 100 kB reply
            const reply = await axios.get(url, {
              timeout: 5000,
              maxContentLength: 100_000,
            });

            if (reply?.data && typeof reply.data === 'object') {
              rows[0].metadata = reply.data;
            }
          }
        } catch (error) {
          Sentry.captureException(error);
          console.error(error);
        }

        return reply.send(rows[0]);
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
