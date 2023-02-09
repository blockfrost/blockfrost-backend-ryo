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
];
