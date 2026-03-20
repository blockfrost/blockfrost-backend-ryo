import { IDatabase } from 'pg-promise';

declare module 'fastify' {
  export interface FastifyInstance {
    dbSync: IDatabase<object>;
  }

  export interface FastifyRequest {
    slowTimer: ReturnType<typeof setTimeout> | undefined;
  }
}
