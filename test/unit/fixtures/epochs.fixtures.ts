const epoch_found = [{ result: 1 }];

const query_epoch_regular = {
  epoch: 245,
  start_time: 1612043091,
  end_time: 1612475091,
  first_block_time: 1612043091,
  last_block_time: 1612475007,
  block_count: 21485,
  tx_count: 88703,
  output: '52975770722098664',
  fees: '20044918510',
  active_stake: '22086904770458818',
};

const response_epoch_regular = {
  epoch: 245,
  start_time: 1612043091,
  end_time: 1612475091,
  first_block_time: 1612043091,
  last_block_time: 1612475007,
  block_count: 21485,
  tx_count: 88703,
  output: '52975770722098664',
  fees: '20044918510',
  active_stake: '22086904770458818',
};

const query_epoch_number_regular = {
  epoch: 247,
  start_time: 1612907091,
  end_time: 1613339091,
  first_block_time: 1612907091,
  last_block_time: 1613339043,
  block_count: 21508,
  tx_count: 176490,
  output: '75933109763036430',
  fees: '38567858687',
  active_stake: '22275517879395323',
};

const response_epoch_number_regular = {
  epoch: 247,
  start_time: 1612907091,
  end_time: 1613339091,
  first_block_time: 1612907091,
  last_block_time: 1613339043,
  block_count: 21508,
  tx_count: 176490,
  output: '75933109763036430',
  fees: '38567858687',
  active_stake: '22275517879395323',
};

const query_epoch_number_next_regular = [
  {
    epoch: 224,
    start_time: 1602971091,
    end_time: 1603403091,
    first_block_time: 1602971091,
    last_block_time: 1603403068,
    block_count: 21324,
    tx_count: 17527,
    output: '13228947318478116',
    fees: '4124509016',
    active_stake: '16980957495734679',
  },
  {
    epoch: 225,
    start_time: 1603403091,
    end_time: 1603835091,
    first_block_time: 1603403091,
    last_block_time: 1603835086,
    block_count: 21298,
    tx_count: 17856,
    output: '7849943934049314',
    fees: '4203312194',
    active_stake: '17096070009862836',
  },
  {
    epoch: 226,
    start_time: 1603835091,
    end_time: 1604267091,
    first_block_time: 1603835091,
    last_block_time: 1604267052,
    block_count: 21439,
    tx_count: 19122,
    output: '9868535708539797',
    fees: '4393720890',
    active_stake: '17208683641999022',
  },
];

const response_epoch_number_next_regular = [
  {
    epoch: 224,
    start_time: 1602971091,
    end_time: 1603403091,
    first_block_time: 1602971091,
    last_block_time: 1603403068,
    block_count: 21324,
    tx_count: 17527,
    output: '13228947318478116',
    fees: '4124509016',
    active_stake: '16980957495734679',
  },
  {
    epoch: 225,
    start_time: 1603403091,
    end_time: 1603835091,
    first_block_time: 1603403091,
    last_block_time: 1603835086,
    block_count: 21298,
    tx_count: 17856,
    output: '7849943934049314',
    fees: '4203312194',
    active_stake: '17096070009862836',
  },
  {
    epoch: 226,
    start_time: 1603835091,
    end_time: 1604267091,
    first_block_time: 1603835091,
    last_block_time: 1604267052,
    block_count: 21439,
    tx_count: 19122,
    output: '9868535708539797',
    fees: '4393720890',
    active_stake: '17208683641999022',
  },
];

const query_epoch_number_previous_regular = [
  {
    epoch: 112,
    start_time: 1554587091,
    end_time: 1555019091,
    first_block_time: 1554587091,
    last_block_time: 1555019071,
    block_count: 21598,
    tx_count: 13926,
    output: '77980298859143678',
    fees: '2728498131',
    active_stake: null,
  },
  {
    epoch: 113,
    start_time: 1555019091,
    end_time: 1555451091,
    first_block_time: 1555019091,
    last_block_time: 1555451071,
    block_count: 21601,
    tx_count: 10929,
    output: '16720833408415207',
    fees: '2176364591',
    active_stake: null,
  },
  {
    epoch: 114,
    start_time: 1555451091,
    end_time: 1555883091,
    first_block_time: 1555451091,
    last_block_time: 1555883071,
    block_count: 21601,
    tx_count: 12468,
    output: '11392386930695972',
    fees: '2464271497',
    active_stake: null,
  },
];
const response_epoch_number_previous_regular = [
  {
    epoch: 112,
    start_time: 1554587091,
    end_time: 1555019091,
    first_block_time: 1554587091,
    last_block_time: 1555019071,
    block_count: 21598,
    tx_count: 13926,
    output: '77980298859143678',
    fees: '2728498131',
    active_stake: null,
  },
  {
    epoch: 113,
    start_time: 1555019091,
    end_time: 1555451091,
    first_block_time: 1555019091,
    last_block_time: 1555451071,
    block_count: 21601,
    tx_count: 10929,
    output: '16720833408415207',
    fees: '2176364591',
    active_stake: null,
  },
  {
    epoch: 114,
    start_time: 1555451091,
    end_time: 1555883091,
    first_block_time: 1555451091,
    last_block_time: 1555883071,
    block_count: 21601,
    tx_count: 12468,
    output: '11392386930695972',
    fees: '2464271497',
    active_stake: null,
  },
];

