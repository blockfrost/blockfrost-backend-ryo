import config from 'config';
import { ByronEraParameters, CARDANO_NETWORKS, Network } from './types/common.js';
import { readFileSync } from 'node:fs';
import * as ResponseTypes from './types/responses/ledger.js';

const MITHRIL_ENDPOINT_ALLOWLIST_DEFAULT = [
  '', // root endpoint, same as "/", but some env are trimming trailing slash so request to /mithril/ could be received as /mithril
  '/',
  '/epoch-settings',
  '/certificate-pending',
  '/certificates',
  '/certificate/:certificate_hash',
  '/artifact/snapshots',
  '/artifact/snapshot/:digest',
  '/artifact/snapshot/:digest/download',
  '/artifact/mithril-stake-distributions',
  '/artifact/cardano-transactions',
  '/artifact/cardano-transaction/:hash',
  '/proof/cardano-transaction',
  '/signers/registered/:epoch',
  '/signers/tickers',
];

export const loadConfig = () => {
  // server
  const listenAddress =
    process.env.BLOCKFROST_CONFIG_SERVER_LISTEN_ADDRESS ??
    config.get<string>('server.listenAddress');
  const port = process.env.BLOCKFROST_CONFIG_SERVER_PORT
    ? Number(process.env.BLOCKFROST_CONFIG_SERVER_PORT)
    : config.get<number>('server.port');
  const debug = process.env.BLOCKFROST_CONFIG_SERVER_DEBUG
    ? process.env.BLOCKFROST_CONFIG_SERVER_DEBUG === 'true'
    : config.get<boolean>('server.debug');
  const prometheusMetrics =
    process.env.BLOCKFROST_CONFIG_SERVER_PROMETHEUS_METRICS ||
    !config.has('server.prometheusMetrics')
      ? process.env.BLOCKFROST_CONFIG_SERVER_PROMETHEUS_METRICS === 'true'
      : config.get<boolean>('server.prometheusMetrics');

  const features = config.has('server.features') ? config.get<string[]>('server.features') : [];

  // dbSync
  const databaseSyncHost =
    process.env.BLOCKFROST_CONFIG_DBSYNC_HOST ?? config.get<string>('dbSync.host');
  const databaseSyncUser =
    process.env.BLOCKFROST_CONFIG_DBSYNC_USER ?? config.get<string>('dbSync.user');
  const databaseSyncPort = process.env.BLOCKFROST_CONFIG_DBSYNC_PORT
    ? Number(process.env.BLOCKFROST_CONFIG_DBSYNC_PORT)
    : config.get<number>('dbSync.port');
  const databaseSyncDatabase =
    process.env.BLOCKFROST_CONFIG_DBSYNC_DATABASE ?? config.get<string>('dbSync.database');
  const databaseSyncPassword =
    process.env.BLOCKFROST_CONFIG_DBSYNC_PASSWORD ??
    (config.has('dbSync.password') ? config.get('dbSync.password') : undefined);
  const databaseSyncMaxConnections = process.env.BLOCKFROST_CONFIG_DBSYNC_MAX_CONN
    ? Number(process.env.BLOCKFROST_CONFIG_DBSYNC_MAX_CONN)
    : config.get<number>('dbSync.maxConnections');
  const ssl = config.has('dbSync.ssl') ? { rejectUnauthorized: false } : false;

  // blockfrost network
  const network = process.env.BLOCKFROST_CONFIG_NETWORK ?? config.get('network');

  if (!network || !CARDANO_NETWORKS.includes(network)) {
    throw new Error(`Invalid network configuration: ${network}`);
  }
  // token registry
  const tokenRegistryEnabled = Boolean(
    process.env.BLOCKFROST_CONFIG_TOKEN_REGISTRY_ENABLED ?? config.has('tokenRegistryEnabled')
      ? config.get<boolean>('tokenRegistryEnabled')
      : true,
  );

  const tokenRegistryUrl =
    process.env.BLOCKFROST_CONFIG_TOKEN_REGISTRY_URL ?? config.get('tokenRegistryUrl');

  // Mithril
  let mithrilEnabled = config.has('mithril.enabled')
    ? config.get<boolean>('mithril.enabled')
    : false;

  let mithrilAggregator =
    process.env.BLOCKFROST_MITHRIL_AGGREGATOR ?? config.has('mithril.aggregator')
      ? config.get<string>('mithril.aggregator')
      : undefined;

  const mithrilSnapshotCDN =
    process.env.BLOCKFROST_MITHRIL_SNAPSHOT_CDN ?? config.has('mithril.snapshotCDN')
      ? config.get<string>('mithril.snapshotCDN')
      : undefined;

  const mithrilAllowedEndpoints = config.has('mithril.mithrilAllowedEndpoints')
    ? config.get<string[]>('mithril.mithrilAllowedEndpoints')
    : MITHRIL_ENDPOINT_ALLOWLIST_DEFAULT;

  // ENV vars override config
  if (process.env.BLOCKFROST_MITHRIL_ENABLED) {
    mithrilEnabled = process.env.BLOCKFROST_MITHRIL_ENABLED === 'true';
  }

  if (process.env.BLOCKFROST_MITHRIL_AGGREGATOR) {
    mithrilAggregator = process.env.BLOCKFROST_MITHRIL_AGGREGATOR;
  }

  if (mithrilEnabled && !mithrilAggregator) {
    throw new Error('Invalid Mithril Aggregator configuration');
  }

  // genesis
  const genesisDataFolder =
    process.env.BLOCKFROST_CONFIG_GENESIS_DATA_FOLDER ?? config.has('genesisDataFolder')
      ? config.get<string>('genesisDataFolder')
      : `./genesis/${network}`;

  const genesis = JSON.parse(
    readFileSync(genesisDataFolder + '/genesis.json', 'utf8'),
  ) as ResponseTypes.Ledger;
  const byronGenesis = JSON.parse(
    readFileSync(genesisDataFolder + '/byron_genesis.json', 'utf8'),
  ) as ByronEraParameters;

  return {
    server: {
      listenAddress,
      port,
      debug,
      prometheusMetrics,
      features,
    },
    dbSync: {
      host: databaseSyncHost,
      port: databaseSyncPort,
      user: databaseSyncUser,
      password: databaseSyncPassword,
      database: databaseSyncDatabase,
      maxConnections: databaseSyncMaxConnections,
      ssl,
    },
    network: network as Network,
    genesis,
    byronGenesis,
    tokenRegistryUrl,
    tokenRegistryEnabled,
    mithril: {
      enabled: mithrilEnabled,
      aggregator: mithrilAggregator as string,
      snapshotCDN: mithrilSnapshotCDN,
      allowedEndpoints: mithrilAllowedEndpoints,
    },
  };
};

export const mainConfig = loadConfig();

// Use this function to load config to allow easier mocking in unit tests
export const getConfig = () => {
  return mainConfig;
};
