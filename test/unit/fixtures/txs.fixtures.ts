const query_found = [{ result: 1 }];

const query_tx_regular_1 = {
  hash: 'd2e9e7f390f626ebfe47145686d6efc6ab4df81feb166c86f3c367a38461d943',
  block: '89725d399ce6ef5233d719795fb98d4fc946e672b0b3defc311dd405ce52ad2b',
  block_height: 696969,
  block_time: 1632556851,
  slot: 189549,
  index: 3,
  amount_lovelace: '56027739774',
  amount: null,
  fees: '175929',
  deposit: '0',
  size: 453,
  invalid_before: null,
  invalid_hereafter: '18945547',
  utxo_count: 4,
  withdrawal_count: 0,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 0,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const response_tx_regular_1 = {
  hash: 'd2e9e7f390f626ebfe47145686d6efc6ab4df81feb166c86f3c367a38461d943',
  block: '89725d399ce6ef5233d719795fb98d4fc946e672b0b3defc311dd405ce52ad2b',
  block_height: 696969,
  block_time: 1632556851,
  index: 3,
  slot: 189549,
  output_amount: [{ unit: 'lovelace', quantity: '56027739774' }],
  fees: '175929',
  deposit: '0',
  size: 453,
  invalid_before: null,
  invalid_hereafter: '18945547',
  utxo_count: 4,
  withdrawal_count: 0,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 0,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const query_tx_regular_testnet_1 = {
  hash: '80e46d2475b921a9d8a9f2c35cc351ac14222d95b05099626bba07b79989b7b6',
  block: 'c2d6b5b822d0a00cdb56fbc890ffdd51580ce6c59e9d8a5550fc90122a908d5a',
  block_height: 696969,
  block_time: 1632556851,
  index: 0,
  slot: 189549,
  amount_lovelace: '13957491917',
  amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.',
      quantity: 3,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA',
      quantity: 39000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin',
      quantity: 70,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.',
      quantity: 12,
    },
  ],
  fees: '197753',
  deposit: '0',
  size: 603,
  invalid_before: null,
  invalid_hereafter: '19241702',
  utxo_count: 6,
  withdrawal_count: 1,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 0,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const response_tx_regular_testnet_1 = {
  hash: '80e46d2475b921a9d8a9f2c35cc351ac14222d95b05099626bba07b79989b7b6',
  block: 'c2d6b5b822d0a00cdb56fbc890ffdd51580ce6c59e9d8a5550fc90122a908d5a',
  block_height: 696969,
  block_time: 1632556851,
  index: 0,
  slot: 189549,
  output_amount: [
    { unit: 'lovelace', quantity: '13957491917' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.', quantity: '3' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA', quantity: '39000' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin', quantity: '70' },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.', quantity: '12' },
  ],
  fees: '197753',
  deposit: '0',
  size: 603,
  invalid_before: null,
  invalid_hereafter: '19241702',
  utxo_count: 6,
  withdrawal_count: 1,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 0,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const query_tx_pool_update_1 = {
  hash: '5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce',
  block: '805c96a42ea7deefb31f43b0563498086dfa922772fd9fe0d735e10890f2804e',
  block_height: 696969,
  block_time: 1632556851,
  slot: 424242,
  index: 4,
  amount_lovelace: '4644534',
  amount: null,
  fees: '178877',
  deposit: '0',
  size: 361,
  invalid_before: null,
  invalid_hereafter: '14704038',
  utxo_count: 2,
  withdrawal_count: 0,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 1,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const response_tx_pool_update_1 = {
  hash: '5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce',
  block: '805c96a42ea7deefb31f43b0563498086dfa922772fd9fe0d735e10890f2804e',
  block_height: 696969,
  block_time: 1632556851,
  slot: 424242,
  index: 4,
  output_amount: [{ unit: 'lovelace', quantity: '4644534' }],
  fees: '178877',
  deposit: '0',
  size: 361,
  invalid_before: null,
  invalid_hereafter: '14704038',
  utxo_count: 2,
  withdrawal_count: 0,
  mir_cert_count: 0,
  delegation_count: 0,
  stake_cert_count: 0,
  pool_update_count: 0,
  pool_retire_count: 1,
  asset_mint_or_burn_count: 0,
  redeemer_count: 0,
  valid_contract: true,
};

const query_tx_utxo_regular_1_inputs = [
  {
    hash: '5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce',
    address:
      'addr1qyjfl0te7ptvh9999dp5jm3adz3wc3k8z79g9gl7j5g0lf8dmqy47n2dhjh85sjf2a7z4kdmfmsc2f3cz2rpvjwce52s9f8n2x',
    amount_lovelace: '4823411',
    amount: null,
    tx_hash: '84cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
    output_index: 1,
    collateral: false,
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
    reference: true,
  },
];

const query_tx_utxo_regular_1_outputs = [
  {
    address:
      'addr1qyjfl0te7ptvh9999dp5jm3adz3wc3k8z79g9gl7j5g0lf8dmqy47n2dhjh85sjf2a7z4kdmfmsc2f3cz2rpvjwce52s9f8n2x',
    amount_lovelace: '4644534',
    amount: null,
    output_index: 1,
    collateral: false,
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_tx_utxo_regular_1 = {
  hash: '5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce',
  inputs: [
    {
      address:
        'addr1qyjfl0te7ptvh9999dp5jm3adz3wc3k8z79g9gl7j5g0lf8dmqy47n2dhjh85sjf2a7z4kdmfmsc2f3cz2rpvjwce52s9f8n2x',
      amount: [{ unit: 'lovelace', quantity: '4823411' }],
      tx_hash: '84cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
      output_index: 1,
      collateral: false,
      data_hash: null,
      inline_datum: null,
      reference_script_hash: null,
      reference: true,
    },
  ],
  outputs: [
    {
      address:
        'addr1qyjfl0te7ptvh9999dp5jm3adz3wc3k8z79g9gl7j5g0lf8dmqy47n2dhjh85sjf2a7z4kdmfmsc2f3cz2rpvjwce52s9f8n2x',
      amount: [{ unit: 'lovelace', quantity: '4644534' }],
      output_index: 1,
      collateral: false,
      data_hash: null,
      inline_datum: null,
      reference_script_hash: null,
    },
  ],
};

const query_tx_utxo_regular_testnet_1_inputs = [
  {
    hash: '7162f3d9a1edc1a20c0a38c2acb854e221329ca76f7666ee3c82c026b5dadfbf',
    address:
      'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
    amount_lovelace: '100000000',
    amount: null,
    tx_hash: '84cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
    output_index: 1,
    collateral: false,
    data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
    inline_datum: null,
    reference_script_hash: null,
    reference: true,
  },
  {
    address:
      'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
    amount_lovelace: '6910779',
    amount: [
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.',
        quantity: 4,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA',
        quantity: 40000,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin',
        quantity: 75,
      },
      {
        unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK',
        quantity: 1000,
      },
      {
        unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.',
        quantity: 26,
      },
    ],
    tx_hash: '44cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
    output_index: 0,
    collateral: false,
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
    reference: false,
  },
];

const query_tx_utxo_regular_testnet_1_outputs = [
  {
    address:
      'addr_test1qzddgtdqxmsvn0rqp0ltdfpddudvf76qs3esyn3zqf44drkprmcgc38nvy9hu4k5dcyxhyqcdsfwnf50q5sm03x89e9slwzp5f',
    amount_lovelace: '2000000',
    amount: [
      {
        unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK',
        quantity: 666,
      },
    ],
    output_index: 1,
    collateral: false,
    data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    address:
      'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
    amount_lovelace: '104725522',
    amount: [
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.',
        quantity: 4,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA',
        quantity: 40000,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin',
        quantity: 75,
      },
      {
        unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK',
        quantity: 334,
      },
      {
        unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.',
        quantity: 26,
      },
    ],
    output_index: 2,
    collateral: false,
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_tx_utxo_regular_testnet_1 = {
  hash: '7162f3d9a1edc1a20c0a38c2acb854e221329ca76f7666ee3c82c026b5dadfbf',
  inputs: [
    {
      address:
        'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
      amount: [{ unit: 'lovelace', quantity: '100000000' }],
      tx_hash: '84cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
      output_index: 1,
      collateral: false,
      data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
      inline_datum: null,
      reference_script_hash: null,
      reference: true,
    },
    {
      address:
        'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
      amount: [
        { unit: 'lovelace', quantity: '6910779' },
        { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.', quantity: '4' },
        { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA', quantity: '40000' },
        {
          unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin',
          quantity: '75',
        },
        {
          unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK',
          quantity: '1000',
        },
        { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.', quantity: '26' },
      ],
      tx_hash: '44cff993dc9d19b4d95bb52a595420adeqd6c68ab6b5ace68a84ba08d51a2d',
      output_index: 0,
      collateral: false,
      data_hash: null,
      inline_datum: null,
      reference_script_hash: null,
      reference: false,
    },
  ],
  outputs: [
    {
      address:
        'addr_test1qzddgtdqxmsvn0rqp0ltdfpddudvf76qs3esyn3zqf44drkprmcgc38nvy9hu4k5dcyxhyqcdsfwnf50q5sm03x89e9slwzp5f',
      amount: [
        { unit: 'lovelace', quantity: '2000000' },
        { unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK', quantity: '666' },
      ],
      output_index: 1,
      collateral: false,
      data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
      inline_datum: null,
      reference_script_hash: null,
    },
    {
      address:
        'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
      amount: [
        { unit: 'lovelace', quantity: '104725522' },
        { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.', quantity: '4' },
        { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ADA', quantity: '40000' },
        {
          unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.ATADAcoin',
          quantity: '75',
        },
        { unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.MAREK', quantity: '334' },
        { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.', quantity: '26' },
      ],
      output_index: 2,
      collateral: false,
      data_hash: null,
      inline_datum: null,
      reference_script_hash: null,
    },
  ],
};

const query_txs_stakes_regular_1 = [
  {
    cert_index: 0,
    address: 'stake1uysf384wcjwh08yahth387279jfy7630kc6nt62glv9c40qlq8lax',
    registration: true,
  },
];

const response_txs_stakes_regular_1 = [
  {
    cert_index: 0,
    address: 'stake1uysf384wcjwh08yahth387279jfy7630kc6nt62glv9c40qlq8lax',
    registration: true,
  },
];

const query_txs_delegations_regular_1 = [
  {
    index: 1,
    cert_index: 1,
    address: 'stake1u8fgktsdt70af7wfe8ad5thrvmzaps9auj6q0shrx8nx2ecqxacd6',
    pool_id: 'pool1yet04d4ykpp7me8uc2jx2glxrx88kt9uhmv6jeh7xkmtu5zucna',
    active_epoch: 237,
  },
];
const response_txs_delegations_regular_1 = [
  {
    index: 1,
    cert_index: 1,
    address: 'stake1u8fgktsdt70af7wfe8ad5thrvmzaps9auj6q0shrx8nx2ecqxacd6',
    pool_id: 'pool1yet04d4ykpp7me8uc2jx2glxrx88kt9uhmv6jeh7xkmtu5zucna',
    active_epoch: 237,
  },
];
const query_txs_delegations_huge_1 = [
  {
    index: 0,
    cert_index: 0,
    address: 'stake1u9d4jfeyq884j63hvkgthjnvfan5uhr3f57x6cp7ayd0eusd9yqsj',
    pool_id: 'pool140x77a7cz2j689lmxf836qpjtc3y83rka28v6gpswxdw2mag62e',
    active_epoch: 214,
  },
  {
    index: 1,
    cert_index: 1,
    address: 'stake1u9l0eqplj8ex2tszrfk47n96y5vvcpn5tl28wv7ssg96vack73uga',
    pool_id: 'pool1c89d4drtwn0048mekkdkzllz559ahnntxelyw2mppxnmc36hjlx',
    active_epoch: 214,
  },
  {
    index: 2,
    cert_index: 2,
    address: 'stake1u9pm68exuwq8lc65z33h6fgtksm6ctzjnedy5977e5dz6ycg8kg7u',
    pool_id: 'pool1jhzf2mm6zdlhl6w89uhgx8nq8p6ykcc86qq58vjy0ejyxrrksfj',
    active_epoch: 214,
  },
  {
    index: 3,
    cert_index: 3,
    address: 'stake1uy34jprky93r76zgt2w0lzlf8ny5a7ekak2lyxrnu75tmfcvsu3xm',
    pool_id: 'pool1qnrqc7zpwye2r9wtkayh2dryvfqs7unp99f2039duljrsaffq5c',
    active_epoch: 214,
  },
  {
    index: 4,
    cert_index: 4,
    address: 'stake1u8h74qsmsc4c9gwkaknf7sfszkdhchpwdc6ptsxp4nyyx7g3t03kr',
    pool_id: 'pool1vx9tzlkgafernd9vpjpxkenutx2gncj4yn88fpq69823qlwcqrt',
    active_epoch: 214,
  },
];

const response_txs_delegations_huge_1 = [
  {
    index: 0,
    cert_index: 0,
    address: 'stake1u9d4jfeyq884j63hvkgthjnvfan5uhr3f57x6cp7ayd0eusd9yqsj',
    pool_id: 'pool140x77a7cz2j689lmxf836qpjtc3y83rka28v6gpswxdw2mag62e',
    active_epoch: 214,
  },
  {
    index: 1,
    cert_index: 1,
    address: 'stake1u9l0eqplj8ex2tszrfk47n96y5vvcpn5tl28wv7ssg96vack73uga',
    pool_id: 'pool1c89d4drtwn0048mekkdkzllz559ahnntxelyw2mppxnmc36hjlx',
    active_epoch: 214,
  },
  {
    index: 2,
    cert_index: 2,
    address: 'stake1u9pm68exuwq8lc65z33h6fgtksm6ctzjnedy5977e5dz6ycg8kg7u',
    pool_id: 'pool1jhzf2mm6zdlhl6w89uhgx8nq8p6ykcc86qq58vjy0ejyxrrksfj',
    active_epoch: 214,
  },
  {
    index: 3,
    cert_index: 3,
    address: 'stake1uy34jprky93r76zgt2w0lzlf8ny5a7ekak2lyxrnu75tmfcvsu3xm',
    pool_id: 'pool1qnrqc7zpwye2r9wtkayh2dryvfqs7unp99f2039duljrsaffq5c',
    active_epoch: 214,
  },
  {
    index: 4,
    cert_index: 4,
    address: 'stake1u8h74qsmsc4c9gwkaknf7sfszkdhchpwdc6ptsxp4nyyx7g3t03kr',
    pool_id: 'pool1vx9tzlkgafernd9vpjpxkenutx2gncj4yn88fpq69823qlwcqrt',
    active_epoch: 214,
  },
];

const query_txs_withdrawal_regular_1 = [
  {
    address: 'stake1uxh4vjraxawud3wrfltt44pyuph6e0smdaywupjewt3vzsch57e7a',
    amount: '104053692517',
  },
];

const response_txs_withdrawals_regular_1 = [
  {
    address: 'stake1uxh4vjraxawud3wrfltt44pyuph6e0smdaywupjewt3vzsch57e7a',
    amount: '104053692517',
  },
];

const query_txs_mir_regular_1 = [
  {
    pot: 'treasury',
    cert_index: 1,
    address: 'stake1uypy44wqjznc5w9ns9gsguz4ta83jekrg9d0wupa7j3zsacwvq5ex',
    amount: '2000000000000',
  },
];

const response_txs_mir_regular_1 = [
  {
    pot: 'treasury',
    cert_index: 1,
    address: 'stake1uypy44wqjznc5w9ns9gsguz4ta83jekrg9d0wupa7j3zsacwvq5ex',
    amount: '2000000000000',
  },
];

const query_txs_pool_updates_regular = [
  {
    pu_id: '7329',
    cert_index: 0,
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    reward_account_raw: 'e1eccc266eb89d2e344fb60c7ca9a2cfe6a3e7e28b899b713f96f0b6ab',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata_url: 'https://stakevandekeizer.nl/pool_Metadata.json',
    metadata_hash: '9d729a7e1e38b312ca5c5a544f993e77762e2b0d35fdf615eb42ce376ded10ef',
    ticker: 'SVDK',
    metadata_text: {
      name: 'VanDeKeizer',
      description: 'De stake van de Keizer pool',
      ticker: 'SVDK',
      homepage: 'https://stakevandekeizer.nl',
    },
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    hash: 'f8deee4c3ed093969ade03079cd88c634759be0adee88ad0f3f76c36',
    active_epoch: 233,
  },
];

const query_txs_pool_updates_missing_bech32 = [
  {
    pu_id: '7329',
    cert_index: 0,
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: null,
    reward_account_raw: 'e1eccc266eb89d2e344fb60c7ca9a2cfe6a3e7e28b899b713f96f0b6ab',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata_url: 'https://stakevandekeizer.nl/pool_Metadata.json',
    metadata_hash: '9d729a7e1e38b312ca5c5a544f993e77762e2b0d35fdf615eb42ce376ded10ef',
    ticker: 'SVDK',
    metadata_text: {
      name: 'VanDeKeizer',
      description: 'De stake van de Keizer pool',
      ticker: 'SVDK',
      homepage: 'https://stakevandekeizer.nl',
    },
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    hash: 'f8deee4c3ed093969ade03079cd88c634759be0adee88ad0f3f76c36',
    active_epoch: 233,
  },
];

const query_txs_pool_updates_regular_relays = [
  { ipv4: '136.144.205.135', ipv6: null, dns: null, dns_srv: null, port: 3001 },
];

const response_txs_pool_updates_regular = [
  {
    cert_index: 0,
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata: {
      url: 'https://stakevandekeizer.nl/pool_Metadata.json',
      hash: '9d729a7e1e38b312ca5c5a544f993e77762e2b0d35fdf615eb42ce376ded10ef',
      ticker: 'SVDK',
      name: 'VanDeKeizer',
      description: 'De stake van de Keizer pool',
      homepage: 'https://stakevandekeizer.nl',
    },
    relays: [{ ipv4: '136.144.205.135', ipv6: null, dns: null, dns_srv: null, port: 3001 }],
    active_epoch: 233,
  },
];

const query_txs_pool_updates_nonregular_testnet = [
  {
    cert_index: 0,
    pu_id: '10',
    vrf_key: '7d952e0707ecfccbc9ee490246b37e57e2ab5d83f4f075595f39805682db30b3',
    pledge: '450000000',
    margin_cost: 0.5,
    fixed_cost: '340000000',
    reward_account: 'stake_test1up83vpk6yyl746xa6s620g6x0jjg7fw74s2weaad4klrywqg2nh3w',
    reward_account_raw: 'e04f1606da213feae8ddd434a7a3467ca48f25deac14ecf7adadbe3238',
    owners: ['stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27'],
    metadata_url: 'http://www.vrits.nl/poolMetaData.json',
    metadata_hash: '0fcc240b6849e2d9cb0adefdb6d3a9449d58da138320a0fa6d8da8a9b8736160',
    ticker: null,
    metadata_text: null,
    pool_id: 'pool16kc6ck4clmhg2aykwhkymnz2ypk54yuvk0txt3p6mrw05hrsj3a',
    hash: 'd5b1ac5ab8feee85749675ec4dcc4a206d4a938cb3d665c43ad8dcfa',
    active_epoch: 77,
  },
];

const query_txs_pool_updates_missing_bech32_testnet = [
  {
    cert_index: 0,
    pu_id: '10',
    vrf_key: '7d952e0707ecfccbc9ee490246b37e57e2ab5d83f4f075595f39805682db30b3',
    pledge: '450000000',
    margin_cost: 0.5,
    fixed_cost: '340000000',
    reward_account: null,
    reward_account_raw: 'e04f1606da213feae8ddd434a7a3467ca48f25deac14ecf7adadbe3238',
    owners: ['stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27'],
    metadata_url: 'http://www.vrits.nl/poolMetaData.json',
    metadata_hash: '0fcc240b6849e2d9cb0adefdb6d3a9449d58da138320a0fa6d8da8a9b8736160',
    ticker: null,
    metadata_text: null,
    pool_id: 'pool16kc6ck4clmhg2aykwhkymnz2ypk54yuvk0txt3p6mrw05hrsj3a',
    hash: 'd5b1ac5ab8feee85749675ec4dcc4a206d4a938cb3d665c43ad8dcfa',
    active_epoch: 77,
  },
];

const query_txs_pool_updates_nonregular_testnet_relays = [
  {
    ipv4: '95.179.151.144',
    ipv6: null,
    dns: null,
    dns_srv: null,
    port: 3001,
  },
];

const response_txs_pool_updates_nonregular_testnet = [
  {
    cert_index: 0,
    pool_id: 'pool16kc6ck4clmhg2aykwhkymnz2ypk54yuvk0txt3p6mrw05hrsj3a',
    vrf_key: '7d952e0707ecfccbc9ee490246b37e57e2ab5d83f4f075595f39805682db30b3',
    pledge: '450000000',
    margin_cost: 0.5,
    fixed_cost: '340000000',
    reward_account: 'stake_test1up83vpk6yyl746xa6s620g6x0jjg7fw74s2weaad4klrywqg2nh3w',
    owners: ['stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27'],
    metadata: {
      url: 'http://www.vrits.nl/poolMetaData.json',
      hash: '0fcc240b6849e2d9cb0adefdb6d3a9449d58da138320a0fa6d8da8a9b8736160',
      ticker: null,
      name: null,
      description: null,
      homepage: null,
    },
    relays: [{ ipv4: '95.179.151.144', ipv6: null, dns: null, dns_srv: null, port: 3001 }],
    active_epoch: 77,
  },
];

const query_txs_pool_retires_regular_1 = [
  {
    cert_index: 0,
    pool_id: 'pool1e8m354jtgel03n7ex86cf4qj7tqlhjkh80z6axexwph6zz0m6l5',
    retiring_epoch: 222,
  },
];

const response_txs_pool_retires_regular_1 = [
  {
    cert_index: 0,
    pool_id: 'pool1e8m354jtgel03n7ex86cf4qj7tqlhjkh80z6axexwph6zz0m6l5',
    retiring_epoch: 222,
  },
];

const query_txs_pool_updates_minimal = [
  {
    pu_id: '7329',
    cert_index: 0,
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata_url: null,
    metadata_hash: null,
    ticker: null,
    metadata_text: null,
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    hash: 'f8deee4c3ed093969ade03079cd88c634759be0adee88ad0f3f76c36',
    active_epoch: 233,
  },
];

const query_txs_pool_updates_minimal_relays = [
  { ipv4: '136.144.205.135', ipv6: null, dns: null, dns_srv: null, port: 3001 },
];

const response_txs_pool_updates_minimal = [
  {
    cert_index: 0,
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata: {
      url: null,
      hash: null,
      ticker: null,
      name: null,
      description: null,
      homepage: null,
    },
    relays: [{ ipv4: '136.144.205.135', ipv6: null, dns: null, dns_srv: null, port: 3001 }],
    active_epoch: 233,
  },
];

const query_txs_pool_updates_minimal_ultra = [
  {
    pu_id: '7329',
    cert_index: 0,
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata_url: null,
    metadata_hash: null,
    ticker: null,
    metadata_text: null,
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    hash: 'f8deee4c3ed093969ade03079cd88c634759be0adee88ad0f3f76c36',
    active_epoch: 233,
  },
];

const response_txs_pool_updates_minimal_ultra = [
  {
    cert_index: 0,
    pool_id: 'pool1lr0wunp76zfedxk7qvreekyvvdr4n0s2mm5g458n7akrvmdnfwl',
    vrf_key: 'a4d6afbf0904d9a378f5c85df1d2badf8738e0a3a645bd36b37e90ef91e2c454',
    pledge: '250000000000',
    margin_cost: 0,
    fixed_cost: '340000000',
    reward_account: 'stake1u8kvcfnwhzwjudz0kcx8e2dzeln28elz3wyekufljmctd2ce0jh2q',
    owners: ['stake1u9580h9cv6zck2jfgy63exxdvuszyc4lmq4qzm9m4grnjfcprdah4'],
    metadata: {
      url: null,
      hash: null,
      ticker: null,
      name: null,
      description: null,
      homepage: null,
    },
    relays: [],
    active_epoch: 233,
  },
];

const query_txs_pool_retires_huge_1 = [
  {
    cert_index: 0,
    pool_id: 'pool1uqehpxy4wst2k5u640wdt9tgmqdd26l0dahgxf3ln70js830xv2',
    retiring_epoch: 237,
  },
  {
    cert_index: 0,
    pool_id: 'pool1x8ujs98g90dchw8kvu7u8jzntdh656u376fv7rv62e84jmznsr9',
    retiring_epoch: 237,
  },
  {
    cert_index: 0,
    pool_id: 'pool1welc4vthqtkvcf2e4adza90np6p7v7c4dmkmf567w3xr7ffqd72',
    retiring_epoch: 237,
  },
];

const response_txs_pool_retires_huge_1 = [
  {
    cert_index: 0,
    pool_id: 'pool1uqehpxy4wst2k5u640wdt9tgmqdd26l0dahgxf3ln70js830xv2',
    retiring_epoch: 237,
  },
  {
    cert_index: 0,
    pool_id: 'pool1x8ujs98g90dchw8kvu7u8jzntdh656u376fv7rv62e84jmznsr9',
    retiring_epoch: 237,
  },
  {
    cert_index: 0,
    pool_id: 'pool1welc4vthqtkvcf2e4adza90np6p7v7c4dmkmf567w3xr7ffqd72',
    retiring_epoch: 237,
  },
];

// /tx/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata

const query_txs_metadata_regular_1 = [
  {
    label: '1968',
    json_metadata: {
      TSLA: [{ value: '428.82', source: 'investorsExchange' }],
      ADAEUR: [{ value: '0.090115', source: 'coinGecko' }],
      ADAUSD: [
        { value: '0.107006', source: 'coinGecko' },
        { value: '0.10698550057606343', source: 'ergoOracles' },
      ],
      ERGUSD: [
        { value: '0.400468', source: 'coinGecko' },
        { value: '0.4137090000035637', source: 'ergoOracles' },
      ],
    },
  },
];

const response_txs_metadata_regular_1 = [
  {
    label: '1968',
    json_metadata: {
      TSLA: [{ value: '428.82', source: 'investorsExchange' }],
      ADAEUR: [{ value: '0.090115', source: 'coinGecko' }],
      ADAUSD: [
        { value: '0.107006', source: 'coinGecko' },
        { value: '0.10698550057606343', source: 'ergoOracles' },
      ],
      ERGUSD: [
        { value: '0.400468', source: 'coinGecko' },
        { value: '0.4137090000035637', source: 'ergoOracles' },
      ],
    },
  },
];

// /tx/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata/cbor

const query_txs_metadata_cbor_regular_1 = [
  {
    label: '1968',
    cbor_metadata:
      '\\xa11907b0a46641444145555281a266736f7572636569636f696e4765636b6f6576616c756568302e3039303131356641444155534482a266736f7572636569636f696e4765636b6f6576616c756568302e313037303036a266736f757263656b6572676f4f7261636c65736576616c756573302e31303639383535303035373630363334336645524755534482a266736f7572636569636f696e4765636b6f6576616c756568302e343030343638a266736f757263656b6572676f4f7261636c65736576616c756572302e343133373039303030303033353633376454534c4181a266736f7572636571696e766573746f727345786368616e67656576616c7565663432382e3832',
    metadata:
      'a11907b0a46641444145555281a266736f7572636569636f696e4765636b6f6576616c756568302e3039303131356641444155534482a266736f7572636569636f696e4765636b6f6576616c756568302e313037303036a266736f757263656b6572676f4f7261636c65736576616c756573302e31303639383535303035373630363334336645524755534482a266736f7572636569636f696e4765636b6f6576616c756568302e343030343638a266736f757263656b6572676f4f7261636c65736576616c756572302e343133373039303030303033353633376454534c4181a266736f7572636571696e766573746f727345786368616e67656576616c7565663432382e3832',
  },
];

const response_txs_metadata_cbor_regular_1 = [
  {
    label: '1968',
    cbor_metadata:
      '\\xa11907b0a46641444145555281a266736f7572636569636f696e4765636b6f6576616c756568302e3039303131356641444155534482a266736f7572636569636f696e4765636b6f6576616c756568302e313037303036a266736f757263656b6572676f4f7261636c65736576616c756573302e31303639383535303035373630363334336645524755534482a266736f7572636569636f696e4765636b6f6576616c756568302e343030343638a266736f757263656b6572676f4f7261636c65736576616c756572302e343133373039303030303033353633376454534c4181a266736f7572636571696e766573746f727345786368616e67656576616c7565663432382e3832',
    metadata:
      'a11907b0a46641444145555281a266736f7572636569636f696e4765636b6f6576616c756568302e3039303131356641444155534482a266736f7572636569636f696e4765636b6f6576616c756568302e313037303036a266736f757263656b6572676f4f7261636c65736576616c756573302e31303639383535303035373630363334336645524755534482a266736f7572636569636f696e4765636b6f6576616c756568302e343030343638a266736f757263656b6572676f4f7261636c65736576616c756572302e343133373039303030303033353633376454534c4181a266736f7572636571696e766573746f727345786368616e67656576616c7565663432382e3832',
  },
];

// /tx/7abdd01a3c30df34f93cc5be1102a8569118e2dad477566327c0aa6bd5c28a3f/metadata

const query_txs_metadata_incorrect_usage_1 = [
  { label: '0', json_metadata: 'Pizza Challenge' },
  {
    label: '1',
    json_metadata: {
      'ALTZ Stake pool': {
        Ticker: 'ALTZ',
        'ALTZ Id': '46ebbc0d27d9169cae12d12dcf8f6cacbcf27937c67ae4350abbcaba',
      },
    },
  },
  { label: '2', json_metadata: 'Madrid, Spain' },
  {
    label: '3',
    json_metadata: {
      'Payment Tx': {
        Id: '8a2dd126f2cabbd224d06591eafa83cc07ba59a452276401c6e7da5ef1f0f453',
        Date: '2020-12-19 12:29:26 UTC',
        Block: 5097333,
        Epoch: 236,
        'Amount (ADA)': 455,
      },
    },
  },
  {
    label: '4',
    json_metadata: {
      Event: {
        At: 'LA TABERNA DE MI ABUELO',
        Address: 'Paseo de la Esperanza, 28005-Madrid. Spain',
        Consumption: [
          '2 pizzas',
          '5 beers',
          '1 red wine',
          '1 diet coke',
          '2 spanish omelets',
          'special dried beef meat',
          'many laughs free',
        ],
      },
    },
  },
  {
    label: '5',
    json_metadata: {
      'Event description': {
        'Description-line1': 'December 19th, 2020 at noon and for lunch',
        'Description-line2': 'The ALTZ Pool team headed to one of the oldest taverns of Madrid',
      },
    },
  },
  {
    label: '6',
    json_metadata: {
      Links: {
        'e-mail': 'contact@altzpool.com.',
        'ALTZ twitter': 'https://twitter.com/AltzPool',
        'ALTZ website': 'https://altzpool.com',
        'ALTZ telegram': 'https://t.me/ALTZ1',
        'Tavern twitter': 'https://twitter.com/tabernabuelo',
        'Tavern Facebook': 'https://www.facebook.com/latabernademiabuelo',
        'Images of the Event': 'https://altzpool.com/8a2dd126f2cabbd224d06591eafa',
      },
    },
  },
  { label: '7', json_metadata: 'Special thanks to @Cardano Pizza' },
  { label: '8', json_metadata: '#WeAreCardano #GoingForNumber1 #DrivingAdoption #Cardano $Ada' },
];

const response_txs_metadata_incorrect_usage_1 = [
  { label: '0', json_metadata: 'Pizza Challenge' },
  {
    label: '1',
    json_metadata: {
      'ALTZ Stake pool': {
        Ticker: 'ALTZ',
        'ALTZ Id': '46ebbc0d27d9169cae12d12dcf8f6cacbcf27937c67ae4350abbcaba',
      },
    },
  },
  { label: '2', json_metadata: 'Madrid, Spain' },
  {
    label: '3',
    json_metadata: {
      'Payment Tx': {
        Id: '8a2dd126f2cabbd224d06591eafa83cc07ba59a452276401c6e7da5ef1f0f453',
        Date: '2020-12-19 12:29:26 UTC',
        Block: 5097333,
        Epoch: 236,
        'Amount (ADA)': 455,
      },
    },
  },
  {
    label: '4',
    json_metadata: {
      Event: {
        At: 'LA TABERNA DE MI ABUELO',
        Address: 'Paseo de la Esperanza, 28005-Madrid. Spain',
        Consumption: [
          '2 pizzas',
          '5 beers',
          '1 red wine',
          '1 diet coke',
          '2 spanish omelets',
          'special dried beef meat',
          'many laughs free',
        ],
      },
    },
  },
  {
    label: '5',
    json_metadata: {
      'Event description': {
        'Description-line1': 'December 19th, 2020 at noon and for lunch',
        'Description-line2': 'The ALTZ Pool team headed to one of the oldest taverns of Madrid',
      },
    },
  },
  {
    label: '6',
    json_metadata: {
      Links: {
        'e-mail': 'contact@altzpool.com.',
        'ALTZ twitter': 'https://twitter.com/AltzPool',
        'ALTZ website': 'https://altzpool.com',
        'ALTZ telegram': 'https://t.me/ALTZ1',
        'Tavern twitter': 'https://twitter.com/tabernabuelo',
        'Tavern Facebook': 'https://www.facebook.com/latabernademiabuelo',
        'Images of the Event': 'https://altzpool.com/8a2dd126f2cabbd224d06591eafa',
      },
    },
  },
  { label: '7', json_metadata: 'Special thanks to @Cardano Pizza' },
  { label: '8', json_metadata: '#WeAreCardano #GoingForNumber1 #DrivingAdoption #Cardano $Ada' },
];

// /tx/7abdd01a3c30df34f93cc5be1102a8569118e2dad477566327c0aa6bd5c28a3f/metadata/cbor

const query_txs_metadata_cbor_incorrect_usage_1 = [
  {
    label: '0',
    cbor_metadata: '\\xa1006f50697a7a61204368616c6c656e6765',
    metadata: 'a1006f50697a7a61204368616c6c656e6765',
  },
  {
    label: '1',
    cbor_metadata:
      '\\xa101a16f414c545a205374616b6520706f6f6ca267414c545a20496478383436656262633064323764393136396361653132643132646366386636636163626366323739333763363761653433353061626263616261665469636b657264414c545a',
    metadata:
      'a101a16f414c545a205374616b6520706f6f6ca267414c545a20496478383436656262633064323764393136396361653132643132646366386636636163626366323739333763363761653433353061626263616261665469636b657264414c545a',
  },
  {
    label: '2',
    cbor_metadata: '\\xa1026d4d61647269642c20537061696e',
    metadata: 'a1026d4d61647269642c20537061696e',
  },
  {
    label: '3',
    cbor_metadata:
      '\\xa103a16a5061796d656e74205478a5624964784038613264643132366632636162626432323464303635393165616661383363633037626135396134353232373634303163366537646135656631663066343533644461746577323032302d31322d31392031323a32393a3236205554436545706f636818ec65426c6f636b1a004dc7756c416d6f756e742028414441291901c7',
    metadata:
      'a103a16a5061796d656e74205478a5624964784038613264643132366632636162626432323464303635393165616661383363633037626135396134353232373634303163366537646135656631663066343533644461746577323032302d31322d31392031323a32393a3236205554436545706f636818ec65426c6f636b1a004dc7756c416d6f756e742028414441291901c7',
  },
];

const response_txs_metadata_cbor_incorrect_usage_1 = [
  {
    label: '0',
    cbor_metadata: '\\xa1006f50697a7a61204368616c6c656e6765',
    metadata: 'a1006f50697a7a61204368616c6c656e6765',
  },
  {
    label: '1',
    cbor_metadata:
      '\\xa101a16f414c545a205374616b6520706f6f6ca267414c545a20496478383436656262633064323764393136396361653132643132646366386636636163626366323739333763363761653433353061626263616261665469636b657264414c545a',
    metadata:
      'a101a16f414c545a205374616b6520706f6f6ca267414c545a20496478383436656262633064323764393136396361653132643132646366386636636163626366323739333763363761653433353061626263616261665469636b657264414c545a',
  },
  {
    label: '2',
    cbor_metadata: '\\xa1026d4d61647269642c20537061696e',
    metadata: 'a1026d4d61647269642c20537061696e',
  },
  {
    label: '3',
    cbor_metadata:
      '\\xa103a16a5061796d656e74205478a5624964784038613264643132366632636162626432323464303635393165616661383363633037626135396134353232373634303163366537646135656631663066343533644461746577323032302d31322d31392031323a32393a3236205554436545706f636818ec65426c6f636b1a004dc7756c416d6f756e742028414441291901c7',
    metadata:
      'a103a16a5061796d656e74205478a5624964784038613264643132366632636162626432323464303635393165616661383363633037626135396134353232373634303163366537646135656631663066343533644461746577323032302d31322d31392031323a32393a3236205554436545706f636818ec65426c6f636b1a004dc7756c416d6f756e742028414441291901c7',
  },
];

const query_txs_redeemers = [
  {
    tx_index: 0,
    purpose: 'spend',
    unit_mem: '2000',
    unit_steps: '27800000',
    fee: '278010',
    script_hash: 'fake',
    datum_hash: 'fakeToo',
    redeemer_data_hash: 'fake2',
  },
];

const response_txs_redeemers = [
  {
    tx_index: 0,
    purpose: 'spend',
    unit_mem: '2000',
    unit_steps: '27800000',
    fee: '278010',
    script_hash: 'fake',
    datum_hash: 'fakeToo',
    redeemer_data_hash: 'fake2',
  },
];

const query_txs_required_signers = [
  { hash: 'd52e11f3e48436dd42dbec6d88c239732e503b8b7a32af58e5f87625' },
  { hash: '41b32682c413535dbca5178f92f3cee5dede31b995400b8c371e2469' },
  { hash: 'd52e11f3e48436dd42dbec6d88c239732e503b8b7a32af58e5f87625' },
  { hash: '666414964a05b01cef36427b8a0fb0f621806c43e66e7a4d3cca3bfb' },
];

const response_txs_required_signers = [
  'd52e11f3e48436dd42dbec6d88c239732e503b8b7a32af58e5f87625',
  '41b32682c413535dbca5178f92f3cee5dede31b995400b8c371e2469',
  'd52e11f3e48436dd42dbec6d88c239732e503b8b7a32af58e5f87625',
  '666414964a05b01cef36427b8a0fb0f621806c43e66e7a4d3cca3bfb',
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
    name: 'respond with success and data on /txs/:hash',
    endpoint: '/txs/d2e9e7f390f626ebfe47145686d6efc6ab4df81feb166c86f3c367a38461d943',
    sqlQueryMock: {
      rows: [query_tx_regular_1],
    },
    response: response_tx_regular_1,
  },
  {
    name: 'TESTNET: respond with success and data on /txs/:hash',
    endpoint: '/txs/80e46d2475b921a9d8a9f2c35cc351ac14222d95b05099626bba07b79989b7b6',
    sqlQueryMock: {
      rows: [query_tx_regular_testnet_1],
    },
    network: 'testnet',
    response: response_tx_regular_testnet_1,
  },
  {
    name: 'respond with success and data on /txs/:hash',
    endpoint: '/txs/5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce',
    sqlQueryMock: {
      rows: [query_tx_pool_update_1],
    },
    response: response_tx_pool_update_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/utxos',
    endpoint: '/txs/5aadc251b0039e115d3f0e9b3f00e3e2e9fdaf46e68b0b1cf39dcad2f182a6ce/utxos',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_tx_utxo_regular_1_inputs,
    },
    sqlQueryMock3: {
      rows: query_tx_utxo_regular_1_outputs,
    },
    response: response_tx_utxo_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/utxos',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/utxos',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    sqlQueryMock3: {
      rows: [],
    },
    response: {
      hash: '6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b',
      inputs: [],
      outputs: [],
    },
  },
  {
    name: 'TESTNET: respond with success and data on /txs/:hash/utxos',
    endpoint: '/txs/7162f3d9a1edc1a20c0a38c2acb854e221329ca76f7666ee3c82c026b5dadfbf/utxos',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_tx_utxo_regular_testnet_1_inputs,
    },
    sqlQueryMock3: {
      rows: query_tx_utxo_regular_testnet_1_outputs,
    },
    network: 'testnet',
    response: response_tx_utxo_regular_testnet_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/stakes',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/stakes',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_stakes_regular_1,
    },
    response: response_txs_stakes_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/stakes',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/stakes',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/delegation',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_delegations_regular_1,
    },
    response: response_txs_delegations_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/delegation',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_delegations_huge_1,
    },
    response: response_txs_delegations_huge_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/delegation',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/delegations',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/withdrawal',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/withdrawals',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_withdrawal_regular_1,
    },
    response: response_txs_withdrawals_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/withdrawal',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/withdrawals',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/mirs',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/mirs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_mir_regular_1,
    },
    response: response_txs_mir_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/mirs',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/mirs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_regular,
    },
    sqlQueryMock3: {
      rows: query_txs_pool_updates_regular_relays,
    },
    response: response_txs_pool_updates_regular,
  },
  {
    name: 'respond with success and data on/txs/:hash/pool_updates',
    endpoint: '/txs/cd05b2429b0fb340f4fbc1480ad3aa7a68f30f5107e51cf69ec07c797c709ab6/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_minimal,
    },
    sqlQueryMock3: {
      rows: query_txs_pool_updates_minimal_relays,
    },
    response: response_txs_pool_updates_minimal,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/cd05b2429b0fb340f4fbc1480ad3aa7a68f30f5107e51cf69ec07c797c709ab6/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_minimal_ultra,
    },
    sqlQueryMock3: {
      rows: [],
    },
    response: response_txs_pool_updates_minimal_ultra,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/cd05b2429b0fb340f4fbc1480ad3aa7a68f30f5107e51cf69ec07c797c709ab6/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    sqlQueryMock3: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_missing_bech32,
    },
    sqlQueryMock3: {
      rows: query_txs_pool_updates_regular_relays,
    },
    response: response_txs_pool_updates_regular,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/e234443a0f5a5fc0aebf9f6923d4860c912407d973fe1cfc26c3bcfc55d67211/pool_updates', //testnet
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_nonregular_testnet,
    },
    sqlQueryMock3: {
      rows: query_txs_pool_updates_nonregular_testnet_relays,
    },
    network: 'testnet',
    response: response_txs_pool_updates_nonregular_testnet,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_updates',
    endpoint: '/txs/e234443a0f5a5fc0aebf9f6923d4860c912407d973fe1cfc26c3bcfc55d67211/pool_updates', //testnet
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_missing_bech32_testnet,
    },
    sqlQueryMock3: {
      rows: query_txs_pool_updates_nonregular_testnet_relays,
    },
    network: 'testnet',
    response: response_txs_pool_updates_nonregular_testnet,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_retires',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/pool_retires',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_retires_regular_1,
    },
    response: response_txs_pool_retires_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_retires',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/pool_retires',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_retires_huge_1,
    },
    response: response_txs_pool_retires_huge_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/pool_retires',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/pool_retires',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata',
    endpoint: '/txs/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_metadata_regular_1,
    },
    response: response_txs_metadata_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata',
    endpoint: '/txs/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata/cbor',
    endpoint: '/txs/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata/cbor',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_metadata_cbor_regular_1,
    },
    response: response_txs_metadata_cbor_regular_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata/cbor',
    endpoint: '/txs/473a6f5ef23c8f9ea10e6d17372ee90031f44273fb2be6700673269bdd04eb19/metadata/cbor',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/metadata',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_metadata_incorrect_usage_1,
    },
    response: response_txs_metadata_incorrect_usage_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/metadata/cbor',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/metadata/cbor',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_metadata_cbor_incorrect_usage_1,
    },
    response: response_txs_metadata_cbor_incorrect_usage_1,
  },
  {
    name: 'respond with success and data on /txs/:hash/redeemers',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/redeemers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_redeemers,
    },
    response: response_txs_redeemers,
  },
  {
    name: 'respond with success and data on /txs/:hash/redeemers',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/redeemers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /txs/:hash/required_signers',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/required_signers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_required_signers,
    },
    response: response_txs_required_signers,
  },
  {
    name: 'respond with success and data on /txs/:hash/required_signers',
    endpoint: '/txs/6e6644e0f8aeec3437bec536408fc007a6147d94098f2dbaeb6ad80d0508631b/required_signers',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  /*
      404s
  */

  {
    name: 'respond with 404 and empty data on /txs/:hash',
    endpoint: '/txs/stonks_tx',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/utxo',
    endpoint: '/txs/stonks_tx/utxos',
    sqlQueryMock: {
      rows: [],
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/stakes',
    endpoint: '/txs/stonks_tx/stakes',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/delegations',
    endpoint: '/txs/stonks_tx/delegations',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/withdrawals',
    endpoint: '/txs/stonks_tx/withdrawals',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/mirs',
    endpoint: '/txs/stonks_tx/mirs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/pool_updates',
    endpoint: '/txs/stonks_tx/pool_updates',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/pool_retires',
    endpoint: '/txs/stonks_tx/pool_retires',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/metadata',
    endpoint: '/txs/stonks_tx/metadata',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/metadata/cbor',
    endpoint: '/txs/stonks_tx/metadata/cbor',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/redeemers',
    endpoint: '/txs/stonks_tx/redeemers',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /txs/:hash/required_signers',
    endpoint: '/txs/stonks_tx/required_signers',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },

  /*
    500s
  */

  {
    name: 'respond with 500 and null on /txs/:hash',
    endpoint: '/txs/stonks_tx',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/utxo',
    endpoint: '/txs/stonks_tx/utxos',
    sqlQueryMock: {
      rows: null,
    },
    sqlQueryMock2: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/stakes',
    endpoint: '/txs/stonks_tx/stakes',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/delegations',
    endpoint: '/txs/stonks_tx/delegations',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/withdrawals',
    endpoint: '/txs/stonks_tx/withdrawals',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/mirs',
    endpoint: '/txs/stonks_tx/mirs',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/pool_updates',
    endpoint: '/txs/stonks_tx/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_txs_pool_updates_regular,
    },
    sqlQueryMock3: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/pool_updates',
    endpoint: '/txs/stonks_tx/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/pool_updates',
    endpoint: '/txs/stonks_tx/pool_updates',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: null,
    },
    sqlQueryMock3: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/pool_update',
    endpoint: '/txs/stonks_tx/pool_updates',
    sqlQueryMock: {
      rows: null,
    },
    sqlQueryMock2: {
      rows: null,
    },
    sqlQueryMock3: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/pool_retires',
    endpoint: '/txs/stonks_tx/pool_retires',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/metadata',
    endpoint: '/txs/stonks_tx/metadata',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/metadata/cbor',
    endpoint: '/txs/stonks_tx/metadata/cbor',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/redeemers',
    endpoint: '/txs/stonks_tx/redeemers',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /txs/:hash/required_signers',
    endpoint: '/txs/stonks_tx/required_signers',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
]; //as const;
