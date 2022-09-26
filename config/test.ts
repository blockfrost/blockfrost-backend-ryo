export default {
  server: {
    listenAddress: 'localhost',
    port: 3000,
    debug: true,
  },
  dbSync: {
    host: 'http://127.0.0.1',
    user: 'you can type anything here, postgres is mocked',
    database: 'you can type anything here, postgres is mocked',
    maxConnections: 0,
  },
  network: 'mainnet',
  tokenRegistryUrl: 'https://tokens.cardano.org',
};
