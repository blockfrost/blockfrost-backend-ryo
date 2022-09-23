import AutoLoad from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import * as Sentry from '@sentry/node';
import fastify, { FastifyInstance } from 'fastify';
import os from 'os';
import path from 'path';

import { getConfig } from './config';
import { errorHandler, notFoundHandler } from './utils/error-handler';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const config = getConfig();
const start = (options = {}): FastifyInstance => {
  const app = fastify(options);

  if (process.env.SENTRY_DSN) {
    console.info('Sentry is ON');

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: 'production',
      release: `blockfrost-backend@${packageJson.version}`,
      serverName: os.hostname(),
      sampleRate: 0.01,
    });
  }

  // ORDERING BASED ON https://www.fastify.io/docs/latest/Guides/Getting-Started/#loading-order-of-your-plugins
  // Note: We don't use custom decorators and hooks (parts 3-4 from ^)

  app.register(fastifyCors, {
    origin: '*',
  });

  app.setErrorHandler((error, request, reply) => {
    errorHandler(error, request, reply);
  });

  app.setNotFoundHandler((request, reply) => {
    notFoundHandler(request, reply);
  });

  app.register(fastifyPostgres, {
    name: 'dbSync',
    host: config.dbSync.host,
    user: config.dbSync.user,
    database: config.dbSync.database,
    max: config.dbSync.maxConnections,
  });

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes/'),
    dirNameRoutePrefix: false,
  });

  process.on('SIGINT', () => {
    app.close();

    console.info('Server stopped');
    process.exit(0);
  });

  return app;
};

start();

export default start;
