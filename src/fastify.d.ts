import { PostgresDb } from 'fastify-postgres';

declare module 'fastify' {
  export interface FastifyInstance {
    pg: PostgresDb;
  }
}