const query_epochs_number_stakes_regular = [
  {
    stake_address: 'stake1uyzzq05tz4hym3dey8c06aydka5hr4t2qn5alyjefdks8cqjtlh23',
    pool_id: 'pool1ft4xjlz9uw0r0ewcgtkgeakqrfc5azxmxwsm5pt94dv67mw4rgd',
    amount: '27250551118',
  },
  {
    stake_address: 'stake1uyzplkyf4c5whd0khr8z49lh7ewgfj5ges86npp8uasyy4qtdtrcq',
    pool_id: 'pool12vs4c3cm0tr49c7alrevfs0xa5g3s4al4fn46h33e69uusat04v',
    amount: '161826091911',
  },
  {
    stake_address: 'stake1uyzpu9dkcy3jen35wvfnkmp9cxal93g2n3rkk6d2lhsnc7ggfs9am',
    pool_id: 'pool1hntu7agmt8u5j9c20ejen7dvq0jfkvkpnul3mrdd8tppqvwfvt2',
    amount: '146272388113',
  },
];

const response_epochs_number_stakes_regular = [
  {
    stake_address: 'stake1uyzzq05tz4hym3dey8c06aydka5hr4t2qn5alyjefdks8cqjtlh23',
    pool_id: 'pool1ft4xjlz9uw0r0ewcgtkgeakqrfc5azxmxwsm5pt94dv67mw4rgd',
    amount: '27250551118',
  },
  {
    stake_address: 'stake1uyzplkyf4c5whd0khr8z49lh7ewgfj5ges86npp8uasyy4qtdtrcq',
    pool_id: 'pool12vs4c3cm0tr49c7alrevfs0xa5g3s4al4fn46h33e69uusat04v',
    amount: '161826091911',
  },
  {
    stake_address: 'stake1uyzpu9dkcy3jen35wvfnkmp9cxal93g2n3rkk6d2lhsnc7ggfs9am',
    pool_id: 'pool1hntu7agmt8u5j9c20ejen7dvq0jfkvkpnul3mrdd8tppqvwfvt2',
    amount: '146272388113',
  },
];

const query_epochs_number_stakes_pool_id_regular = [
  {
    stake_address: 'stake1uy6klvuvnaaj4x2rtewxftmxpavwqr4tsevqahu4ml6tu5gyfre8h',
    amount: '2464094',
  },
  {
    stake_address: 'stake1u992kdg2wyzx0m79zzu8nm7szcqnakvj0eayc0c9c9vdgtgjthnjq',
    amount: '7442496530',
  },
  { stake_address: 'stake1u9u4acav3zc8men9hcg7qg6cx07rhls9gdn05r56gquc58qhx7etu', amount: '0' },
];

const response_epochs_number_stakes_pool_id_regular = [
  {
    stake_address: 'stake1uy6klvuvnaaj4x2rtewxftmxpavwqr4tsevqahu4ml6tu5gyfre8h',
    amount: '2464094',
  },
  {
    stake_address: 'stake1u992kdg2wyzx0m79zzu8nm7szcqnakvj0eayc0c9c9vdgtgjthnjq',
    amount: '7442496530',
  },
  { stake_address: 'stake1u9u4acav3zc8men9hcg7qg6cx07rhls9gdn05r56gquc58qhx7etu', amount: '0' },
];

