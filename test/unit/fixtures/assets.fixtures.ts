const query_found = [{ result: 1 }];

const query_assets_regular = [
  {
    asset: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
    quantity: '1',
  },
  {
    asset: '69b30e43bc5401bb34d0b12bd06cd9b537f33065aa49df7e8652739d4c51',
    quantity: '21000000000000',
  },
  { asset: '0f099e6adb179cf8e893d6a035f352e48f4b7513f34d2d9ac91394dc', quantity: '1000000' },
];

const response_assets_regular = [
  {
    asset: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
    quantity: '1',
  },
  {
    asset: '69b30e43bc5401bb34d0b12bd06cd9b537f33065aa49df7e8652739d4c51',
    quantity: '21000000000000',
  },
  { asset: '0f099e6adb179cf8e893d6a035f352e48f4b7513f34d2d9ac91394dc', quantity: '1000000' },
];

const query_assets_asset_regular_1 = {
  asset: '416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
  policy_id: '416958a374690d4597b50428be9c060aed5217e75807310cefdf7010',
  asset_name: '62616e616e6173',
  asset_name_UTF8: 'bananas',
  quantity: '5',
  initial_mint_tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
};

const response_assets_asset_regular_1 = {
  asset: '416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
  policy_id: '416958a374690d4597b50428be9c060aed5217e75807310cefdf7010',
  asset_name: '62616e616e6173',
  fingerprint: 'asset1r09gmwpzr780ee5q2xe0j9678xmcxzf24gv5wy',
  quantity: '5',
  initial_mint_tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
};

const query_assets_asset_regular_2 = {
  asset: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  policy_id: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  asset_name: null,
  asset_name_UTF8: 'nutcoin',
  quantity: '100042',
  initial_mint_tx_hash: 'abfda1ba36b9ee541516fda311319f7bdb3e3928776c2982d2f027f3e8fa54c7',
  mint_or_burn_count: 1,
  onchain_metadata: null,
  metadata: null,
};

const response_assets_asset_regular_2 = {
  asset: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  policy_id: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
  asset_name: null,
  fingerprint: 'asset1cvmyrfrc7lpht2hcjwr9lulzyyjv27uxh3kcz0',
  quantity: '100042',
  initial_mint_tx_hash: 'abfda1ba36b9ee541516fda311319f7bdb3e3928776c2982d2f027f3e8fa54c7',
  mint_or_burn_count: 1,
  onchain_metadata: null,
  metadata: {
    decimals: null,
    description: 'The legendary Nutcoin, the first native asset minted on Cardano.',
    logo: 'fakelogo',
    name: 'nutcoin',
    ticker: 'NUT',
    url: 'https://fivebinaries.com/nutcoin',
  },
};
const query_assets_asset_from_CIP_example = {
  asset: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  policy_id: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  asset_name: null,
  asset_name_UTF8: 'SpaceBud3412',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
};

const response_assets_asset_from_CIP_example = {
  asset: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  policy_id: '7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
  asset_name: null,
  fingerprint: 'asset1rjklcrnsdzqp65wjgrg55sy9723kw09mlgvlc3',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: null,
};

const query_assets_asset_with_onchain_metadata = {
  asset: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
  asset_name: '537061636542756433343132',
  asset_name_UTF8: 'SpaceBud3412',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: {
    d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc: {
      SpaceBud183: {
        name: 'SpaceBud #183',
        type: 'Robot',
        image: ['ipfs://QmR9bYtGLv8s42CLZVuTTbGAQmpZUSNuFtJ3VkcodUsySx', 'not_stonks'],
        traits: ['Chestplate', 'Belt', 'Sword'],
        arweaveId: 'Beh3wDNA79JcyJTRUG9rbLjlB6y2dI3dfA6J9LKnUL4',
      },
      SpaceBud1463: {
        name: 'SpaceBud #1463',
        type: 'Arcane',
        image: 'ipfs://QmNTHLjmRebxCJsxXex5cCFYd21YM7omYsThSb6QoM39NF',
        traits: [
          'Camo Suit',
          'Chestplate',
          'Belt',
          'Jetpack',
          'Covered Helmet',
          'Sword',
          'Watch',
          'Flowers',
        ],
        arweaveId: 'mgYZ4VKnCYoXolp60Z-24Y2tEcUGg-YoI8jrI4-SNPY',
      },
      SpaceBud3412: {
        name: 'SpaceBud #3412',
        type: 'Bear',
        image: ['ipfs://QmPQWCUh9abUP2NQ2svMsRgcehez1VN6QGAcBCpuVQNdKp', 'stonks'],
        traits: ['Star Suit', 'Belt', 'Sword'],
        arweaveId: 'h9DQz_MVMCAbKX5FX0OJrUEaM-OgFuZ_y-4nSOVXIgk',
      },
      SpaceBud4162: {
        name: 'SpaceBud #4162',
        type: 'Frog',
        image: 'ipfs://QmTTjqLx8jDhuuGDhJJHf1JhP36X1m8PVd9Vb59U8xwTzW',
        traits: ['Star Suit', 'Chestplate', 'Belt', 'Sword', 'Harpoon'],
        arweaveId: 'bO5aCD9_oxN-p1WZKeiOESgelYBlSBsF-_C-fEmZtXY',
      },
    },
  },
};

