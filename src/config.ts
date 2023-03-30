import config from 'config';

import { CARDANO_NETWORKS, Network } from './types/common.js';

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

  // dbSync
  const databaseSyncHost =
    process.env.BLOCKFROST_CONFIG_DBSYNC_HOST ?? config.get<string>('dbSync.host');
  const databaseSyncUser =
    process.env.BLOCKFROST_CONFIG_DBSYNC_USER ?? config.get<string>('dbSync.user');
  const databaseSyncPort =
    Number(process.env.BLOCKFROST_CONFIG_DBSYNC_PORT) ?? config.get<number>('dbSync.port');
  const databaseSyncDatabase =
    process.env.BLOCKFROST_CONFIG_DBSYNC_DATABASE ?? config.get<string>('dbSync.database');
  const databaseSyncMaxConnections = process.env.BLOCKFROST_CONFIG_DBSYNC_MAX_CONN
    ? Number(process.env.BLOCKFROST_CONFIG_DBSYNC_MAX_CONN)
    : config.get<number>('dbSync.maxConnections');

  // blockfrost network
  const network = process.env.BLOCKFROST_CONFIG_NETWORK ?? config.get('network');

  if (!network || !CARDANO_NETWORKS.includes(network)) {
    throw new Error('Invalid network in the config.');
  }

  // token registry
  const tokenRegistryUrl =
    process.env.BLOCKFROST_CONFIG_TOKEN_REGISTRY_URL ?? config.get('tokenRegistryUrl');

  // custom network config
  let genesisByronPath: string | null = null;
  let genesisShelleyPath: string | null = null;

  if (network === 'custom') {
    genesisByronPath = config.get<string>('customConfigFiles.genesisByron');
    genesisShelleyPath = config.get<string>('customConfigFiles.genesisShelley');

    if (!genesisByronPath || !genesisShelleyPath) {
      throw new Error('Invalid custom network paths in the config.');
    }
  }

  return {
    server: {
      listenAddress,
      port,
      debug,
      prometheusMetrics,
    },
    dbSync: {
      host: databaseSyncHost,
      port: databaseSyncPort,
      user: databaseSyncUser,
      database: databaseSyncDatabase,
      maxConnections: databaseSyncMaxConnections,
    },
    network: network as Network,
    tokenRegistryUrl,
    customNetworkConfig: {
      genesisByronPath,
      genesisShelleyPath,
    },
  };
};

export const mainConfig = loadConfig();

export const getConfig = () => {
  return mainConfig;
};