const query_epochs_number_blocks_regular = [
  { hash: 'b687d2012739687a3543c1ec4b47b899b5519c94299cd6537174467707b979ad' },
  { hash: '2198c40091993baed54b4638473327b0b77c5dccaa56768690f5b5642ee69f14' },
  { hash: 'e38db0464c464fb2d441c34aad4ee89feb75257c4dbf3753addd67fb1879d037' },
  { hash: '9307a00b84f4c27f0caa0e232c06f950a9f0a3abbc42894af124c1d50d07a364' },
  { hash: 'e3ad57cf83f795902b54d2afd2554dd700fa9d88578d438887844af7e8113ff0' },
  { hash: '054636a348a0e6e99bd87c880403e4ab2da4fb3b9e23580ffcc9b44afa8af809' },
  { hash: '30cad3f0f3c80e51fc85c395b1f6540e338daf1bdd3afb6b47f3b8a4ae8ec87f' },
  { hash: '83275e5d94d30ad6faad291a06d5943af986226c54cd418dd122b3f2029f70f7' },
  { hash: 'c6887cbd5a1209a391f5830fffa8ed47c40c8eed46835b17df1d9a41bbd2d3d4' },
  { hash: '891bf904cbddfbf97b90638815a152a998b181f27a98e34f2c2bda164a0b4282' },
];

const response_epochs_number_blocks_regular = [
  'b687d2012739687a3543c1ec4b47b899b5519c94299cd6537174467707b979ad',
  '2198c40091993baed54b4638473327b0b77c5dccaa56768690f5b5642ee69f14',
  'e38db0464c464fb2d441c34aad4ee89feb75257c4dbf3753addd67fb1879d037',
  '9307a00b84f4c27f0caa0e232c06f950a9f0a3abbc42894af124c1d50d07a364',
  'e3ad57cf83f795902b54d2afd2554dd700fa9d88578d438887844af7e8113ff0',
  '054636a348a0e6e99bd87c880403e4ab2da4fb3b9e23580ffcc9b44afa8af809',
  '30cad3f0f3c80e51fc85c395b1f6540e338daf1bdd3afb6b47f3b8a4ae8ec87f',
  '83275e5d94d30ad6faad291a06d5943af986226c54cd418dd122b3f2029f70f7',
  'c6887cbd5a1209a391f5830fffa8ed47c40c8eed46835b17df1d9a41bbd2d3d4',
  '891bf904cbddfbf97b90638815a152a998b181f27a98e34f2c2bda164a0b4282',
];

const query_epochs_number_blocks_pool_id_regular = [
  { hash: 'd3fcd7aabc7538e51cd38dce5a24a559a5f02ff8a5f67bc3a2da965e83666bb5' },
  { hash: 'b6004d3c9cdbe310a2f965ff6ebe0d7815b542f93e45677b015558c7315bcf3c' },
  { hash: 'c467e6b122d2c386c6254e5aa8e24d5e43bd3aa596998f1f6504f61d279168e4' },
  { hash: 'c047b5b352e37f00b0db065f0a508a249c86aff6c8ecb5cd6d3eba82e4ebbe6c' },
  { hash: '426a08deef1fa9348b95344bbabfc50614aa39e91a08fcab9d2e4426888488bf' },
  { hash: 'c030d8be8cec88dd2170a147d7fa7e8425b08c9cb96d2e408c986b21704e3fbe' },
  { hash: '13bd80601c3b390eb9e68beab83c9b46599415914cf1cbd35741e1683dec3f5c' },
  { hash: '13e3c8aa6ae8bc4288e9d581d22b109dc9c3ff7423271e91efe897429852b918' },
  { hash: 'd9cc03505e6a9421362e5b4af68c0fb71cf2e4ebb1dfd43d53f67fd83d36a6f1' },
  { hash: '287bea61b75ace52b07a78d5f770a181f298f11b88a9f9bf8846cac2121ac09e' },
];

const response_epochs_number_blocks_pool_id_regular = [
  'd3fcd7aabc7538e51cd38dce5a24a559a5f02ff8a5f67bc3a2da965e83666bb5',
  'b6004d3c9cdbe310a2f965ff6ebe0d7815b542f93e45677b015558c7315bcf3c',
  'c467e6b122d2c386c6254e5aa8e24d5e43bd3aa596998f1f6504f61d279168e4',
  'c047b5b352e37f00b0db065f0a508a249c86aff6c8ecb5cd6d3eba82e4ebbe6c',
  '426a08deef1fa9348b95344bbabfc50614aa39e91a08fcab9d2e4426888488bf',
  'c030d8be8cec88dd2170a147d7fa7e8425b08c9cb96d2e408c986b21704e3fbe',
  '13bd80601c3b390eb9e68beab83c9b46599415914cf1cbd35741e1683dec3f5c',
  '13e3c8aa6ae8bc4288e9d581d22b109dc9c3ff7423271e91efe897429852b918',
  'd9cc03505e6a9421362e5b4af68c0fb71cf2e4ebb1dfd43d53f67fd83d36a6f1',
  '287bea61b75ace52b07a78d5f770a181f298f11b88a9f9bf8846cac2121ac09e',
];

