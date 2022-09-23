export default [
  {
    testName: 'accounts/:stake_address generic stake address',
    endpoints: [
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0',
      '/accounts/stake_test1urtemlwr6hmw6q5mc5p0q6z06g4f3v33czec67yf688w4wsw6rnpq',
    ],
    response: {
      active: expect.any(Boolean),
      active_epoch: expect.toBeTypeOrNull(Number),
      controlled_amount: expect.any(String),
      rewards_sum: expect.any(String),
      withdrawals_sum: expect.any(String),
      reserves_sum: expect.any(String),
      treasury_sum: expect.any(String),
      withdrawable_amount: expect.any(String),
      pool_id: expect.toBeTypeOrNull(String),
    },
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address rewards',
    endpoints: [
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/rewards?count=3&page=2',
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/rewards?count=3&page=2&order=asc',
    ],
    response: [
      {
        epoch: 97,
        amount: '141966',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
        type: 'member',
      },
      {
        epoch: 98,
        amount: '138012',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
        type: 'member',
      },
      {
        epoch: 99,
        amount: '124513',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
        type: 'member',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address history',
    endpoints: [
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/history?count=3&page=2',
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/history?count=3&page=2&order=asc',
    ],
    response: [
      {
        active_epoch: 79,
        amount: '871970938',
        pool_id: 'pool1y25deq9kldy9y9gfvrpw8zt05zsrfx84zjhugaxrx9ftvwdpua2',
      },
      {
        active_epoch: 94,
        amount: '871798177',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
      },
      {
        active_epoch: 95,
        amount: '871798177',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address delegations',
    endpoints: [
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/delegations?count=2&page=3',
      '/accounts/stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy0/delegations?count=2&page=3&order=asc',
    ],
    response: [
      {
        active_epoch: 76,
        tx_hash: 'd8b33b8ac4cf54fc9178b1c11e11645432659564ba858d5d823f097a8d1f566f',
        amount: '871970938',
        pool_id: 'pool1y25deq9kldy9y9gfvrpw8zt05zsrfx84zjhugaxrx9ftvwdpua2',
      },
      {
        active_epoch: 94,
        tx_hash: '58bf3f11906e9add28d9ee1e1b15560af6b636722d8311f25163e742ca7f25c4',
        amount: '871798177',
        pool_id: 'pool1rnsw42f2q0u9fc32ttxy9l085n736jxz07lvwutz63wpyef03zh',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address registrations',
    endpoints: [
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/registrations?count=2&page=3',
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/registrations?count=2&page=3&order=asc',
    ],
    response: [
      {
        tx_hash: '1438aed480733b664ef953c4c683d84688937f9273a1476c536a02f4ee50c580',
        action: 'registered',
      },
      {
        tx_hash: '94dab8d7ff2c2eea9b4076493cfb628c44c0ace0fffe1098c5c06f010188267d',
        action: 'deregistered',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address generic empty list',
    endpoints: [
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/registrations?page=694269',
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/delegations?page=694269',
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/history?page=694269',
    ],
    response: [],
  },
  {
    testName: 'accounts/:stake_address generic empty list',
    endpoints: [
      '/accounts/stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6/addresses/total',
    ],
    response: {
      stake_address: 'stake_test1ur4uaa75pvnn7f0t984hwzgldvsn3rkw7ptdrdqknyrjevc3n3dq6',
      received_sum: [{ unit: 'lovelace', quantity: '288908413540' }],
      sent_sum: [{ unit: 'lovelace', quantity: '287254115600' }],
      tx_count: 1026,
    },
  },
  {
    testName: 'accounts/:stake_address/addresses/assets nutcoin stake address',
    endpoints: [
      '/accounts/stake_test1upuw5h4xqfdnvyqzdqnr9vgkwgz04k5fxzlrjald6ev6hrcrpyce4/addresses/assets',
      '/accounts/stake_test1upuw5h4xqfdnvyqzdqnr9vgkwgz04k5fxzlrjald6ev6hrcrpyce4/addresses/assets?order=asc',
      '/accounts/stake_test1upuw5h4xqfdnvyqzdqnr9vgkwgz04k5fxzlrjald6ev6hrcrpyce4/addresses/assets?order=asc&page=1',
    ],
    response: [
      { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '3' },
      { unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c', quantity: '2' },
    ],
  },
  {
    testName: 'accounts/:stake_address/addresses/assets nutcoin stake address',
    endpoints: [
      '/accounts/stake_test1upuw5h4xqfdnvyqzdqnr9vgkwgz04k5fxzlrjald6ev6hrcrpyce4/addresses/assets?order=asc&page=1&count=1',
      '/accounts/stake_test1upuw5h4xqfdnvyqzdqnr9vgkwgz04k5fxzlrjald6ev6hrcrpyce4/addresses/assets?order=asc&count=1',
    ],
    response: [
      {
        unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
        quantity: '3',
      },
    ],
  },
];
