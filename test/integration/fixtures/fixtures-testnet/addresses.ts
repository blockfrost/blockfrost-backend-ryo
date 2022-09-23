export default [
  {
    testName: 'addresses/:address generic shelley address',
    endpoints: [
      '/addresses/addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n',
    ],
    response: {
      address:
        'addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n',
      amount: [
        { unit: 'lovelace', quantity: expect.any(String) },
        {
          unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c',
          quantity: expect.any(String),
        },
        {
          unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
          quantity: expect.any(String),
        },
      ],
      stake_address: expect.toBeTypeOrNull(String),
      type: 'shelley',
    },
  },
  {
    testName: 'addresses/:address generic shelley address payment cred',
    endpoints: ['/addresses/addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf'],
    response: {
      address: 'addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf',
      amount: [
        { unit: 'lovelace', quantity: expect.any(String) },
        {
          unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c',
          quantity: expect.any(String),
        },
        {
          unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
          quantity: expect.any(String),
        },
      ],
      stake_address: expect.toBeTypeOrNull(String),
      type: 'shelley',
    },
  },
  {
    testName: 'addresses/:address generic dormant byron address',
    endpoints: ['/addresses/2cWKMJemoBahbtMY5A5YSHu7et4ebfWCTt4vuHMF46LWTV7SUqQmtCjVJPtxtB5JmCPie'],
    response: {
      address: '2cWKMJemoBahbtMY5A5YSHu7et4ebfWCTt4vuHMF46LWTV7SUqQmtCjVJPtxtB5JmCPie',
      amount: [{ unit: 'lovelace', quantity: expect.any(String) }],
      stake_address: expect.toBeTypeOrNull(String),
      type: 'byron',
    },
  },
  {
    testName: 'addresses/:address shelley address - all hail nutcoin!',
    endpoints: [
      '/addresses/addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9',
    ],
    response: {
      address:
        'addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9',
      amount: [
        { unit: 'lovelace', quantity: '1344798' },
        {
          unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
          quantity: '1',
        },
      ],
      stake_address: 'stake_test1uq5xaj8ynhtdr27xvs8jgrk9ntfyfyt5y8dnts9afcmh2rc6mzlnk',
      type: 'shelley',
      script: false,
    },
  },
  {
    testName: 'addresses/:address/total generic shelley address',
    endpoints: [
      '/addresses/addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n/total',
    ],
    response: {
      address:
        'addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n',
      received_sum: [
        { unit: 'lovelace', quantity: expect.any(String) },
        {
          unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c',
          quantity: expect.any(String),
        },
        {
          unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
          quantity: expect.any(String),
        },
      ],
      sent_sum: [{ unit: 'lovelace', quantity: expect.any(String) }],
      tx_count: expect.any(Number),
    },
  },
  {
    testName: 'addresses/:address/total generic shelley address payment cred',
    endpoints: ['/addresses/addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf/total'],
    response: {
      address: 'addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf',
      received_sum: [
        { unit: 'lovelace', quantity: expect.any(String) },
        {
          unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c',
          quantity: expect.any(String),
        },
        {
          unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
          quantity: expect.any(String),
        },
      ],
      sent_sum: [{ unit: 'lovelace', quantity: expect.any(String) }],
      tx_count: expect.any(Number),
    },
  },
  {
    testName: 'addresses/:address/total generic dormant byron address',
    endpoints: [
      '/addresses/2cWKMJemoBahbtMY5A5YSHu7et4ebfWCTt4vuHMF46LWTV7SUqQmtCjVJPtxtB5JmCPie/total',
    ],
    response: {
      address: '2cWKMJemoBahbtMY5A5YSHu7et4ebfWCTt4vuHMF46LWTV7SUqQmtCjVJPtxtB5JmCPie',
      received_sum: [{ unit: 'lovelace', quantity: expect.any(String) }],
      sent_sum: [{ unit: 'lovelace', quantity: expect.any(String) }],
      tx_count: expect.any(Number),
    },
  },

  {
    testName: 'addresses/:address/total generic shelley address with tokens',
    endpoints: [
      '/addresses/addr_test1qrv70vw2d8xcvhspm264n8hny2yhe0p53q72ms7kzdp66sn4rp83m7d3ey6g6ktjqee09aatmd5resq9s45rja0rhvlqj25fdt/total',
    ],
    response: {
      address:
        'addr_test1qrv70vw2d8xcvhspm264n8hny2yhe0p53q72ms7kzdp66sn4rp83m7d3ey6g6ktjqee09aatmd5resq9s45rja0rhvlqj25fdt',
      received_sum: [
        { unit: 'lovelace', quantity: '21655136' },
        { unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf391652243484f43', quantity: '2' },
        {
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522534245525259',
          quantity: '2',
        },
        {
          unit: 'bbf6bd8d3a9a95e603b99c2306962be31e50f8443bb6dbae061e11d2626c6f636b66726f7374696f',
          quantity: '2',
        },
      ],
      sent_sum: [{ unit: 'lovelace', quantity: '20000000' }],
      tx_count: 3,
    },
  },
  {
    testName: 'addresses/:address/total shelley address - all hail nutcoin!',
    endpoints: [
      '/addresses/addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9/total',
    ],
    response: {
      address:
        'addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9',
      received_sum: [
        { unit: 'lovelace', quantity: '1344798' },
        {
          unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
          quantity: '1',
        },
      ],
      sent_sum: [{ unit: 'lovelace', quantity: '0' }],
      tx_count: 1,
    },
  },
  {
    testName: 'addresses/:address/utxos generic shelley address',
    endpoints: [
      '/addresses/addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n/utxos',
      '/addresses/addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf/utxos',
    ],
    response: [
      {
        tx_hash: 'b82e1ba36f6f85b626dcd7e6e030d45ab1617fd2689d77b435c512740b3c302a',
        tx_index: 0,
        output_index: 0,
        amount: [
          {
            unit: 'lovelace',
            quantity: '1407406',
          },
          {
            unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
            quantity: '2',
          },
        ],
        block: '5cd9a14469bb9733e749e6d8e30c276a054290e2c42fc3423c2ebe4b9dae35bc',
        data_hash: null,
      },
      {
        tx_hash: '8d98c2bb625e2a0a1ad955537be166b3fef029751bd7fdfa4622f032aaf2d6ed',
        tx_index: 0,
        output_index: 0,
        amount: [
          {
            unit: 'lovelace',
            quantity: '1407406',
          },
          {
            unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
            quantity: '2',
          },
        ],
        block: '3ecd9ed7f6edc362300d31f6a7b3743878e6c3d1d294cbc2194f6ca18d611e5a',
        data_hash: null,
      },
      {
        tx_hash: '0f6ad6cea75b73ddca5bdfc0a551a480b39d8476f5588ddd7a13cbb7148df72d',
        tx_index: 9,
        output_index: 9,
        amount: [
          {
            unit: 'lovelace',
            quantity: '1344798',
          },
          {
            unit: '2bd1de9a0ede8302f7b860792d4fcfa9a34cafa6d0cc54d20e5b53745345414c',
            quantity: '2',
          },
        ],
        block: '5dca6eb90413617daf211ea0fb98cade28b35bb93543268cbbf701b73da0468f',
        data_hash: null,
      },
    ],
  },
  {
    testName: 'addresses/:address generic shelley address',
    endpoints: [
      '/addresses/addr_test1qrztngljusdyzr74h3038hy0y3n598ss326sk7k44zftcecfs3aqghmjczzxm9h2zl7hq6yuklcxp3l4kp9al56n0dqsn76f7h/utxos',
    ],
    response: [
      {
        tx_hash: 'e56838b53e226331a3fa3d62d9f4fd617b7450f3c7f275b270446fa61d2f410d',
        tx_index: 0,
        output_index: 0,
        amount: [
          { unit: 'lovelace', quantity: '1407406' },
          { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
        ],
        block: 'cfcdb0aad0f5d519d975e568354f6588b535dd6272907b7ec24c7e5f75fedc23',
        data_hash: null,
      },
    ],
  },
  {
    testName: 'addresses/:address/utxos generic dormant byron address',
    endpoints: [
      '/addresses/2cWKMJemoBahbtMY5A5YSHu7et4ebfWCTt4vuHMF46LWTV7SUqQmtCjVJPtxtB5JmCPie/utxos',
    ],
    response: [],
  },
  {
    testName: 'addresses/:address/utxos generic dormant shelley address',
    endpoints: [
      '/addresses/addr_test1qqq3khs5xxceguwx0lvyrvx09dwuwq6ne5r70lu9c06kpjqfs3aqghmjczzxm9h2zl7hq6yuklcxp3l4kp9al56n0dqsca7xnl/utxos',
    ],
    response: [
      {
        tx_hash: '79e68035f33dfe79864e3e0762e3475363c83f69a7e42f8adb8de321fa63e8b6',
        tx_index: 0,
        output_index: 0,
        amount: [{ unit: 'lovelace', quantity: '69000000' }],
        block: 'ab9a2497cc7819ab297072ad396844d54a40c89b19d96331abc330d48eee9932',
        data_hash: null,
      },
    ],
  },
  {
    testName: 'addresses/:address/utxos/:asset generic dormant shelley address asset',
    endpoints: [
      '/addresses/addr_test1qpq8l3wg08y4hh0r0yh02fvtsmfc9y7u96nhvnnhq7kgtjqfs3aqghmjczzxm9h2zl7hq6yuklcxp3l4kp9al56n0dqs5c6erz/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
    ],
    response: [
      {
        tx_hash: '652d9366aad243bb0b1e0263b06bf51e9e2035b5c170c214d4112fa9800c1e55',
        tx_index: 0,
        output_index: 0,
        amount: [
          { unit: 'lovelace', quantity: '1407406' },
          { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
        ],
        block: '5c69859418e13ed0e2f9a3a09e360b5e79743f1e31025d892a166370fc636495',
        data_hash: null,
      },
    ],
  },
  {
    testName: 'addresses/:address/utxos/:asset shelley address - all hail nutcoin!',
    endpoints: [
      '/addresses/addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9/utxos',
      '/addresses/addr_test1qz4jjecn55g0py6yc7yfaxdx2ga49tautuuuuqrgzrqrzmpgdmywf8wk6x4uveq0ys8vtxkjgjghggwmxhqt6n3hw58suf8kl9/utxos/476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
    ],
    response: [
      {
        tx_hash: '9bbfbbdc73732c77b5e0134b0df75aa0b21a845dde12ea52938c45531b3ca1f5',
        tx_index: 0,
        output_index: 0,
        amount: [
          { unit: 'lovelace', quantity: '1344798' },
          {
            unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
            quantity: '1',
          },
        ],
        block: 'f08559e01a8dbe4941818dd1de8ea071342cbeb4ac87ddf3734afb1be4952db3',
        data_hash: null,
      },
    ],
  },
  {
    testName: 'addresses/:address/txs generic shelley address',
    endpoints: [
      '/addresses/addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n/txs?count=2&page=2',
      '/addresses/addr_test1qrw96w7zyqz04anhsn9kxlq9p380x7v6g67zu63xtq0swmdqcjnqrcqx93nmruxea0j56q7fjeedusmluhq7eapawugqqqjq2n/txs?count=2&page=2&order=asc',
      '/addresses/addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf/txs?count=2&page=2',
      '/addresses/addr_vkh1m3wnhs3qqna0vauyed3hcpgvfmehnxjxhshx5fjcrurk6wvk3gf/txs?count=2&page=2&order=asc',
    ],
    response: [
      'f4e06fd5048bc9e64174e04a2bf7f2a6c4c0870c5032f5b7ec49224054e98e12',
      '8d98c2bb625e2a0a1ad955537be166b3fef029751bd7fdfa4622f032aaf2d6ed',
    ],
  },
  {
    testName: 'addresses/:address/txs generic byron address',
    endpoints: [
      '/addresses/37btjrVyb4KDdVL9vqtU4P9caQKp3pvnCRtT22pGnGmAGJTafKb9UEjE4Uo8Mgr9Nba14uCrL1n7qPwsXhWUT8ziGdhkDaByPNx5DGaY6fVioDfhyc/txs?count=2&page=5',
      '/addresses/37btjrVyb4KDdVL9vqtU4P9caQKp3pvnCRtT22pGnGmAGJTafKb9UEjE4Uo8Mgr9Nba14uCrL1n7qPwsXhWUT8ziGdhkDaByPNx5DGaY6fVioDfhyc/txs?count=2&page=5&order=asc',
    ],
    response: [
      '1577836c555c44e222627c671f254792c899b30da2c5481507f19d6e48b00f97',
      '38149c11cdc965d92a1a527edb14e9d0678c74c71876b4dabadb99cd3f3da416',
    ],
  },
  {
    testName: 'addresses/:address/transactions generic byron address',
    endpoints: [
      '/addresses/37btjrVyb4KDdVL9vqtU4P9caQKp3pvnCRtT22pGnGmAGJTafKb9UEjE4Uo8Mgr9Nba14uCrL1n7qPwsXhWUT8ziGdhkDaByPNx5DGaY6fVioDfhyc/transactions?count=2&page=5',
      '/addresses/37btjrVyb4KDdVL9vqtU4P9caQKp3pvnCRtT22pGnGmAGJTafKb9UEjE4Uo8Mgr9Nba14uCrL1n7qPwsXhWUT8ziGdhkDaByPNx5DGaY6fVioDfhyc/transactions?count=2&page=5&order=asc',
    ],
    response: [
      {
        tx_hash: '1577836c555c44e222627c671f254792c899b30da2c5481507f19d6e48b00f97',
        tx_index: 0,
        block_height: 1844333,
        block_time: 1601011444,
      },
      {
        tx_hash: '38149c11cdc965d92a1a527edb14e9d0678c74c71876b4dabadb99cd3f3da416',
        tx_index: 0,
        block_height: 1844452,
        block_time: 1601013673,
      },
    ],
  },
];
