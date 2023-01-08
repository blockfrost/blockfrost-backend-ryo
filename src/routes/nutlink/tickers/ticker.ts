import { FastifyInstance, FastifyRequest } from 'fastify';
import { isUnpaged } from '../../../utils/routes';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { SQLQuery } from '../../../sql';
import * as QueryTypes from '../../../types/queries/nutlink';
import * as ResponseTypes from '../../../types/responses/nutlink';
import { getDbSync } from '../../../utils/database';
import { handle404 } from '../../../utils/error-handler';

async function route(fastify: FastifyInstance) {
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

        const { rows }: { rows: ResponseTypes.NutlinkTickersTicker } = isUnpaged(request)
          ? await clientDbSync.query<QueryTypes.NutlinkTickersTicker>(
              SQLQuery.get('nutlink_tickers_ticker_unpaged'),
              [request.query.order, request.params.ticker],
            )
          : await clientDbSync.query<QueryTypes.NutlinkTickersTicker>(
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

export default route;
