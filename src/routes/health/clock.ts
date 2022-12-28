import { FastifyInstance } from 'fastify';
import * as ResponseTypes from '../../types/responses/health';
import { getSchemaForEndpoint } from '@blockfrost/openapi';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/health/clock',
    method: 'GET',
    schema: getSchemaForEndpoint('/health/clock'),
    handler: async (_request, reply) => {
      const response: ResponseTypes.HealthClock = { server_time: Date.now() };

      reply.send(response);
    },
  });
}

export default route;