const query_epoch_number_parameters_regular = {
  epoch: 243,
  min_fee_a: 44,
  min_fee_b: 155381,
  max_block_size: 65536,
  max_tx_size: 16384,
  max_block_header_size: 1100,
  key_deposit: '2000000',
  pool_deposit: '500000000',
  e_max: 18,
  n_opt: 500,
  a0: 0.3,
  rho: 0.003,
  tau: 0.2,
  decentralisation_param: 0.3,
  extra_entropy: null,
  protocol_major_ver: 3,
  protocol_minor_ver: 0,
  min_utxo: '1000000',
  min_pool_cost: '340000000',
  nonce: '701241ce057d391aa92b8d88ffcdff361539cb12ea2a5bba4e5f95d66948ffe3',
  cost_models: {
    PlutusV1: {
      'addInteger-memory-arguments-intercept': 1,
      'addInteger-memory-arguments-slope': 1,
      'addInteger-cpu-arguments-intercept': 205665,
      'addInteger-cpu-arguments-slope': 812,
    },
  },
  price_mem: 0.001,
  price_step: 0.01,
  max_tx_ex_mem: '11000000000',
  max_tx_ex_steps: '11000000000',
  max_block_ex_mem: '11000000000',
  max_block_ex_steps: '11000000000',
  max_val_size: '4020',
  collateral_percent: 150,
  max_collateral_inputs: 5,
  coins_per_utxo_word: '420',
  coins_per_utxo_size: '420',
};