const response_assets_asset_with_onchain_metadata = {
  asset: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
  asset_name: '537061636542756433343132',
  fingerprint: 'asset1fvqhhxjxgrlec2fanc86quyhdrrhxw0ap3x6yr',
  quantity: '5',
  initial_mint_tx_hash: 'tx_hash_not_applicable_cip_14',
  mint_or_burn_count: 1,
  metadata: null,
  onchain_metadata: {
    name: 'SpaceBud #3412',
    image: ['ipfs://QmPQWCUh9abUP2NQ2svMsRgcehez1VN6QGAcBCpuVQNdKp', 'stonks'],
    type: 'Bear',
    traits: ['Star Suit', 'Belt', 'Sword'],
    arweaveId: 'h9DQz_MVMCAbKX5FX0OJrUEaM-OgFuZ_y-4nSOVXIgk',
  },
};

const query_assets_asset_history_regular_1 = [
  {
    tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
    amount: '1000000000',
    action: 'minted',
  },
  {
    tx_hash: '66d20f0c1f4e7b56531b899905908b50d04142f9b9f9d9524fb4ce69364bf44a',
    amount: '-5',
    action: 'burned',
  },
  {
    tx_hash: '4594f243a8b3db7b46a37619415d1edffcce1c551889be51958c8ea3baf5de52',
    amount: '-999999990',
    action: 'burned',
  },
];

const response_assets_asset_history_regular_1 = [
  {
    tx_hash: 'd35828553afd8ee6d902b944d5b4c23cca32cfd646ece5005b80bf1546e0ce25',
    action: 'minted',
    amount: '1000000000',
  },
  {
    tx_hash: '66d20f0c1f4e7b56531b899905908b50d04142f9b9f9d9524fb4ce69364bf44a',
    action: 'burned',
    amount: '-5',
  },
  {
    tx_hash: '4594f243a8b3db7b46a37619415d1edffcce1c551889be51958c8ea3baf5de52',
    action: 'burned',
    amount: '-999999990',
  },
];

const query_assets_asset_txs_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
  },
];

const response_assets_asset_txs_regular_1 = [
  'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
];

const query_assets_asset_transactions_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
    tx_index: 8,
    block_height: 5406748,
    block_time: 1632556851,
  },
  {
    tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
    tx_index: 12,
    block_height: 5602653,
    block_time: 1632556851,
  },
  {
    tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
    tx_index: 3,
    block_height: 5616031,
    block_time: 1632556851,
  },
  {
    tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
    tx_index: 3,
    block_height: 5633144,
    block_time: 1632556851,
  },
  {
    tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
    tx_index: 2,
    block_height: 5640905,
    block_time: 1632556851,
  },
  {
    tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    tx_index: 27,
    block_height: 5746642,
    block_time: 1632556851,
  },
];

const response_assets_asset_transactions_regular_1 = [
  {
    tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
    tx_index: 8,
    block_height: 5406748,
    block_time: 1632556851,
  },
  {
    tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
    tx_index: 12,
    block_height: 5602653,
    block_time: 1632556851,
  },
  {
    tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
    tx_index: 3,
    block_height: 5616031,
    block_time: 1632556851,
  },
  {
    tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
    tx_index: 3,
    block_height: 5633144,
    block_time: 1632556851,
  },
  {
    tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
    tx_index: 2,
    block_height: 5640905,
    block_time: 1632556851,
  },
  {
    tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    tx_index: 27,
    block_height: 5746642,
    block_time: 1632556851,
  },
];

