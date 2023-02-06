const query_found = [{ result: 1 }];

const query_accounts_regular_1 = {
  stake_address: 'stake1ux3g2c9dx2nhhehyrezyxpkstartcqmu9hk63qgfkccw5rqttygt7',
  active: true,
  active_epoch: 210,
  controlled_amount: '12436175589',
  rewards_sum: '76597044006',
  withdrawals_sum: '64185306317',
  reserves_sum: '0',
  treasury_sum: '0',
  withdrawable_amount: '12411737689',
  pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
};

const response_accounts_regular_1 = {
  stake_address: 'stake1ux3g2c9dx2nhhehyrezyxpkstartcqmu9hk63qgfkccw5rqttygt7',
  active: true,
  active_epoch: 210,
  controlled_amount: '12436175589',
  rewards_sum: '76597044006',
  withdrawals_sum: '64185306317',
  reserves_sum: '0',
  treasury_sum: '0',
  withdrawable_amount: '12411737689',
  pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
};

const query_accounts_regular_testnet_1 = {
  stake_address: 'stake1tp5t0t5y6cqkaz7rfsyrx7mld77kpvksgkwasdweqeqesadqwewew',
  active: true,
  active_epoch: 94,
  controlled_amount: '874776395',
  rewards_sum: '2978218',
  withdrawals_sum: '0',
  reserves_sum: '0',
  treasury_sum: '0',
  withdrawable_amount: '2978218',
  pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
};

const response_accounts_regular_testnet_1 = {
  stake_address: 'stake1tp5t0t5y6cqkaz7rfsyrx7mld77kpvksgkwasdweqeqesadqwewew',
  active: true,
  active_epoch: 94,
  controlled_amount: '874776395',
  rewards_sum: '2978218',
  withdrawals_sum: '0',
  reserves_sum: '0',
  treasury_sum: '0',
  withdrawable_amount: '2978218',
  pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
};

const query_accounts_rewards_regular_1 = [
  {
    epoch: 211,
    amount: '1770063920',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'member',
  },
  {
    epoch: 211,
    amount: '1345464564',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'leader',
  },
  {
    epoch: 212,
    amount: '1872460004',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'member',
  },
  {
    epoch: 213,
    amount: '500000000',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'pool_deposit_refund',
  },
];

const response_accounts_rewards_regular_1 = [
  {
    epoch: 211,
    amount: '1770063920',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'member',
  },
  {
    epoch: 211,
    amount: '1345464564',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'leader',
  },
  {
    epoch: 212,
    amount: '1872460004',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'member',
  },
  {
    epoch: 213,
    amount: '500000000',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
    type: 'pool_deposit_refund',
  },
];

