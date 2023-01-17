const query_found = [{ result: 1 }];

const query_pools_regular_1 = [
  { pool_id: 'pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt' },
  { pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy' },
  { pool_id: 'pool1c8k78ny3xvsfgenhf4yzvpzwgzxmz0t0um0h2xnn2q83vjdr5dj' },
];

const response_pools_regular_1 = [
  'pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt',
  'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  'pool1c8k78ny3xvsfgenhf4yzvpzwgzxmz0t0um0h2xnn2q83vjdr5dj',
];

const query_pools_extended_reuglar_1 = [
  {
    pool_id: 'pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt',
    hex: '153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf',
    active_stake: '2840673313315',
    live_stake: '33526382986895',
  },
  {
    pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    hex: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
    active_stake: '126037095068',
    live_stake: '19365047190621',
  },
  {
    pool_id: 'pool1c8k78ny3xvsfgenhf4yzvpzwgzxmz0t0um0h2xnn2q83vjdr5dj',
    hex: 'c1ede3cc9133209466774d4826044e408db13d6fe6df751a73500f16',
    active_stake: '548098896460',
    live_stake: '557888527873',
  },
];

const response_pools_extended_regular_1 = [
  {
    pool_id: 'pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt',
    hex: '153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf',
    active_stake: '2840673313315',
    live_stake: '33526382986895',
  },
  {
    pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    hex: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
    active_stake: '126037095068',
    live_stake: '19365047190621',
  },
  {
    pool_id: 'pool1c8k78ny3xvsfgenhf4yzvpzwgzxmz0t0um0h2xnn2q83vjdr5dj',
    hex: 'c1ede3cc9133209466774d4826044e408db13d6fe6df751a73500f16',
    active_stake: '548098896460',
    live_stake: '557888527873',
  },
];

const query_pools_retired_regular_1 = [
  { pool_id: 'pool13gdtqme63jprkug3j4wzslhmu0yk4kdx323rtxpjuz7rqv3yyes', epoch: 215 },
  { pool_id: 'pool19u64770wqp6s95gkajc8udheske5e6ljmpq33awxk326zjaza0q', epoch: 225 },
  { pool_id: 'pool1qqq6qzgsa8n2uvy7pusk4fnxnwd8zx7xylycednw3ugmqxk9mps', epoch: 214 },
];

const response_pools_retired_regular_1 = [
  { pool_id: 'pool13gdtqme63jprkug3j4wzslhmu0yk4kdx323rtxpjuz7rqv3yyes', epoch: 215 },
  { pool_id: 'pool19u64770wqp6s95gkajc8udheske5e6ljmpq33awxk326zjaza0q', epoch: 225 },
  { pool_id: 'pool1qqq6qzgsa8n2uvy7pusk4fnxnwd8zx7xylycednw3ugmqxk9mps', epoch: 214 },
];

const query_pools_retiring_regular_1 = [
  { pool_id: 'pool13q0r47yq43jljm9lnwza8uz57u420wuuwllrvkalxm6vwn2dq5n', epoch: 244 },
  { pool_id: 'pool19wpsykyg3gy7s34kx36vvs4dfcv2anggmta372jdv5lgqx0gs2t', epoch: 244 },
  { pool_id: 'pool1shs9tax8wuujh4p63kxyp2kkk0n8k8erlt6vyngj7nzlgnqykrn', epoch: 244 },
];

const response_pools_retiring_regular_1 = [
  { pool_id: 'pool13q0r47yq43jljm9lnwza8uz57u420wuuwllrvkalxm6vwn2dq5n', epoch: 244 },
  { pool_id: 'pool19wpsykyg3gy7s34kx36vvs4dfcv2anggmta372jdv5lgqx0gs2t', epoch: 244 },
  { pool_id: 'pool1shs9tax8wuujh4p63kxyp2kkk0n8k8erlt6vyngj7nzlgnqykrn', epoch: 244 },
];

const query_pools_pool_id_regular_1 = [
  {
    pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    hex: '26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed',
    vrf_key: 'b512cc7c1a8ba689c2d8fd27adfdbac2049a3f8f95c8b85e8298f14d7d8dc4e6',
    blocks_minted: 944,
    blocks_epoch: 44,
    live_stake: '21754657113311',
    live_size: 0.0009749809206911731,
    live_saturation: 0.3409435249002678,
    live_delegators: 158,
    active_stake: '25064781510508',
    active_size: 0,
    declared_pledge: '510000000000',
    live_pledge: '706677630957',
    margin_cost: 0.049,
    fixed_cost: '340000000',
    reward_account: 'stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v',
    owners: ['stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v'],
    registration: ['a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e'],
    retirement: [],
  },
];

const response_pools_pool_id_regular_1 = {
  pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  hex: '26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed',
  vrf_key: 'b512cc7c1a8ba689c2d8fd27adfdbac2049a3f8f95c8b85e8298f14d7d8dc4e6',
  blocks_minted: 944,
  blocks_epoch: 44,
  live_stake: '21754657113311',
  live_size: 0.0009749809206911731,
  live_saturation: 0.3409435249002678,
  live_delegators: 158,
  active_stake: '25064781510508',
  active_size: 0,
  declared_pledge: '510000000000',
  live_pledge: '706677630957',
  margin_cost: 0.049,
  fixed_cost: '340000000',
  reward_account: 'stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v',
  owners: ['stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v'],
  registration: ['a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e'],
  retirement: [],
};

const query_pools_pool_id_history_regular_1 = [
  {
    epoch: 210,
    blocks: 0,
    active_stake: '74426485176810',
    active_size: 0.012285906084693694,
    delegators_count: 48,
    rewards: '0',
    fees: '0',
  },
  {
    epoch: 211,
    blocks: 22,
    active_stake: '75284250207839',
    active_size: 0.00739689929368625,
    delegators_count: 51,
    rewards: '58129719596',
    fees: '3171696260',
  },
  {
    epoch: 212,
    blocks: 28,
    active_stake: '76778927458702',
    active_size: 0.006341905183119658,
    delegators_count: 62,
    rewards: '59186197799',
    fees: '3223463692',
  },
];

const response_pools_pool_id_history_regular_1 = [
  {
    epoch: 210,
    blocks: 0,
    active_stake: '74426485176810',
    active_size: 0.012285906084693694,
    delegators_count: 48,
    rewards: '0',
    fees: '0',
  },
  {
    epoch: 211,
    blocks: 22,
    active_stake: '75284250207839',
    active_size: 0.00739689929368625,
    delegators_count: 51,
    rewards: '58129719596',
    fees: '3171696260',
  },
  {
    epoch: 212,
    blocks: 28,
    active_stake: '76778927458702',
    active_size: 0.006341905183119658,
    delegators_count: 62,
    rewards: '59186197799',
    fees: '3223463692',
  },
];

const query_pools_pool_id_metadata_regular = [
  {
    pool_id: 'pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc',
    hex: '26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed',
    url: 'https://stakenuts.com/testnet.json',
    hash: '514e56dacc4f556ebc1d307473d0cf15d4cf0dc27169870e46a811625f09262e',
    ticker: 'NUTS',
    metadata_text: {
      name: 'StakeNuts',
      ticker: 'NUTS',
      homepage: 'https://stakenuts.com/',
      description: 'StakeNuts.com',
    },
  },
];

const response_pools_pool_id_metadata_regular = {
  pool_id: 'pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc',
  hex: '26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed',
  url: 'https://stakenuts.com/testnet.json',
  hash: '514e56dacc4f556ebc1d307473d0cf15d4cf0dc27169870e46a811625f09262e',
  ticker: 'NUTS',
  name: 'StakeNuts',
  description: 'StakeNuts.com',
  homepage: 'https://stakenuts.com/',
};

const response_pools_pool_id_metadata_empty = {};

const query_pools_pool_id_relays_regular_1 = [
  { ipv4: null, ipv6: null, dns: 'relays.mainnet.stakenuts.com', dns_srv: null, port: 3001 },
];

const response_pools_pool_id_relays_regular_1 = [
  { ipv4: null, ipv6: null, dns: 'relays.mainnet.stakenuts.com', dns_srv: null, port: 3001 },
];

const query_pools_pool_id_delegators_regular_1 = [
  {
    address: 'stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v',
    live_stake: '900650646071',
  },
  {
    address: 'stake1uydsrwxmy82mj2t8ld0w74sm0cqrhk6syngs96hv80umdvg6szppp',
    live_stake: '11481512828',
  },
  { address: 'stake1u9nqz4978j8tlp5mzhelfulk0dtfu5t0vpv8jlqtqskjk5sfw3urs', live_stake: '5242943' },
];
const response_pools_pool_id_delegators_regular_1 = [
  {
    address: 'stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v',
    live_stake: '900650646071',
  },
  {
    address: 'stake1uydsrwxmy82mj2t8ld0w74sm0cqrhk6syngs96hv80umdvg6szppp',
    live_stake: '11481512828',
  },
  { address: 'stake1u9nqz4978j8tlp5mzhelfulk0dtfu5t0vpv8jlqtqskjk5sfw3urs', live_stake: '5242943' },
];

const query_pools_pool_id_blocks_regular_1 = [
  { block: 'da5e26446948b8d1f91396218dcd0131a5e7b3adb200cbd8f124d738438ed5ec' },
  { block: '1038b2c76a23ea7d89cbd84d7744c97560eb3412661beed6959d748e24ff8229' },
  { block: 'e4198b0e351c48aa52e6ac3fdff46887f7061866e75f89dd0310793fbeba2336' },
];

const response_pools_pool_id_blocks_regular_1 = [
  'da5e26446948b8d1f91396218dcd0131a5e7b3adb200cbd8f124d738438ed5ec',
  '1038b2c76a23ea7d89cbd84d7744c97560eb3412661beed6959d748e24ff8229',
  'e4198b0e351c48aa52e6ac3fdff46887f7061866e75f89dd0310793fbeba2336',
];

const query_pools_pool_id_updates_regular_1 = [
  {
    tx_hash: 'a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e',
    cert_index: 0,
    action: 'registered',
  },
];

const response_pools_pool_id_updates_regular_1 = [
  {
    tx_hash: 'a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e',
    cert_index: 0,
    action: 'registered',
  },
];

const query_pools_pool_id_updates_deregistered_1 = [
  {
    tx_hash: '51d67e194d749df2abf4e2e11cea63ca6e1c630042a366f555939e795a6ddecf',
    cert_index: 0,
    action: 'registered',
  },
  {
    tx_hash: '29af26b852aad221e1be0d369c322bda8b5103a13de4802bf6937c1d34dce5a0',
    cert_index: 0,
    action: 'registered',
  },
  {
    tx_hash: 'eec540370b46654357d30811dd1461de9e2838851f72da41585d31d228054ac1',
    cert_index: 0,
    action: 'registered',
  },
];

const response_pools_pool_id_updates_deregistered_1 = [
  {
    tx_hash: '51d67e194d749df2abf4e2e11cea63ca6e1c630042a366f555939e795a6ddecf',
    cert_index: 0,
    action: 'registered',
  },
  {
    tx_hash: '29af26b852aad221e1be0d369c322bda8b5103a13de4802bf6937c1d34dce5a0',
    cert_index: 0,
    action: 'registered',
  },
  {
    tx_hash: 'eec540370b46654357d30811dd1461de9e2838851f72da41585d31d228054ac1',
    cert_index: 0,
    action: 'registered',
  },
];

const response_400 = {
  error: 'Bad Request',
  message: 'Invalid or malformed pool id format.',
  status_code: 400,
};

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
    name: 'respond with success and data on /pools',
    endpoint: '/pools',
    sqlQueryMock: {
      rows: query_pools_regular_1,
    },
    response: response_pools_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools',
    endpoint: '/pools',
    sqlQueryMock: {
      rows: query_pools_regular_1,
    },
    unpaged: true,
    response: response_pools_regular_1,
  },
  {
    name: 'respond with success and data on /pools/extended',
    endpoint: '/pools/extended',
    sqlQueryMock: {
      rows: query_pools_extended_reuglar_1,
    },
    response: response_pools_extended_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/extended',
    endpoint: '/pools/extended',
    sqlQueryMock: {
      rows: query_pools_extended_reuglar_1,
    },
    unpaged: true,
    response: response_pools_extended_regular_1,
  },
  {
    name: 'respond with success and data on /pools/retired',
    endpoint: '/pools/retired',
    sqlQueryMock: {
      rows: query_pools_retired_regular_1,
    },
    response: response_pools_retired_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/retired',
    endpoint: '/pools/retired',
    sqlQueryMock: {
      rows: query_pools_retired_regular_1,
    },
    unpaged: true,
    response: response_pools_retired_regular_1,
  },
  {
    name: 'respond with success and data on /pools/retiring',
    endpoint: '/pools/retiring',
    sqlQueryMock: {
      rows: query_pools_retiring_regular_1,
    },
    response: response_pools_retiring_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/retiring',
    endpoint: '/pools/retiring',
    sqlQueryMock: {
      rows: query_pools_retiring_regular_1,
    },
    unpaged: true,
    response: response_pools_retiring_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    sqlQueryMock: {
      rows: query_pools_pool_id_regular_1,
    },
    response: response_pools_pool_id_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
    sqlQueryMock: {
      rows: query_pools_pool_id_regular_1,
    },
    response: response_pools_pool_id_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/history',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_history_regular_1,
    },
    response: response_pools_pool_id_history_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/:pool_id/history',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_history_regular_1,
    },
    unpaged: true,
    response: response_pools_pool_id_history_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/history',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_history_regular_1,
    },
    response: response_pools_pool_id_history_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/history',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /pools/:pool_id/metadata',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_metadata_regular,
    },

    response: response_pools_pool_id_metadata_regular,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/metadata',
    endpoint: '/pools/pool18z3vwrdpyxnpg7l7eqknsp25uksl6m2dnk8mr6y60jr9sssea0w/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: {},
  },
  {
    name: 'respond with success and data on /pools/:pool_id/metadata',
    endpoint: '/pools/pool18z3vwrdpyxnpg7l7eqknsp25uksl6m2dnk8mr6y60jr9sssea0w/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: response_pools_pool_id_metadata_empty,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/relays',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/relays',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_relays_regular_1,
    },
    response: response_pools_pool_id_relays_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/relays',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735/relays',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_relays_regular_1,
    },
    response: response_pools_pool_id_relays_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/relays',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/relays',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /pools/:pool_id/delegators',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_delegators_regular_1,
    },
    response: response_pools_pool_id_delegators_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/:pool_id/delegators',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_delegators_regular_1,
    },
    unpaged: true,
    response: response_pools_pool_id_delegators_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/delegators',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735/delegators',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_delegators_regular_1,
    },
    response: response_pools_pool_id_delegators_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/delegators',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /pools/:pool_id/blocks',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/blocks',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_blocks_regular_1,
    },
    response: response_pools_pool_id_blocks_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/:pool_id/blocks',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/blocks',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_blocks_regular_1,
    },
    unpaged: true,
    response: response_pools_pool_id_blocks_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/blocks',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735/blocks',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_blocks_regular_1,
    },
    response: response_pools_pool_id_blocks_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/blocks',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/blocks',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_updates_regular_1,
    },
    response: response_pools_pool_id_updates_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_updates_regular_1,
    },
    unpaged: true,
    response: response_pools_pool_id_updates_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/updates',
    endpoint: '/pools/0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735/updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_updates_regular_1,
    },
    response: response_pools_pool_id_updates_regular_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_pools_pool_id_updates_deregistered_1,
    },
    response: response_pools_pool_id_updates_deregistered_1,
  },
  {
    name: 'respond with success and data on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },

  /*
      400s
  */
  {
    name: 'respond with 400 on /pools/:pool_id',
    endpoint: '/pools/stonks_pool',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/history',
    endpoint: '/pools/stonks_pool/history',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/history',
    endpoint: '/pools/stonks_pool/history',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/metadata',
    endpoint: '/pools/stonks_pool/metadata',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/relays',
    endpoint: '/pools/stonks_pool/relays',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/delegators',
    endpoint: '/pools/stonks_pool/delegators',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/blocks',
    endpoint: '/pools/stonks_pool/blocks',
    response: response_400,
  },
  {
    name: 'respond with 400 on /pools/:pool_id/updates',
    endpoint: '/pools/stonks_pool/updates',
    response: response_400,
  },

  /*
      404s
  */
  {
    name: 'respond with 404 and empty data on /pools',
    endpoint: '/pools',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /pools/extended',
    endpoint: '/pools/extended',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with 404 and empty data on /pools/retired',
    endpoint: '/pools/retired',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with 404 and empty data on /pools/retiring',
    endpoint: '/pools/retiring',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/history',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/metadata',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/metadata',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/relays',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/relays',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/delegators',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/blocks',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/blocks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },

  /*
      500s
  */

  {
    name: 'respond with 500 and null on /pools',
    endpoint: '/pools',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/extended',
    endpoint: '/pools/extended',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/retired',
    endpoint: '/pools/retired',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/retiring',
    endpoint: '/pools/retiring',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/history',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/metadata',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/metadata',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/relays',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/relays',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/delegators',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/blocks',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/blocks',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /pools/:pool_id/updates',
    endpoint: '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/updates',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
];