const query_assets_asset_addresses_regular_1 = [
  {
    address:
      'addr1qxrmuatfdt49ndqmxeq46zmu3daqcg078h26vwfe4nau8gpgtal0gcphul7kruzdrx6v4w78la7z5luz0xs375zz922sege8ks',
    quantity: '1',
  },
];

const response_assets_asset_addresses_regular_1 = [
  {
    address:
      'addr1qxrmuatfdt49ndqmxeq46zmu3daqcg078h26vwfe4nau8gpgtal0gcphul7kruzdrx6v4w78la7z5luz0xs375zz922sege8ks',
    quantity: '1',
  },
];

const query_assets_policy_policy_id_regular_1 = [
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
    quantity: '1',
  },
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
    quantity: '1',
  },
];

const response_assets_policy_policy_id_regular_1 = [
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
    quantity: '1',
  },
  {
    asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
    quantity: '1',
  },
];

const response_400_asset = {
  error: 'Bad Request',
  message: 'Invalid or malformed asset format.',
  status_code: 400,
};

const response_400_policy = {
  error: 'Bad Request',
  message: 'Invalid or malformed policy format.',
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
    name: 'respond with success and data on /assets',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: query_assets_regular,
    },
    response: response_assets_regular,
  },
  {
    name: 'respond with success and data on /assets',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
    endpoint: '/assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173',
    sqlQueryMock: {
      rows: [query_assets_asset_regular_1],
    },
    response: response_assets_asset_regular_1,
  },
  {
    name: 'respond with success and data on /assets/7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
    endpoint: '/assets/7eae28af2208be856f7a119668ae52a49b73725e326dc16579dcc373',
    sqlQueryMock: {
      rows: [query_assets_asset_from_CIP_example],
    },
    response: response_assets_asset_from_CIP_example,
  },
  {
    name: 'respond with success and data on /assets/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
    endpoint:
      '/assets/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
    sqlQueryMock: {
      rows: [query_assets_asset_with_onchain_metadata],
    },
    response: response_assets_asset_with_onchain_metadata,
  },
  {
    name: 'respond with success and data on /assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
    sqlQueryMock: {
      rows: [query_assets_asset_regular_2],
    },
    response: response_assets_asset_regular_2,
  },
  {
    name: 'respond with success and data on /assets/:asset/history',
    endpoint:
      '/assets/416958a374690d4597b50428be9c060aed5217e75807310cefdf701062616e616e6173/history',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_history_regular_1,
    },
    response: response_assets_asset_history_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_txs_regular_1,
    },
    response: response_assets_asset_txs_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/transactions',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_transactions_regular_1,
    },
    response: response_assets_asset_transactions_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/addresses',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_asset_addresses_regular_1,
    },
    response: response_assets_asset_addresses_regular_1,
  },
  {
    name: 'respond with success and data on /assets/:asset/addresses',
    endpoint:
      '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'respond with success and data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_assets_policy_policy_id_regular_1,
    },
    response: response_assets_policy_policy_id_regular_1,
  },
  {
    name: 'respond with success and data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
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
    name: 'respond with 400 and empty data on /assets/:asset',
    endpoint: '/assets/asset1_stonks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/history',
    endpoint: '/assets/asset1_stonks/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/txs',
    endpoint: '/assets/asset1_stonks/txs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/transactions',
    endpoint: '/assets/asset1_stonks/transactions',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/:asset/addresses',
    endpoint: '/assets/asset1_stonks/addresses',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_asset,
  },
  {
    name: 'respond with 400 and empty data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/policy_stonks',
    sqlQueryMock: {
      rows: [],
    },
    response: response_400_policy,
  },

  /*
      404s
  */

  {
    name: 'respond with 404 and empty data on /assets/:asset',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/history',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/history',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/txs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/transactions',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/transactions',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/:asset/addresses',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/addresses',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /assets/policy/:policy_id',
    endpoint: '/assets/policy/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aa',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  /*
      500s
  */

  {
    name: 'respond with 500 and empty data on /assets/list',
    endpoint: '/assets',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/history',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/history',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/txs',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/txs',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/transactions',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/transactions',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/:asset/addresses',
    endpoint: '/assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87aacafe/addresses',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /assets/policy/:policy_id',
    endpoint: '/assets/policy/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e8789',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
];
