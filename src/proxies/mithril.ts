import fastifyHttpProxy from '@fastify/http-proxy';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getConfig } from '../config.js';
import { handle404, handle500 } from '../utils/error-handler.js';
import { convertStreamToString } from '@blockfrost/blockfrost-utils/lib/fastify.js';
import { matchUrlToEndpoint } from '../utils/string-utils.js';
import { appendLocationToSnapshot } from '../utils/mithril.js';

export const registerMithrilProxy = (app: FastifyInstance) => {
  const config = getConfig();
  const snapshotCDN = config.mithril.snapshotCDN;

  app.register(fastifyHttpProxy, {
    upstream: config.mithril.aggregator,
    prefix: '/mithril',
    proxyPayloads: false,
    http: {
      requestOptions: {
        timeout: 30_000,
      },
    },
    preHandler: async (request, reply) => {
      // Pass the request only if the endpoint is included within Mithril Endpoint Allowlist
      // Otherwise return 400 Bad Request
      const url = request.url.replace('/mithril', '').split('?')[0];
      const allowedEndpoints = config.mithril.allowedEndpoints;
      const match = matchUrlToEndpoint(url, allowedEndpoints);

      if (!match) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'Invalid path. Please check https://docs.blockfrost.io/',
          status_code: 400,
        });
      }
    },
    replyOptions: {
      onResponse: async (request, reply, response) => {
        // On error status code add response body with Blockfrost JSON error
        // On success:
        // If mithrilCDN is set then modify response from /artifact/snapshot/:digest and /artifact/snapshots endpoints
        // Otherwise just pass the unmodified response
        const isErrorResponse = reply.statusCode >= 400;

        if (isErrorResponse) {
          // When replying with a body of a different length it is necessary to remove the content-length header.
          reply.removeHeader('content-length');

          // error response returned from the proxy can originate from:
          // 1) Mithril Aggregator, 2) varnish, 3) nginx, 4) whatever
          // Mithril Aggregator returns only error status codes without body
          if (reply.statusCode === 404) {
            return handle404(reply as FastifyReply);
          } else if (reply.statusCode === 412) {
            return reply.code(412).send({
              error: 'Api Version mismatch',
              message:
                'Api Version mismatch. Please check https://docs.blockfrost.io/#section/Mithril',
              status_code: 412,
            });
          } else {
            const errorBody = await convertStreamToString(response);

            return handle500(reply as FastifyReply, errorBody, request as FastifyRequest);
          }
        }

        // Success response
        const url = request.url.replace('/mithril', '').split('?')[0];

        const isSnapshotEndpoint = matchUrlToEndpoint(url, ['/artifact/snapshot/:digest']);
        const isSnapshotsEndpoint = matchUrlToEndpoint(url, ['/artifact/snapshots']);

        if (snapshotCDN && (isSnapshotEndpoint || isSnapshotsEndpoint)) {
          // Custom snapshot CDN was set
          // Modify response of /artifact/snapshots and /artifact/snapshot/{digest} to append CDN link to list of snapshot locations
          const body = await convertStreamToString(response);
          let alteredJSONBody: unknown;

          try {
            const jsonBody = JSON.parse(body);

            alteredJSONBody = isSnapshotsEndpoint
              ? jsonBody.map((snapshot: unknown) => appendLocationToSnapshot(snapshot, snapshotCDN))
              : appendLocationToSnapshot(jsonBody, snapshotCDN);

            // When replying with a body of a different length it is necessary to remove the content-length header.
            reply.removeHeader('content-length');
          } catch (error) {
            // Error while parsing the data, send original unaltered response
            console.error(`Error while adding custom CDN URL to Mithril snapshot data`, error);
            return reply.send(body);
          }

          return reply.send(alteredJSONBody);
        } else {
          // All other endpoints don't need any modification to the response
          return reply.send(response);
        }
      },
    },
  });
};
