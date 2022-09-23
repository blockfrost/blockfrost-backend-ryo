export default [
  {
    testName: 'accounts/:stake_address generic stake address',
    endpoints: ['/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk'],
    response: {
      stake_address: 'stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk',
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
    testName: 'accounts/:stake_address generic stake address',
    endpoints: ['/accounts/stake1u8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkgs46q0w'],
    response: {
      stake_address: 'stake1u8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkgs46q0w',
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
  // https://github.com/input-output-hk/cardano-db-sync/issues/474
  /*
  stake1u8fne2lfh3a8v33y8splqc5gr5r8gjea2wvrsgch39emnvqny8wlm = (0) 2 pools, pool1g60m45m23f5vta30x5z7e0n2gc02yc4wyz6darfeluy2kgu65fa, pool1y9tz9enfcrcvpxpga3qspfxx3xclns2g74ptqxftdmgq6ghyrn0
  stake1uxzjdz34g596yt9dyprjse0yr775xszuyal3ltyqsx2k9wcjhvvke = (0) pool1av0amckqhv85qxctwg2hj4jcgdgfhpmvvw3c5evrkg9a76tr7jh
  stake1uyluup0rh6r2cc7kcw8nudqz990ezf5ltagxmw3u8deukvqwq7etq = (3.669389) pool1tz9k09jylmnk74z74v2t384smfypr7cwpzvs5sd2w537wu5jlrk
  stake1u80x0vdf8kwvptk7nar24d805p7wnlj4vm22cl0q8jngs9q5k2suq // 3 pools, two of them retired in the same epoch pool10ehxcuxmryvg5ae6g8krdvhaj3m07a6rzdtv8a0grtxpv7fnrpu, pool1qu4gywwxgdgep3t3pdgd92nclz9khr645dhn6fzyrmkuu4jk6th, pool1x6pcty09rx70ujg5lkxl7tdenamzh002y3uppkk0qczzcxyguyd
  */
  {
    testName: 'accounts/:stake_address reward account for deregistered pool ',
    endpoints: ['/accounts/stake1uyluup0rh6r2cc7kcw8nudqz990ezf5ltagxmw3u8deukvqwq7etq'],
    response: {
      stake_address: 'stake1uyluup0rh6r2cc7kcw8nudqz990ezf5ltagxmw3u8deukvqwq7etq',
      active: true,
      active_epoch: 219,
      controlled_amount: '1848501',
      rewards_sum: '0',
      withdrawals_sum: '1000000000',
      reserves_sum: '0',
      treasury_sum: '0',
      withdrawable_amount: '0',
      pool_id: 'pool1tz9k09jylmnk74z74v2t384smfypr7cwpzvs5sd2w537wu5jlrk',
    },
  },
  {
    testName: 'accounts/:stake_address reward account for 2 pools deregistered pools',
    endpoints: ['/accounts/stake1u8fne2lfh3a8v33y8splqc5gr5r8gjea2wvrsgch39emnvqny8wlm'],
    response: {
      stake_address: 'stake1u8fne2lfh3a8v33y8splqc5gr5r8gjea2wvrsgch39emnvqny8wlm',
      active: true,
      active_epoch: 208,
      controlled_amount: '0',
      rewards_sum: '0',
      withdrawals_sum: '1000000000',
      reserves_sum: '0',
      treasury_sum: '0',
      withdrawable_amount: '0',
      pool_id: 'pool1y9tz9enfcrcvpxpga3qspfxx3xclns2g74ptqxftdmgq6ghyrn0',
    },
  },
  {
    testName: 'accounts/:stake_address reward account for pool deregistered 2 times',
    endpoints: ['/accounts/stake1uxzjdz34g596yt9dyprjse0yr775xszuyal3ltyqsx2k9wcjhvvke'],
    response: {
      stake_address: 'stake1uxzjdz34g596yt9dyprjse0yr775xszuyal3ltyqsx2k9wcjhvvke',
      active: true,
      active_epoch: 224,
      controlled_amount: '0',
      rewards_sum: '0',
      withdrawals_sum: '1000000000',
      reserves_sum: '0',
      treasury_sum: '0',
      withdrawable_amount: '0',
      pool_id: 'pool1av0amckqhv85qxctwg2hj4jcgdgfhpmvvw3c5evrkg9a76tr7jh',
    },
  },
  {
    testName:
      'accounts/:stake_address reward account for 3 pools, 2 of them retired in the same epoch',
    endpoints: ['/accounts/stake1u80x0vdf8kwvptk7nar24d805p7wnlj4vm22cl0q8jngs9q5k2suq'],
    response: {
      stake_address: 'stake1u80x0vdf8kwvptk7nar24d805p7wnlj4vm22cl0q8jngs9q5k2suq',
      active: true,
      active_epoch: 229,
      controlled_amount: '0',
      rewards_sum: '0',
      withdrawals_sum: '1500000000',
      reserves_sum: '0',
      treasury_sum: '0',
      withdrawable_amount: '0',
      pool_id: 'pool10ehxcuxmryvg5ae6g8krdvhaj3m07a6rzdtv8a0grtxpv7fnrpu',
    },
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address rewards',
    endpoints: [
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/rewards?count=3&page=2',
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/rewards?count=3&page=2&order=asc',
    ],
    response: [
      {
        epoch: 229,
        amount: '171419599',
        pool_id: 'pool1vx9tzlkgafernd9vpjpxkenutx2gncj4yn88fpq69823qlwcqrt',
        type: 'member',
      },
      {
        epoch: 230,
        amount: '160736772',
        pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
        type: 'member',
      },
      {
        epoch: 231,
        amount: '210662173',
        pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
        type: 'member',
      },
    ],
  },
  {
    testName:
      'accounts/:stake_address?queryparams generic stake address rewards with multiple types',
    endpoints: [
      '/accounts/stake1uxa6lm0x9ezhywczl8rs048mmvn396qtk0w4z2tzu2cytuqs0e38d/rewards?count=4&page=38',
      '/accounts/stake1uxa6lm0x9ezhywczl8rs048mmvn396qtk0w4z2tzu2cytuqs0e38d/rewards?count=4&page=38&order=asc',
    ],
    response: [
      {
        epoch: 325,
        amount: '672136648',
        pool_id: 'pool15yyxtkhz64p7a8cnax9l7u82s9t9hdhyxsa3tdm977qhgpnsuhq',
        type: 'leader',
      },
      {
        epoch: 325,
        amount: '2859721',
        pool_id: 'pool15yyxtkhz64p7a8cnax9l7u82s9t9hdhyxsa3tdm977qhgpnsuhq',
        type: 'member',
      },
      {
        epoch: 326,
        amount: '622247570',
        pool_id: 'pool15yyxtkhz64p7a8cnax9l7u82s9t9hdhyxsa3tdm977qhgpnsuhq',
        type: 'leader',
      },
      {
        epoch: 326,
        amount: '2526902',
        pool_id: 'pool15yyxtkhz64p7a8cnax9l7u82s9t9hdhyxsa3tdm977qhgpnsuhq',
        type: 'member',
      },
    ],
  },
  {
    testName:
      'accounts/:stake_address?queryparams generic stake address rewards with multiple types',
    endpoints: [
      '/accounts/stake1uyr7kdys3kmruysratwqzjpx0ya8rjsh8t68d2573yp3g0cr05y2r/rewards?count=1&page=11',
      '/accounts/stake1uyr7kdys3kmruysratwqzjpx0ya8rjsh8t68d2573yp3g0cr05y2r/rewards?count=1&page=11&order=asc',
    ],
    response: [
      {
        epoch: 320,
        amount: '500000000',
        pool_id: 'pool1wym4qkxsvqejxqn4l55y9z708mkxc36qge28qevrvp056fe7dxg',
        type: 'pool_deposit_refund',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address history',
    endpoints: [
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/history?count=3&page=2',
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/history?count=3&page=2&order=asc',
    ],
    response: [
      {
        active_epoch: 229,
        amount: '220098162468',
        pool_id: 'pool1vx9tzlkgafernd9vpjpxkenutx2gncj4yn88fpq69823qlwcqrt',
      },
      {
        active_epoch: 230,
        amount: '220268640006',
        pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
      },
      {
        active_epoch: 231,
        amount: '220428767042',
        pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address withdrawals',
    endpoints: [
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/withdrawals?count=4&page=2',
      '/accounts/stake1u88xakeptjw9jwsytkjal76d07an4thvvrfx3w2kt77pw4sc5rr8k/withdrawals?count=4&page=2&order=asc',
    ],
    response: [
      {
        tx_hash: '4c8f16ba4730fe0e84d1d79b38a6198b0283b0b87e36388cb3e6c5f07f99bfb0',
        amount: '1862857028',
      },
      {
        tx_hash: '6072dc5a1688418f0da70427b32c49fb6c494170c7988a105ccc33a95a1b0370',
        amount: '1779916664',
      },
      {
        tx_hash: '3926bcc6b726394dee99c681d0768849214ca0b02f728690fcafba6c22c3e19c',
        amount: '821097437',
      },
      {
        tx_hash: '3a277898a5789c433f556672903b3bf260d074efadaf1f0128c4de663a501192',
        amount: '3602325039',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address mirs',
    endpoints: [
      '/accounts/stake1uyq7039vutuw8v7femqtktdu9zlhnqh3mkvvhdazft9ga2q8zdfkp/mirs?count=1&page=1',
      '/accounts/stake1uyq7039vutuw8v7femqtktdu9zlhnqh3mkvvhdazft9ga2q8zdfkp/mirs?count=1&page=1&order=asc',
    ],
    response: [
      {
        tx_hash: '7b57f2cf1c442c563647ab29669c88b9116c2668d31d42526ff27ed614da1252',
        amount: '19296735',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address delegations',
    endpoints: [
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/delegations?count=2&page=1',
      '/accounts/stake1u9fzg77vrgfqlplkjqe9hntdcvsurpvxd60yp2fhn73002qsv9pdk/delegations?count=2&page=1&order=asc',
    ],
    response: [
      {
        active_epoch: 226,
        tx_hash: 'c9c0cb115394364b3370deb3788e4a76ed3c842d801b03608c74bad069114e35',
        amount: '218597075764',
        pool_id: 'pool1vx9tzlkgafernd9vpjpxkenutx2gncj4yn88fpq69823qlwcqrt',
      },
      {
        active_epoch: 230,
        tx_hash: '67fc467494a403b6cd862987ac2b85d1f7cfd6ca25a99f13a5ce0d19c3b7851c',
        amount: '218593734378',
        pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address?queryparams generic stake address registrations',
    endpoints: [
      '/accounts/stake1u8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkgs46q0w/registrations?count=2&page=1',
      '/accounts/stake1u8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkgs46q0w/registrations?count=2&page=1&order=asc',
    ],
    response: [
      {
        tx_hash: '594acb72254f0fc0963de09eeca0ab8501c79aacb09bbeb9470ae6b9565fb547',
        action: 'registered',
      },
      {
        tx_hash: '38a5687ab61d510f2874c6ff2cd5779bbebfa99a5c069fbe028e5397d8813d58',
        action: 'deregistered',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address generic empty list',
    endpoints: ['/accounts/stake1u8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkgs46q0w/rewards'],
    response: [],
  },
  {
    testName: 'accounts/:stake_address generic dormant stake address with one address',
    endpoints: ['/accounts/stake1uyluup0rh6r2cc7kcw8nudqz990ezf5ltagxmw3u8deukvqwq7etq/addresses'],
    response: [
      {
        address:
          'addr1qx632d7fn780gaaaljawtk2zr0wz840e2sza852tvl6z983lecz7805x433adsu08c6qy22ljynf7h6sdkarcwmnevcqk72a4g',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address generic stake address with zero addresses',
    endpoints: ['/accounts/stake1u9q7y25vy0l4jan6k8r0g2zn2ranezmmk0jnprvvmxqns9cvnhhkl/addresses'],
    response: [],
  },
  {
    testName: 'accounts/:stake_address/addresses/assets nutcoin stake address',
    endpoints: [
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=asc',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=asc&page=1',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=asc&count=6',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=asc&page=1&count=6',
    ],
    response: [
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
      {
        unit: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673030343731',
        quantity: '1',
      },
      {
        unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
        quantity: '1000000',
      },
      {
        unit: 'aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4726561646d65',
        quantity: '1',
      },
    ],
  },
  {
    testName: 'accounts/:stake_address/addresses/assets nutcoin stake address',
    endpoints: [
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=desc',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=desc&page=1',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=desc&count=6',
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/assets?order=desc&page=1&count=6',
    ],
    response: [
      {
        unit: 'aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4726561646d65',
        quantity: '1',
      },
      {
        unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
        quantity: '1000000',
      },
      {
        unit: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673030343731',
        quantity: '1',
      },
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
  },
  {
    testName: 'accounts/:stake_address/addresses/assets generic stake address without tokens',
    endpoints: [
      '/accounts/stake1uyfckx3mk6rqy6epdfqswhw3p6kpfad83mgcmyez2vacuws8yppkw/addresses/assets',
    ],
    response: [],
  },
  {
    testName: 'accounts/:stake_address/addresses/total nutcoin stake address',
    endpoints: [
      '/accounts/stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja/addresses/total',
    ],
    response: {
      stake_address: 'stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja',
      received_sum: [
        { unit: 'lovelace', quantity: '30602239' },
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
          unit: 'aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4726561646d65',
          quantity: '1',
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
      tx_count: 8,
    },
  },
];
