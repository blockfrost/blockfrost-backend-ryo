import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance } from 'fastify';
import { createRequire } from 'module';
const esmRequire = createRequire(import.meta.url);
const packageJson = esmRequire('../../../package.json');

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
