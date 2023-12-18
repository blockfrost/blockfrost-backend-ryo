import fastifyCors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import * as Sentry from '@sentry/node';
import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import os from 'os';
import { getConfig } from './config.js';
import { registerRoute } from './utils/common.js';
import { errorHandler, notFoundHandler } from './utils/error-handler.js';
import { createRequire } from 'module';

const esmRequire = createRequire(import.meta.url);
const packageJson = esmRequire('../package.json');

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
    port: config.dbSync.port,
    user: config.dbSync.user,
    database: config.dbSync.database,
    max: config.dbSync.maxConnections,
    password: config.dbSync.password,
    ssl: config.dbSync.ssl,
  });

  // addresses
  registerRoute(app, import('./routes/addresses/address/extended.js'));
  registerRoute(app, import('./routes/addresses/address/index.js'));
  registerRoute(app, import('./routes/addresses/address/total.js'));
  registerRoute(app, import('./routes/addresses/address/transactions.js'));
  registerRoute(app, import('./routes/addresses/address/txs.js'));
  registerRoute(app, import('./routes/addresses/address/utxos/asset.js'));
  registerRoute(app, import('./routes/addresses/address/utxos/index.js'));

  // accounts
  registerRoute(app, import('./routes/accounts/stake-address/index.js'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/assets.js'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/index.js'));
  registerRoute(app, import('./routes/accounts/stake-address/addresses/total.js'));
  registerRoute(app, import('./routes/accounts/stake-address/delegations.js'));
  registerRoute(app, import('./routes/accounts/stake-address/history.js'));
  registerRoute(app, import('./routes/accounts/stake-address/mirs.js'));
  registerRoute(app, import('./routes/accounts/stake-address/registrations.js'));
  registerRoute(app, import('./routes/accounts/stake-address/rewards.js'));
  registerRoute(app, import('./routes/accounts/stake-address/withdrawals.js'));

  // assets
  registerRoute(app, import('./routes/assets/index.js'));
  registerRoute(app, import('./routes/assets/policy/policy-id.js'));
  registerRoute(app, import('./routes/assets/asset/addresses.js'));
  registerRoute(app, import('./routes/assets/asset/history.js'));
  registerRoute(app, import('./routes/assets/asset/index.js'));
  registerRoute(app, import('./routes/assets/asset/transactions.js'));
  registerRoute(app, import('./routes/assets/asset/txs.js'));

  // blocks
  registerRoute(app, import('./routes/blocks/slot/slot-number.js'));
  registerRoute(app, import('./routes/blocks/latest/index.js'));
  registerRoute(app, import('./routes/blocks/latest/txs.js'));
  registerRoute(app, import('./routes/blocks/epoch/epoch-number/slot/slot-number.js'));
  registerRoute(app, import('./routes/blocks/hash-or-number/index.js'));
  registerRoute(app, import('./routes/blocks/hash-or-number/addresses.js'));
  registerRoute(app, import('./routes/blocks/hash-or-number/txs.js'));
  registerRoute(app, import('./routes/blocks/hash-or-number/previous.js'));
  registerRoute(app, import('./routes/blocks/hash-or-number/next.js'));

  // epochs
  registerRoute(app, import('./routes/epochs/latest/index.js'));
  registerRoute(app, import('./routes/epochs/latest/parameters.js'));
  registerRoute(app, import('./routes/epochs/number/index.js'));
  registerRoute(app, import('./routes/epochs/number/next.js'));
  registerRoute(app, import('./routes/epochs/number/previous.js'));
  registerRoute(app, import('./routes/epochs/number/parameters.js'));
  registerRoute(app, import('./routes/epochs/number/blocks/index.js'));
  registerRoute(app, import('./routes/epochs/number/blocks/pool-id.js'));
  registerRoute(app, import('./routes/epochs/number/stakes/index.js'));
  registerRoute(app, import('./routes/epochs/number/stakes/pool-id.js'));

  // health
  registerRoute(app, import('./routes/health/index.js'));
  registerRoute(app, import('./routes/health/clock.js'));

  // ledger
  registerRoute(app, import('./routes/ledger/index.js'));

  // metadata
  registerRoute(app, import('./routes/metadata/txs/labels/label/cbor.js'));
  registerRoute(app, import('./routes/metadata/txs/labels/label/index.js'));
  registerRoute(app, import('./routes/metadata/txs/labels.js'));

  // network
  registerRoute(app, import('./routes/network/index.js'));
  registerRoute(app, import('./routes/network/eras.js'));

  // nutlink
  registerRoute(app, import('./routes/nutlink/address/index.js'));
  registerRoute(app, import('./routes/nutlink/address/tickers/index.js'));
  registerRoute(app, import('./routes/nutlink/address/tickers/ticker.js'));
  registerRoute(app, import('./routes/nutlink/tickers/ticker.js'));

  // pools
  registerRoute(app, import('./routes/pools/index.js'));
  registerRoute(app, import('./routes/pools/extended.js'));
  registerRoute(app, import('./routes/pools/retiring.js'));
  registerRoute(app, import('./routes/pools/retired.js'));
  registerRoute(app, import('./routes/pools/pool-id/index.js'));
  registerRoute(app, import('./routes/pools/pool-id/blocks.js'));
  registerRoute(app, import('./routes/pools/pool-id/delegators.js'));
  registerRoute(app, import('./routes/pools/pool-id/history.js'));
  registerRoute(app, import('./routes/pools/pool-id/metadata.js'));
  registerRoute(app, import('./routes/pools/pool-id/relays.js'));
  registerRoute(app, import('./routes/pools/pool-id/updates.js'));

  // root
  registerRoute(app, import('./routes/root/index.js'));
  registerRoute(app, import('./routes/root/prometheus.js'));

  // scripts
  registerRoute(app, import('./routes/scripts/index.js'));
  registerRoute(app, import('./routes/scripts/script_hash/index.js'));
  registerRoute(app, import('./routes/scripts/script_hash/cbor.js'));
  registerRoute(app, import('./routes/scripts/script_hash/json.js'));
  registerRoute(app, import('./routes/scripts/script_hash/redeemers.js'));
  registerRoute(app, import('./routes/scripts/datum/datum-hash/index.js'));
  registerRoute(app, import('./routes/scripts/datum/datum-hash/cbor.js'));

  // txs
  registerRoute(app, import('./routes/txs/hash/index.js'));
  registerRoute(app, import('./routes/txs/hash/delegations.js'));
  registerRoute(app, import('./routes/txs/hash/mirs.js'));
  registerRoute(app, import('./routes/txs/hash/pool-retires.js'));
  registerRoute(app, import('./routes/txs/hash/pool-updates.js'));
  registerRoute(app, import('./routes/txs/hash/redeemers.js'));
  registerRoute(app, import('./routes/txs/hash/stakes.js'));
  registerRoute(app, import('./routes/txs/hash/utxos.js'));
  registerRoute(app, import('./routes/txs/hash/withdrawals.js'));
  registerRoute(app, import('./routes/txs/hash/metadata/index.js'));
  registerRoute(app, import('./routes/txs/hash/metadata/cbor.js'));
  registerRoute(app, import('./routes/txs/hash/required-signers.js'));

  // utils
  registerRoute(app, import('./routes/utils/addresses/xpub/xpub/role/index.js'));

  process.on('SIGINT', () => {
    app.close();

    console.info('Server stopped');
    process.exit(0);
  });

  return app;
};

start();

export default start;
