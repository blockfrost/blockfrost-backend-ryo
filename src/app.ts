import fastifyCors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import * as Sentry from '@sentry/node';
import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import os from 'os';
import { getConfig } from './config';
import { registerRoute } from './utils/common';
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

  // handle cbor media type
  app.addContentTypeParser(['application/cbor'], (_request: FastifyRequest, payload, done) => {
    done(null, payload);
  });

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

  registerRoute(app, import('./routes/accounts'));
  registerRoute(app, import('./routes/addresses'));
  registerRoute(app, import('./routes/assets'));
  registerRoute(app, import('./routes/blocks'));
  registerRoute(app, import('./routes/epochs'));
  registerRoute(app, import('./routes/health'));
  registerRoute(app, import('./routes/ledger'));
  registerRoute(app, import('./routes/metadata'));
  registerRoute(app, import('./routes/network'));
  registerRoute(app, import('./routes/nutlink'));
  registerRoute(app, import('./routes/pools'));
  registerRoute(app, import('./routes/root'));
  registerRoute(app, import('./routes/scripts'));
  registerRoute(app, import('./routes/txs'));
  registerRoute(app, import('./routes/utils'));

  process.on('SIGINT', () => {
    app.close();

    console.info('Server stopped');
    process.exit(0);
  });

  return app;
};

start();

export default start;
