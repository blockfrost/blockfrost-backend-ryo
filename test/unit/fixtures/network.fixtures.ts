const query_network = [
  {
    supply: {
      max: '45000000000000000',
      circulating: '30212405494649956',
      total: '38412455491629251',
      locked: '123124342341',
      treasury: '3242343242342',
      reserves: '123235049089',
    },
    stake: { live: '23204521899908362', active: '23210733595257321' },
  },
];

const response_network = {
  supply: {
    max: '45000000000000000',
    circulating: '30212405494649956',
    total: '38412455491629251',
    locked: '123124342341',
    treasury: '3242343242342',
    reserves: '123235049089',
  },
  stake: { live: '23204521899908362', active: '23210733595257321' },
};

const response_500 = {
  error: 'Internal Server Error',
  message: 'An unexpected response was received from the backend.',
  status_code: 500,
};

export default [
  {
    name: 'respond with success and data on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: query_network,
    },
    network: 'mainnet',
    response: response_network,
  },
  {
    name: 'TESTNET: respond with success and data on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: query_network,
    },
    network: 'testnet',
    response: response_network,
  },

  /*
      500s
  */

  {
    name: 'respond with 500 and null on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
] as const;