const query_accounts_delegation_regular_1 = [
  {
    active_epoch: 225,
    tx_hash: '596179792ee236357721cbb4a9178f7d2992805e7f2bebb2afaf66f2838c1869',
    amount: '6804672',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
  {
    active_epoch: 225,
    tx_hash: 'f9f5c84c02b2e061b43a206a0372342024c99d046136d301769a860bc7c7cde5',
    amount: '4598489',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
  {
    active_epoch: 225,
    tx_hash: 'f205b644c7a27550ba0ffec40012a9bf09b43750166345f671e432cde146752f',
    amount: '4193901',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
];

const response_accounts_delegation_regular_1 = [
  {
    active_epoch: 225,
    tx_hash: '596179792ee236357721cbb4a9178f7d2992805e7f2bebb2afaf66f2838c1869',
    amount: '6804672',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
  {
    active_epoch: 225,
    tx_hash: 'f9f5c84c02b2e061b43a206a0372342024c99d046136d301769a860bc7c7cde5',
    amount: '4598489',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
  {
    active_epoch: 225,
    tx_hash: 'f205b644c7a27550ba0ffec40012a9bf09b43750166345f671e432cde146752f',
    amount: '4193901',
    pool_id: 'pool14skj6e4rpjanzclx3fc880xnl8xafgg63tmw93t9xspvwx985qu',
  },
];

const query_accounts_registration_regular_1 = [
  {
    tx_hash: '596179792ee236357721cbb4a9178f7d2992805e7f2bebb2afaf66f2838c1869',
    action: 'registered',
  },
  {
    tx_hash: '5e8b8ed43af7d1e8fc76fc04685650d33907d988bfcc183f4d8987e22fa747c6',
    action: 'deregistered',
  },
  {
    tx_hash: 'f9f5c84c02b2e061b43a206a0372342024c99d046136d301769a860bc7c7cde5',
    action: 'registered',
  },
];

const response_accounts_registration_regular_1 = [
  {
    tx_hash: '596179792ee236357721cbb4a9178f7d2992805e7f2bebb2afaf66f2838c1869',
    action: 'registered',
  },
  {
    tx_hash: '5e8b8ed43af7d1e8fc76fc04685650d33907d988bfcc183f4d8987e22fa747c6',
    action: 'deregistered',
  },
  {
    tx_hash: 'f9f5c84c02b2e061b43a206a0372342024c99d046136d301769a860bc7c7cde5',
    action: 'registered',
  },
];

const query_accounts_history_regular_1 = [
  {
    active_epoch: 210,
    amount: '1603126875654',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
  {
    active_epoch: 211,
    amount: '1603635486132',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
  {
    active_epoch: 212,
    amount: '1603635486132',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
];
const response_accounts_history_regular_1 = [
  {
    active_epoch: 210,
    amount: '1603126875654',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
  {
    active_epoch: 211,
    amount: '1603635486132',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
  {
    active_epoch: 212,
    amount: '1603635486132',
    pool_id: 'pool108zdflss3ayqlm5c7vr6mtqj2uwl99vk28ur8dv4zswdzt6yauc',
  },
];

const query_accounts_withdrawals_regular_1 = [
  {
    tx_hash: '65f295d89c7c83a380617d469a3eac3e7d7032dd207bd352178ae88d7fb0efa8',
    amount: '3642523924',
  },
  {
    tx_hash: '7a19f94ea632a580688f3ae7e75cdd3e09c0f26685744274d2f21c297a73171f',
    amount: '2027933968',
  },
];
const response_accounts_withdrawals_regular_1 = [
  {
    tx_hash: '65f295d89c7c83a380617d469a3eac3e7d7032dd207bd352178ae88d7fb0efa8',
    amount: '3642523924',
  },
  {
    tx_hash: '7a19f94ea632a580688f3ae7e75cdd3e09c0f26685744274d2f21c297a73171f',
    amount: '2027933968',
  },
];

const query_accounts_mirs_regular_1 = [
  {
    tx_hash: '7b57f2cf1c442c563647ab29669c88b9116c2668d31d42526ff27ed614da1252',
    amount: '19296735',
  },
];
const response_accounts_mirs_regular_1 = [
  {
    tx_hash: '7b57f2cf1c442c563647ab29669c88b9116c2668d31d42526ff27ed614da1252',
    amount: '19296735',
  },
];

const query_accounts_addresses_regular_1 = [
  {
    address:
      'addr1qxvmrqqdhtrdvd8c03rfalj7svsllgpw8vp6kfs6xps33zqha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllqdj8ut8',
  },
  {
    address:
      'addr1q8vvxqs2m4mxal0kggj3anczqrqzaft3y0df225mxe0urzsha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllqnh4ktn',
  },
  {
    address:
      'addr1qyg63h3jjy7v28wyhd3x7j0nltlnlmk3cx9vjklrzwddx2qha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllq47rter',
  },
];
const response_accounts_addresses_regular_1 = [
  {
    address:
      'addr1qxvmrqqdhtrdvd8c03rfalj7svsllgpw8vp6kfs6xps33zqha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllqdj8ut8',
  },
  {
    address:
      'addr1q8vvxqs2m4mxal0kggj3anczqrqzaft3y0df225mxe0urzsha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllqnh4ktn',
  },
  {
    address:
      'addr1qyg63h3jjy7v28wyhd3x7j0nltlnlmk3cx9vjklrzwddx2qha2lc2u52ty9h0p0j04sdaf75hje4ddpch82h0fz4gllq47rter',
  },
];

const request_accounts_addresses_assets_regular_1 = [
  {
    unit: '13dd6e7e3b0718eca13a77559ff09b0665acd3e9a3db121f554cb16d4e465455303030394865726b696d6572323230',
    quantity: '1',
  },
  {
    unit: '5fd124b4b1a6676b73d8cc959783a6422c5cc9a2c7673ae761318f4b4865726b696d657230303234',
    quantity: '1',
  },
  {
    unit: '5fd124b4b1a6676b73d8cc959783a6422c5cc9a2c7673ae761318f4b4865726b696d657230313131',
    quantity: '1',
  },
];

const response_accounts_addresses_assets_regular_1 = [
  {
    unit: '13dd6e7e3b0718eca13a77559ff09b0665acd3e9a3db121f554cb16d4e465455303030394865726b696d6572323230',
    quantity: '1',
  },
  {
    unit: '5fd124b4b1a6676b73d8cc959783a6422c5cc9a2c7673ae761318f4b4865726b696d657230303234',
    quantity: '1',
  },
  {
    unit: '5fd124b4b1a6676b73d8cc959783a6422c5cc9a2c7673ae761318f4b4865726b696d657230313131',
    quantity: '1',
  },
];

const query_accounts_addresses_addresses_total_1 = [
  {
    stake_address: 'stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja',
    sent_amount_lovelace: '4771154',
    sent_amount: [
      {
        unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
        quantity: '1',
      },
      {
        unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
        quantity: '1',
      },
      {
        unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
        quantity: '1',
      },
    ],
    received_amount_lovelace: '34415243',
    received_amount: [
      {
        unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
        quantity: '2',
      },
      {
        unit: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673030343731',
        quantity: '1',
      },
      {
        unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
        quantity: '1000000',
      },
      {
        unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
        quantity: '2',
      },
      {
        unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
        quantity: '2',
      },
    ],
    tx_count: '7',
  },
];

const response_accounts_addresses_addresses_total_1 = {
  stake_address: 'stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja',
  received_sum: [
    { unit: 'lovelace', quantity: '34415243' },
    {
      unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
      quantity: '2',
    },
    {
      unit: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673030343731',
      quantity: '1',
    },
    {
      unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
      quantity: '1000000',
    },
    {
      unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
      quantity: '2',
    },
    {
      unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
      quantity: '2',
    },
  ],
  sent_sum: [
    { unit: 'lovelace', quantity: '4771154' },
    {
      unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
      quantity: '1',
    },
    {
      unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
      quantity: '1',
    },
    {
      unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
      quantity: '1',
    },
  ],
  tx_count: 7,
};

const response_400 = {
  error: 'Bad Request',
  message: 'Invalid or malformed stake address format.',
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
    name: 'respond with success and data on /accounts/:stake_address',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k',
    sqlQueryMock: {
      rows: [query_accounts_regular_1],
    },
    response: response_accounts_regular_1,
  },
  {
    name: 'TESTNET: respond with success and data on /accounts/:stake_address',
    endpoint: '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0',
    sqlQueryMock: {
      rows: [query_accounts_regular_testnet_1],
    },
    response: response_accounts_regular_testnet_1,
    network: 'testnet',
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/rewards',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/rewards',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_rewards_regular_1,
    },
    response: response_accounts_rewards_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/rewards',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/rewards',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_delegation_regular_1,
    },
    response: response_accounts_delegation_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_delegation_regular_1,
    },
    unpaged: true,
    response: response_accounts_delegation_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/registrations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_registration_regular_1,
    },
    response: response_accounts_registration_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/registrations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_registration_regular_1,
    },
    unpaged: true,
    response: response_accounts_registration_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/registrations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/history',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_history_regular_1,
    },
    response: response_accounts_history_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/history',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_history_regular_1,
    },
    unpaged: true,
    response: response_accounts_history_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/history',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/withdrawals',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/withdrawals',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_withdrawals_regular_1,
    },
    response: response_accounts_withdrawals_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/withdrawals',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/withdrawals',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/mirs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_mirs_regular_1,
    },
    response: response_accounts_mirs_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/mirs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_mirs_regular_1,
    },
    unpaged: true,
    response: response_accounts_mirs_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/mirs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_addresses_regular_1,
    },
    response: response_accounts_addresses_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_addresses_regular_1,
    },
    unpaged: true,
    response: response_accounts_addresses_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses/assets',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/assets',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: request_accounts_addresses_assets_regular_1,
    },
    response: response_accounts_addresses_assets_regular_1,
  },
  {
    name: 'respond with success and unpaged data on /accounts/:stake_address/addresses/assets',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/assets',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: request_accounts_addresses_assets_regular_1,
    },
    unpaged: true,
    response: response_accounts_addresses_assets_regular_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses/assets',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/assets',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses/total',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/total',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_addresses_addresses_total_1,
    },
    response: response_accounts_addresses_addresses_total_1,
  },
  {
    name: 'respond with success and data on /accounts/:stake_address/addresses/total',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/total',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_accounts_addresses_addresses_total_1,
    },
    unpaged: true,
    response: response_accounts_addresses_addresses_total_1,
  },
  /*

      400s

  */
  {
    name: 'respond with 400 on /accounts/:stake_address',
    endpoint: '/accounts/stonks',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/rewards',
    endpoint: '/accounts/stonks/rewards',

    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stonks/delegations',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/withdrawals',
    endpoint: '/accounts/stonks/withdrawals',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stonks/mirs',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stonks/registrations',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/history',
    endpoint: '/accounts/stonks/history',
    response: response_400,
  },
  {
    name: 'respond with 400 on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stonks/addresses',
    response: response_400,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/addresses/assets',
    endpoint: '/accounts/stonks/addresses/assets',
    response: response_400,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/addresses/total',
    endpoint: '/accounts/stonks/addresses/total',
    response: response_400,
  },

  /*
      404s
  */

  {
    name: 'respond with 404 and empty data on /accounts/:stake_address',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address',
    endpoint: '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
    network: 'testnet',
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/rewards',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/rewards',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/delegations',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/registrations',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/history',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/withdrawals',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/withdrawals',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/mirs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/addresses',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/addresses/assets',
    endpoint:
      '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/addresses/assets',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /accounts/:stake_address/addresses/total',
    endpoint:
      '/accounts/stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss/addresses/total',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  /*
      500s
  */

  {
    name: 'respond with 500 and null on /accounts/:stake_address',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/rewards',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/rewards',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/delegations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/delegations',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/registrations',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/registrations',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/history',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/history',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/withdrawals',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/withdrawals',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/mirs',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/mirs',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/addresses',
    endpoint: '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/addresses/assets',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/assets',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /accounts/:stake_address/addresses/total',
    endpoint:
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/addresses/total',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
]; //as const;
