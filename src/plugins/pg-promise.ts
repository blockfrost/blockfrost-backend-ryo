import fp from 'fastify-plugin';
import pgPromise from 'pg-promise';
import { FastifyInstance } from 'fastify';
import { getConfig } from '../config.js';

const pgp = pgPromise();

export default fp(async (fastify: FastifyInstance) => {
  const config = getConfig();

  const db = pgp({
    host: config.dbSync.host,
    port: config.dbSync.port,
    user: config.dbSync.user,
    database: config.dbSync.database,
    password: config.dbSync.password,
    max: config.dbSync.maxConnections,
    ssl: config.dbSync.ssl,
    application_name: config.dbSync.applicationName,
    statement_timeout: config.dbSync.statementTimeout,
    connectionTimeoutMillis: config.dbSync.connectionTimeoutMs,
    ...(config.dbSync.idleSessionTimeoutMs !== undefined && {
      options: `-c idle_session_timeout=${config.dbSync.idleSessionTimeoutMs}`,
    }),
  });

  fastify.decorate('dbSync', db);

  fastify.addHook('onClose', async () => {
    await db.$pool.end();
  });
});
