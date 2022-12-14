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

  // addresses
  registerRoute(app, import('./routes/addresses/address/extended'));
  registerRoute(app, import('./routes/addresses/address/index'));
  registerRoute(app, import('./routes/addresses/address/total'));
  registerRoute(app, import('./routes/addresses/address/transactions'));
  registerRoute(app, import('./routes/addresses/address/txs'));
  registerRoute(app, import('./routes/addresses/address/utxos/asset'));
  registerRoute(app, import('./routes/addresses/address/utxos/index'));

  // accounts
  registerRoute(app, import('./routes/accounts/stake-address/index'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/assets'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/index'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/total'));
  registerRoute(app, import('./routes/accounts/stake-address/delegations'));
  registerRoute(app, import('./routes/accounts/stake-address/history'));
  registerRoute(app, import('./routes/accounts/stake-address/mirs'));
  registerRoute(app, import('./routes/accounts/stake-address/registrations'));
  registerRoute(app, import('./routes/accounts/stake-address/rewards'));
  registerRoute(app, import('./routes/accounts/stake-address/withdrawals'));

  // assets
  registerRoute(app, import('./routes/assets/index'));
  registerRoute(app, import('./routes/assets/policy/policy-id'));
  registerRoute(app, import('./routes/assets/asset/addresses'));
  registerRoute(app, import('./routes/assets/asset/history'));
  registerRoute(app, import('./routes/assets/asset/index'));
  registerRoute(app, import('./routes/assets/asset/transactions'));
  registerRoute(app, import('./routes/assets/asset/txs'));

  // blocks
  registerRoute(app, import('./routes/blocks/slot/slot-number'));
  registerRoute(app, import('./routes/blocks/latest/index'));
  registerRoute(app, import('./routes/blocks/latest/txs'));
  registerRoute(app, import('./routes/blocks/epoch/epoch-number/slot/slot-number'));
  registerRoute(app, import('./routes/blocks/hash-or-number/index'));
  registerRoute(app, import('./routes/blocks/hash-or-number/addresses'));
  registerRoute(app, import('./routes/blocks/hash-or-number/txs'));
  registerRoute(app, import('./routes/blocks/hash-or-number/previous'));
  registerRoute(app, import('./routes/blocks/hash-or-number/next'));

  // epochs
  registerRoute(app, import('./routes/epochs/latest/index'));
  registerRoute(app, import('./routes/epochs/latest/parameters'));
  registerRoute(app, import('./routes/epochs/number/index'));
  registerRoute(app, import('./routes/epochs/number/next'));
  registerRoute(app, import('./routes/epochs/number/previous'));
  registerRoute(app, import('./routes/epochs/number/parameters'));
  registerRoute(app, import('./routes/epochs/number/blocks/index'));
  registerRoute(app, import('./routes/epochs/number/blocks/pool-id'));
  registerRoute(app, import('./routes/epochs/number/stakes/index'));
  registerRoute(app, import('./routes/epochs/number/stakes/pool-id'));

  // health
  registerRoute(app, import('./routes/health'));
  registerRoute(app, import('./routes/health/clock'));

  // ledger
  registerRoute(app, import('./routes/ledger'));

  // metadata
  registerRoute(app, import('./routes/metadata/txs/labels/label/cbor'));
  registerRoute(app, import('./routes/metadata/txs/labels/label/index'));
  registerRoute(app, import('./routes/metadata/txs/labels'));

  // network
  registerRoute(app, import('./routes/network'));
  registerRoute(app, import('./routes/network/eras'));

  // nutlink
  registerRoute(app, import('./routes/nutlink/address/index'));
  registerRoute(app, import('./routes/nutlink/address/tickers/index'));
  registerRoute(app, import('./routes/nutlink/address/tickers/ticker'));
  registerRoute(app, import('./routes/nutlink/tickers/ticker'));

  // pools
  registerRoute(app, import('./routes/pools/index'));
  registerRoute(app, import('./routes/pools/extended'));
  registerRoute(app, import('./routes/pools/retiring'));
  registerRoute(app, import('./routes/pools/retired'));
  registerRoute(app, import('./routes/pools/pool-id/index'));
  registerRoute(app, import('./routes/pools/pool-id/blocks'));
  registerRoute(app, import('./routes/pools/pool-id/delegators'));
  registerRoute(app, import('./routes/pools/pool-id/history'));
  registerRoute(app, import('./routes/pools/pool-id/metadata'));
  registerRoute(app, import('./routes/pools/pool-id/relays'));
  registerRoute(app, import('./routes/pools/pool-id/updates'));

  // root
  registerRoute(app, import('./routes/root'));

  // scripts
  registerRoute(app, import('./routes/scripts/index'));
  registerRoute(app, import('./routes/scripts/script_hash/index'));
  registerRoute(app, import('./routes/scripts/script_hash/cbor'));
  registerRoute(app, import('./routes/scripts/script_hash/json'));
  registerRoute(app, import('./routes/scripts/script_hash/redeemers'));
  registerRoute(app, import('./routes/scripts/datum/datum-hash/index'));
  registerRoute(app, import('./routes/scripts/datum/datum-hash/cbor'));

  // txs
  registerRoute(app, import('./routes/txs/hash/index'));
  registerRoute(app, import('./routes/txs/hash/delegations'));
  registerRoute(app, import('./routes/txs/hash/mirs'));
  registerRoute(app, import('./routes/txs/hash/pool-retires'));
  registerRoute(app, import('./routes/txs/hash/pool-updates'));
  registerRoute(app, import('./routes/txs/hash/redeemers'));
  registerRoute(app, import('./routes/txs/hash/stakes'));
  registerRoute(app, import('./routes/txs/hash/utxos'));
  registerRoute(app, import('./routes/txs/hash/withdrawals'));
  registerRoute(app, import('./routes/txs/hash/metadata/index'));
  registerRoute(app, import('./routes/txs/hash/metadata/cbor'));

  // utils
  registerRoute(app, import('./routes/utils/addresses/xpub/xpub/role/index'));

  process.on('SIGINT', () => {
    app.close();

    console.info('Server stopped');
    process.exit(0);
  });

  return app;
};

start();

export default start;
