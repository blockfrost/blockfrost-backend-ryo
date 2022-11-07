import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/nutlink';
import * as ResponseTypes from '../../types/responses/nutlink';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../utils/database';
import axios from 'axios';
import * as Sentry from '@sentry/node';
import { handle404, handleInvalidAddress } from '../../utils/error-handler';
import { getAddressTypeAndPaymentCred, paymentCredToBech32Address } from '../../utils/validation';
import { SQLQuery } from '../../sql';

async function nutlink(fastify: FastifyInstance) {
  fastify.route({
    url: '/nutlink/:address',
    method: 'GET',
    schema: getSchemaForEndpoint('/nutlink/{address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
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

        const { rows }: { rows: ResponseTypes.NutlinkAddress[] } =
          await clientDbSync.query<QueryTypes.NutlinkAddress>(SQLQuery.get('nutlink_address'), [
            request.params.address,
            paymentCred,
          ]);

        clientDbSync.release();

        // if paymentCred is used we have to convert it back to bech32
        if (paymentCred) {
          const bech32paymentCred = paymentCredToBech32Address(rows[0].address);

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

        const { rows }: { rows: ResponseTypes.NutlinkAddressTickers } =
          await clientDbSync.query<QueryTypes.NutlinkAddressTickers>(
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

        const { rows }: { rows: ResponseTypes.NutlinkAddressTicker } =
          await clientDbSync.query<QueryTypes.NutlinkAddressTicker>(
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

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/nutlink/tickers/:ticker',
    method: 'GET',
    schema: getSchemaForEndpoint('/nutlink/tickers/{ticker}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersTicker>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('nutlink_ticker_404'),
          [request.params.ticker],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.NutlinkTickersTicker } =
          await clientDbSync.query<QueryTypes.NutlinkTickersTicker>(
            SQLQuery.get('nutlink_tickers_ticker'),
            [request.query.order, request.query.count, request.query.page, request.params.ticker],
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

module.exports = nutlink;
