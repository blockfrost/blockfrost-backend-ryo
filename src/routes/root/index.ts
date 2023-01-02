import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../../package.json');

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/',
    method: 'GET',
    schema: getSchemaForEndpoint('/'),
    handler: async (_request, reply) =>
      reply.send({
        url: 'https://blockfrost.io/',
        version: `${packageJson.version}`,
      }),
  });
}

export default route;