const response_epoch_number_parameters_regular = {
  epoch: 243,
  min_fee_a: 44,
  min_fee_b: 155381,
  max_block_size: 65536,
  max_tx_size: 16384,
  max_block_header_size: 1100,
  key_deposit: '2000000',
  pool_deposit: '500000000',
  e_max: 18,
  n_opt: 500,
  a0: 0.3,
  rho: 0.003,
  tau: 0.2,
  decentralisation_param: 0.3,
  extra_entropy: null,
  protocol_major_ver: 3,
  protocol_minor_ver: 0,
  min_utxo: '1000000',
  min_pool_cost: '340000000',
  nonce: '701241ce057d391aa92b8d88ffcdff361539cb12ea2a5bba4e5f95d66948ffe3',
  cost_models: {
    PlutusV1: {
      'addInteger-cpu-arguments-intercept': 205665,
      'addInteger-cpu-arguments-slope': 812,
      'addInteger-memory-arguments-intercept': 1,
      'addInteger-memory-arguments-slope': 1,
    },
  },
  price_mem: 0.001,
  price_step: 0.01,
  max_tx_ex_mem: '11000000000',
  max_tx_ex_steps: '11000000000',
  max_block_ex_mem: '11000000000',
  max_block_ex_steps: '11000000000',
  max_val_size: '4020',
  collateral_percent: 150,
  max_collateral_inputs: 5,
  coins_per_utxo_word: '420',
  coins_per_utxo_size: '420',
};

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
    name: 'respond with success and data on /epochs/latest',
    endpoint: '/epochs/latest',
    sqlQueryMock: {
      rows: [query_epoch_regular],
    },
    response: response_epoch_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number',
    endpoint: '/epochs/245',
    sqlQueryMock: {
      rows: [query_epoch_number_regular],
    },
    response: response_epoch_number_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/next 1',
    endpoint: '/epochs/222/next',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: query_epoch_number_next_regular,
    },
    response: response_epoch_number_next_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/next 2',
    endpoint: '/epochs/250/next',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epochs/:number/previous 1',
    endpoint: '/epochs/222/previous',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: query_epoch_number_previous_regular,
    },
    response: response_epoch_number_previous_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/previous 2',
    endpoint: '/epochs/0/previous',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes 1',
    endpoint: '/epochs/222/stakes',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: query_epochs_number_stakes_regular,
    },
    response: response_epochs_number_stakes_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes 2',
    endpoint: '/epochs/100/stakes',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes 3',
    endpoint: '/epochs/243/stakes?page=14018&count=4',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: query_epochs_number_stakes_regular,
    },
    response: response_epochs_number_stakes_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes/:pool_id 1',
    endpoint: '/epochs/243/stakes/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: epoch_found,
    },
    sqlQueryMock3: {
      rows: query_epochs_number_stakes_pool_id_regular,
    },
    response: response_epochs_number_stakes_pool_id_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes/:pool_id 2',
    endpoint: '/epochs/100/stakes/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: epoch_found,
    },
    sqlQueryMock3: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epochs/:number/stakes/:pool_id 3',
    endpoint: '/epochs/243/stakes/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: epoch_found,
    },
    sqlQueryMock3: {
      rows: query_epochs_number_stakes_pool_id_regular,
    },
    response: response_epochs_number_stakes_pool_id_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/block 1',
    endpoint: '/epochs/243/blocks',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: query_epochs_number_blocks_regular,
    },
    response: response_epochs_number_blocks_regular,
  },
  {
    name: 'respond with success and data on /epochs/:number/block 2',
    endpoint: '/epochs/0/blocks',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epoch/:number/block/:pool_id 1',
    endpoint: '/epochs/243/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: epoch_found,
    },
    sqlQueryMock3: {
      rows: query_epochs_number_blocks_pool_id_regular,
    },
    response: response_epochs_number_blocks_pool_id_regular,
  },
  {
    name: 'respond with success and data on /epoch/:number/block/:pool_id 2',
    endpoint: '/epochs/100/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: epoch_found,
    },
    sqlQueryMock3: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /epoch/:number/parameters 1',
    endpoint: '/epochs/243/parameters',
    sqlQueryMock: {
      rows: [query_epoch_number_parameters_regular],
    },
    response: response_epoch_number_parameters_regular,
  },
  {
    name: 'respond with success and data on /epoch/latest/parameters 2',
    endpoint: '/epochs/latest/parameters',
    sqlQueryMock: {
      rows: [query_epoch_number_parameters_regular],
    },
    response: response_epoch_number_parameters_regular,
  },
  /*
      400s
  */
  {
    name: 'respond with 400 on /epochs/:number/stakes/:pool_id 1',
    endpoint: '/epochs/1333337/stakes/stonks_pool',
    sqlQueryMock: {
      rows: epoch_found,
    },
    response: response_400,
  },
  {
    name: 'respond with 400 on /epochs/:number/blocks/:pool_id 2',
    endpoint: '/epochs/1333337/blocks/stonks_pool',
    sqlQueryMock: {
      rows: epoch_found,
    },
    response: response_400,
  },

  /*
      404s
  */
  {
    name: 'respond with 404 and empty data on /epochs',
    endpoint: '/epochs/latest',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number',
    endpoint: '/epochs/1333337',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/next',
    endpoint: '/epochs/1333337/next',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/previous',
    endpoint: '/epochs/1333337/previous',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/stakes',
    endpoint: '/epochs/1333337/stakes',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 400 on /epochs/:number/stakes/:pool_id',
    endpoint: '/epochs/1333337/stakes/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/stake/:pool_id',
    endpoint: '/epochs/137/stakes/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/blocks',
    endpoint: '/epochs/1333337/blocks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/blocks/:pool_id',
    endpoint: '/epochs/137/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/blocks/:pool_id',
    endpoint: '/epochs/1333337/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/:number/parameters',
    endpoint: '/epochs/1333337/parameters',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /epochs/latest/parameters',
    endpoint: '/epochs/latest/parameters',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },

  /*
    500
  */

  {
    name: 'respond with 500 with null on /epochs',
    endpoint: '/epochs/latest',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number',
    endpoint: '/epochs/1333337',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/next',
    endpoint: '/epochs/1333337/next',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/previous',
    endpoint: '/epochs/1333337/previous',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/stakes',
    endpoint: '/epochs/1333337/stakes',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/stakes/:pool_id',
    endpoint: '/epochs/1333337/stakes/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/blocks',
    endpoint: '/epochs/1333337/blocks',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/blocks/:pool_id',
    endpoint: '/epochs/1333337/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/blocks/:pool_id',
    endpoint: '/epochs/1333337/blocks/pool152ha79a677s2skr5n9cethtg549nljxm2vlzqfgaf8hq67q3790',
    sqlQueryMock: {
      rows: epoch_found,
    },
    sqlQueryMock2: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/:number/parameters',
    endpoint: '/epochs/1333337/parameters',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 with null on /epochs/latest/parameters',
    endpoint: '/epochs/latest/parameters',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
]; //as const;
