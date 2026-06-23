const query_found = [{ result: 1 }];

const query_scripts = [
  { script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c' },
  { script_hash: '23896b1c545c4a66e515246b7b19b02b39cc5a9fdaef71b0987bb1b1' },
  { script_hash: 'e5e0092f62450112d5a079f840449d901a083a7e1958094b5c3ceb48' },
];

const response_scripts = [
  { script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c' },
  { script_hash: '23896b1c545c4a66e515246b7b19b02b39cc5a9fdaef71b0987bb1b1' },
  { script_hash: 'e5e0092f62450112d5a079f840449d901a083a7e1958094b5c3ceb48' },
];

const query_scripts_script_hash = [
  {
    script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
    type: 'plutusV2',
    serialised_size: 6671,
  },
];

const response_scripts_script_hash = {
  script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
  type: 'plutusV2',
  serialised_size: 6671,
};

const query_scripts_script_hash_redeemers = [
  {
    tx_hash: 'bf7034853984be0495c0fca4212945893bd25649ea04363fab1ac69a1be84d6b',
    tx_index: 0,
    purpose: 'spend',
    datum_hash: 'fake',
    redeemer_data_hash: 'fake2',
    unit_mem: '178200',
    unit_steps: '724980000',
    fee: '7250691',
  },
  {
    tx_hash: '30603e9d409236bb5f64ecde37ad1f1110b0e5aafb4998f18f1b9d4b81ec9025',
    tx_index: 1,
    purpose: 'spend',
    datum_hash: 'fake',
    redeemer_data_hash: 'fake2',
    unit_mem: '117976',
    unit_steps: '476942533',
    fee: '4770016',
  },
];

const response_scripts_script_hash_redeemers = [
  {
    tx_hash: 'bf7034853984be0495c0fca4212945893bd25649ea04363fab1ac69a1be84d6b',
    tx_index: 0,
    purpose: 'spend',
    datum_hash: 'fake',
    redeemer_data_hash: 'fake2',
    unit_mem: '178200',
    unit_steps: '724980000',
    fee: '7250691',
  },
  {
    tx_hash: '30603e9d409236bb5f64ecde37ad1f1110b0e5aafb4998f18f1b9d4b81ec9025',
    tx_index: 1,
    purpose: 'spend',
    datum_hash: 'fake',
    redeemer_data_hash: 'fake2',
    unit_mem: '117976',
    unit_steps: '476942533',
    fee: '4770016',
  },
];

const query_scripts_script_hash_utxos = [
  {
    address: 'addr1wyuelujqprdpruhrgd5cykkg6es2s34sy95xtsyqudnwt5q2nftxc',
    tx_hash: 'ee404e067104e138fc0a0de126084790d3602d77806a63b0f326d1671695711d',
    output_index: 0,
    amount_lovelace: '7551120',
    amount: null,
    block: '0a9dd34749b6eb6213f741fe65b3432a78ab8f9f1a22b0a1cf71e6148b120188',
    data_hash: '923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec',
    inline_datum: 'd87980',
    reference_script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
  },
  {
    address: 'addr1wyuelujqprdpruhrgd5cykkg6es2s34sy95xtsyqudnwt5q2nftxc',
    tx_hash: '6e8f99790179859f804ebb7658f398dac3b8fd7db2d0631885c0afba061e5b14',
    output_index: 0,
    amount_lovelace: '2000000',
    amount: [
      {
        unit: 'b0d07d45fe9514f80213f4020e5a61241458be626841cde717cb38a76e7574636f696e',
        quantity: '12',
      },
    ],
    block: 'ceca14294039b6c7206c565f5d21e6fe7ad0268ea6ebb50edbf4c4d9fdba15fe',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
  },
];

const response_scripts_script_hash_utxos = [
  {
    address: 'addr1wyuelujqprdpruhrgd5cykkg6es2s34sy95xtsyqudnwt5q2nftxc',
    tx_hash: 'ee404e067104e138fc0a0de126084790d3602d77806a63b0f326d1671695711d',
    output_index: 0,
    amount: [{ unit: 'lovelace', quantity: '7551120' }],
    block: '0a9dd34749b6eb6213f741fe65b3432a78ab8f9f1a22b0a1cf71e6148b120188',
    data_hash: '923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec',
    inline_datum: 'd87980',
    reference_script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
  },
  {
    address: 'addr1wyuelujqprdpruhrgd5cykkg6es2s34sy95xtsyqudnwt5q2nftxc',
    tx_hash: '6e8f99790179859f804ebb7658f398dac3b8fd7db2d0631885c0afba061e5b14',
    output_index: 0,
    amount: [
      { unit: 'lovelace', quantity: '2000000' },
      {
        unit: 'b0d07d45fe9514f80213f4020e5a61241458be626841cde717cb38a76e7574636f696e',
        quantity: '12',
      },
    ],
    block: 'ceca14294039b6c7206c565f5d21e6fe7ad0268ea6ebb50edbf4c4d9fdba15fe',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: '73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
  },
];

const response_404 = {
  error: 'Not Found',
  message: 'The requested component has not been found.',
  status_code: 404,
};

const response_500 = {
  error: 'Internal Server Error',
  message: 'An unexpected response was received from the backend.',
  status_code: 500,
};

export default [
  {
    name: 'respond with success and data on /scripts',
    endpoint: '/scripts',
    sqlQueryMock: {
      rows: query_scripts,
    },
    network: 'mainnet',
    response: response_scripts,
  },
  {
    name: 'respond with success and unpaged data on /scripts',
    endpoint: '/scripts',
    sqlQueryMock: {
      rows: query_scripts,
    },
    network: 'mainnet',
    unpaged: true,
    response: response_scripts,
  },
  {
    name: 'respond with success and data on /scripts',
    endpoint: '/scripts',
    sqlQueryMock: {
      rows: [],
    },
    network: 'mainnet',
    response: [],
  },
  {
    name: 'respond with success and data on /scripts/:script_hash',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c',
    sqlQueryMock: {
      rows: query_scripts_script_hash,
    },
    network: 'mainnet',
    response: response_scripts_script_hash,
  },
  {
    name: 'respond with success and data on /scripts/:script_hash/redeemers',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c/redeemers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_scripts_script_hash_redeemers,
    },
    network: 'mainnet',
    response: response_scripts_script_hash_redeemers,
  },
  {
    name: 'respond with success and unpaged data on /scripts/:script_hash/redeemers',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c/redeemers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_scripts_script_hash_redeemers,
    },
    network: 'mainnet',
    unpaged: true,
    response: response_scripts_script_hash_redeemers,
  },
  {
    name: 'respond with success and data on /scripts/:script_hash/redeemers',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c/redeemers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    network: 'mainnet',
    response: [],
  },
  {
    name: 'respond with success and data on /scripts/:script_hash/utxos',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c/utxos',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_scripts_script_hash_utxos,
    },
    network: 'mainnet',
    response: response_scripts_script_hash_utxos,
  },
  {
    name: 'respond with success and empty data on /scripts/:script_hash/utxos',
    endpoint: '/scripts/73e0949d28cca009e5dcb72f47414144b83652d1c14c1e75cd41101c/utxos',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    network: 'mainnet',
    response: [],
  },
  /*
      404s
  */

  {
    name: 'respond with 404 and empty data on /scripts/:script_hash',
    endpoint: '/scripts/stonks_script',
    sqlQueryMock: {
      rows: [],
    },
    network: 'mainnet',
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /scripts/:script_hash/redeemers',
    endpoint: '/scripts/stonks_script/redeemers',
    sqlQueryMock: {
      rows: [],
    },
    network: 'mainnet',
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /scripts/:script_hash/utxos',
    endpoint: '/scripts/stonks_script/utxos',
    sqlQueryMock: {
      rows: [],
    },
    network: 'mainnet',
    response: response_404,
  },

  /*
      500s
  */

  {
    name: 'respond with 500 and null on /scripts',
    endpoint: '/scripts',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /scripts/:script_hash',
    endpoint: '/scripts/stonks_script',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /scripts/:script_hash/redeemers',
    endpoint: '/scripts/stonks_script/redeemers',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /scripts/:script_hash/utxos',
    endpoint: '/scripts/stonks_script/utxos',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
];
