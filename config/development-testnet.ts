export default {
  server: {
    listenAddress: 'localhost',
    port: 3000,
    debug: true,
  },
  dbSync: {
    host: 'cdbsync-dev-testnet.mydomain.com',
    user: 'cexplorer',
    database: 'cdbsync',
    maxConnections: 10,
  },
  network: 'testnet',
  tokenRegistryUrl: 'https://metadata.cardano-testnet.iohkdev.io',
};
