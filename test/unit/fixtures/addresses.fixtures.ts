const query_addresses_found = [{ result: 1 }];

const query_address_regular_1 = {
  address:
    'addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
  amount_lovelace: '0',
  amount: null,
  stake_address: 'stake1u9xqxs32ms3thja3cca87my8jzhgg92mmkym4mq4yeta2vgpeeel4',
  script: false,
};

const response_address_regular_1 = {
  address:
    'addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
  amount: [{ unit: 'lovelace', quantity: '0' }],
  stake_address: 'stake1u9xqxs32ms3thja3cca87my8jzhgg92mmkym4mq4yeta2vgpeeel4',
  type: 'shelley',
  script: false,
};

const query_address_regular_vkh_1 = {
  address: 'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
  amount_lovelace: '0',
  amount: null,
  stake_address: 'stake1u9xqxs32ms3thja3cca87my8jzhgg92mmkym4mq4yeta2vgpeeel4',
  script: false,
};

const response_address_regular_vkh_1 = {
  address: 'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
  amount: [{ unit: 'lovelace', quantity: '0' }],
  stake_address: 'stake1u9xqxs32ms3thja3cca87my8jzhgg92mmkym4mq4yeta2vgpeeel4',
  type: 'shelley',
  script: false,
};

const query_address_testnet_1 = {
  address:
    'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
  amount_lovelace: '136420772',
  amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 3,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 39000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 70,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 12,
    },
  ],
  stake_address: 'stake_test1urmfts6syjrgcnwk762wz6ughhmfsm335p600yxh2fqugjc75r04j',
  script: true,
};

const response_address_testnet_1 = {
  address:
    'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
  amount: [
    { unit: 'lovelace', quantity: '136420772' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '3' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '39000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '70',
    },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '12' },
  ],
  stake_address: 'stake_test1urmfts6syjrgcnwk762wz6ughhmfsm335p600yxh2fqugjc75r04j',
  type: 'shelley',
  script: true,
};

const query_address_vkh_testnet_1 = {
  address:
    'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
  amount_lovelace: '136420772',
  amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 3,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 39000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 70,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 12,
    },
  ],
  stake_address: 'stake_test1urmfts6syjrgcnwk762wz6ughhmfsm335p600yxh2fqugjc75r04j',
  script: true,
};

const response_address_vkh_testnet_1 = {
  address:
    'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
  amount: [
    { unit: 'lovelace', quantity: '136420772' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '3' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '39000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '70',
    },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '12' },
  ],
  stake_address: 'stake_test1urmfts6syjrgcnwk762wz6ughhmfsm335p600yxh2fqugjc75r04j',
  type: 'shelley',
  script: true,
};

const query_address_byron_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  amount_lovelace: '0',
  amount: null,
  stake_address: null,
  script: false,
};

const response_address_byron_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  amount: [{ unit: 'lovelace', quantity: '0' }],
  stake_address: null,
  type: 'byron',
  script: false,
};

const query_address_haxxxor_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  amount_lovelace: '1',
  amount: null,
  stake_address: null,
  script: false,
};

const response_address_haxxxor_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  amount: [{ unit: 'lovelace', quantity: '1' }],
  stake_address: null,
  type: 'byron',
  script: false,
};

const query_address_total_regular_1 = {
  address:
    'addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
  sent_amount_lovelace: '2922441943583',
  sent_amount: null,
  received_amount_lovelace: '2922441943583',
  received_amount: null,
  tx_count: 39,
};

const response_address_total_regular_1 = {
  address:
    'addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
  received_sum: [{ unit: 'lovelace', quantity: '2922441943583' }],
  sent_sum: [{ unit: 'lovelace', quantity: '2922441943583' }],
  tx_count: 39,
};

const query_address_vkh_total_regular_1 = {
  address:
    'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
  sent_amount_lovelace: '2922441943583',
  sent_amount: null,
  received_amount_lovelace: '2922441943583',
  received_amount: null,
  tx_count: 39,
};

const response_address_vkh_total_regular_1 = {
  address:
    'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
  received_sum: [{ unit: 'lovelace', quantity: '2922441943583' }],
  sent_sum: [{ unit: 'lovelace', quantity: '2922441943583' }],
  tx_count: 39,
};

const query_address_testnet_total_1 = {
  address:
    'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
  sent_amount_lovelace: '7891093472',
  sent_amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 166,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 680000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 2367,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: 100,
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: 5008,
    },
    {
      unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736',
      quantity: 102,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 515,
    },
  ],
  received_amount_lovelace: '8436776560',
  received_amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 169,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 719000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 2437,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: 100,
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: 5008,
    },
    {
      unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736',
      quantity: 102,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 527,
    },
  ],
  tx_count: 49,
};

const response_address_testnet_total_1 = {
  address:
    'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
  received_sum: [
    { unit: 'lovelace', quantity: '8436776560' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '169' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '719000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '2437',
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: '100',
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: '5008',
    },
    { unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736', quantity: '102' },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '527' },
  ],
  sent_sum: [
    { unit: 'lovelace', quantity: '7891093472' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '166' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '680000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '2367',
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: '100',
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: '5008',
    },
    { unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736', quantity: '102' },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '515' },
  ],
  tx_count: 49,
};

const query_address_vkh_testnet_total_1 = {
  address:
    'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
  sent_amount_lovelace: '7891093472',
  sent_amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 166,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 680000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 2367,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: 100,
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: 5008,
    },
    {
      unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736',
      quantity: 102,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 515,
    },
  ],
  received_amount_lovelace: '8436776560',
  received_amount: [
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: 169,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
      quantity: 719000,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: 2437,
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: 100,
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: 5008,
    },
    {
      unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736',
      quantity: 102,
    },
    {
      unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: 527,
    },
  ],
  tx_count: 49,
};

const response_address_vkh_testnet_total_1 = {
  address:
    'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
  received_sum: [
    { unit: 'lovelace', quantity: '8436776560' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '169' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '719000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '2437',
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: '100',
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: '5008',
    },
    { unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736', quantity: '102' },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '527' },
  ],
  sent_sum: [
    { unit: 'lovelace', quantity: '7891093472' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '166' },
    { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441', quantity: '680000' },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
      quantity: '2367',
    },
    {
      unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.d090d0bdd182d0b8d09ad0bed0b9d0bd',
      quantity: '100',
    },
    {
      unit: '8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b',
      quantity: '5008',
    },
    { unit: '9c3f26285634740a52c31e5fcd0686fe51a0acb2dbcd9e565d96b736', quantity: '102' },
    { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '515' },
  ],
  tx_count: 49,
};



const query_address_total_byron_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  sent_amount_lovelace: '20180619991547029',
  sent_amount: null,
  received_amount_lovelace: '20180619991547029',
  received_amount: null,
  tx_count: 150966,
};

const response_address_total_byron_1 = {
  address:
    'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
  received_sum: [{ unit: 'lovelace', quantity: '20180619991547029' }],
  sent_sum: [{ unit: 'lovelace', quantity: '20180619991547029' }],
  tx_count: 150966,
};

const query_address_extended_1 = {
  address:
    'addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w',
  amount_lovelace: '4023344',
  amount: [
    {
      unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
      quantity: '1',
      has_nft_onchain_metadata: null,
    },
    {
      unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
      quantity: '1000000',
      has_nft_onchain_metadata: 'true',
    },
    {
      unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
      quantity: '1',
      has_nft_onchain_metadata: 'true',
    },
    {
      unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
      quantity: '1',
      has_nft_onchain_metadata: 'true',
    },
  ],
  stake_address: 'stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja',
  script: false,
};
const response_address_extended_1 = {
  address:
    'addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w',
  amount: [
    { unit: 'lovelace', quantity: '4023344', decimals: 6, has_nft_onchain_metadata: false },
    {
      unit: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
      quantity: '1',
      decimals: null,
      has_nft_onchain_metadata: false,
    },
    {
      unit: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a2982950414e4441',
      quantity: '1000000',
      decimals: null,
      has_nft_onchain_metadata: true,
    },
    {
      unit: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc43727970746f4d6167653033373930',
      quantity: '1',
      decimals: null,
      has_nft_onchain_metadata: true,
    },
    {
      unit: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756431303433',
      quantity: '1',
      decimals: null,
      has_nft_onchain_metadata: true,
    },
  ],
  stake_address: 'stake1u9e45fvvd4ujpc0kka0pnx9zqdvh9wl96nsg6sje0f5hmfq45lrja',
  type: 'shelley',
  script: false,
};

const query_address_tx_regular_1 = [
  { hash: '94790f0c593f0bd8837aa1e9fbba952fc06a0a4132b6b237268cdfd02dbd1329' },
  { hash: '4f437317a349defafec9a2f95f9c90f2a7ad1427bfdc213431296076eee062b1' },
  { hash: 'feb95adbede4172db00174668abd183b52d42c64879fd7d2deec78e0e4271ebf' },
];

const response_address_tx_regular_1 = [
  '94790f0c593f0bd8837aa1e9fbba952fc06a0a4132b6b237268cdfd02dbd1329',
  '4f437317a349defafec9a2f95f9c90f2a7ad1427bfdc213431296076eee062b1',
  'feb95adbede4172db00174668abd183b52d42c64879fd7d2deec78e0e4271ebf',
];

const query_address_tx_regular_testnet_1 = [
  {
    hash: '6d8e0be54e2df8f017f29397bbf852732ecce3422e97c6f335ef24f8113f0697',
  },
  {
    hash: '7f679b1f43da9bfe47ba3b3ff69ae174a0399810305ee8b4afd5a1fb0125c70c',
  },
  {
    hash: 'f7914dfd02ed3b831b930ed0d045002acd1a34903fcc1aa56f0cce97773aeb98',
  },
];

const response_address_tx_regular_testnet_1 = [
  '6d8e0be54e2df8f017f29397bbf852732ecce3422e97c6f335ef24f8113f0697',
  '7f679b1f43da9bfe47ba3b3ff69ae174a0399810305ee8b4afd5a1fb0125c70c',
  'f7914dfd02ed3b831b930ed0d045002acd1a34903fcc1aa56f0cce97773aeb98',
];

const query_address_transactions_regular_1 = [
  {
    tx_hash: 'd5a3adcc3187a9c8c59040bd8064d19e8670b26e960be3b42e9d08c235a20c3c',
    tx_index: 0,
    block_height: 4605180,
    block_time: 1632556851,
  },
  {
    tx_hash: '1dd9aa619e714b0c019ce2ef53c6abc61dc3e3921bfb819f12551f33f2e6c314',
    tx_index: 2,
    block_height: 4605182,
    block_time: 1632556851,
  },
  {
    tx_hash: '7f6e7ea6a2abe098e22b34d44f70d3ef5a4bcea26b641290cc95bd3918ee6f21',
    tx_index: 0,
    block_height: 4605194,
    block_time: 1632556851,
  },
];

const response_address_transactions_regular_1 = [
  {
    tx_hash: 'd5a3adcc3187a9c8c59040bd8064d19e8670b26e960be3b42e9d08c235a20c3c',
    tx_index: 0,
    block_height: 4605180,
    block_time: 1632556851,
  },
  {
    tx_hash: '1dd9aa619e714b0c019ce2ef53c6abc61dc3e3921bfb819f12551f33f2e6c314',
    tx_index: 2,
    block_height: 4605182,
    block_time: 1632556851,
  },
  {
    tx_hash: '7f6e7ea6a2abe098e22b34d44f70d3ef5a4bcea26b641290cc95bd3918ee6f21',
    tx_index: 0,
    block_height: 4605194,
    block_time: 1632556851,
  },
];

const query_addresses_utxos_regular_1 = [
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 0,
    output_index: 0,
    amount_lovelace: '1000000',
    amount: null,
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 1,
    output_index: 1,
    amount_lovelace: '10662137820',
    amount: null,
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '49b019613002b1308cd821130e395387c9c9d264abb314df8b9ac3746cbb32b5',
    tx_index: 8,
    output_index: 8,
    amount_lovelace: '17508384006',
    amount: null,
    block: 'b0e7cf5d79c252d3f7023467c72e15d83598ff22e57af5c2bfa4b72ba15261f8',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_addresses_utxos_regular_1 = [
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 0,
    output_index: 0,
    amount: [{ unit: 'lovelace', quantity: '1000000' }],
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 1,
    output_index: 1,
    amount: [{ unit: 'lovelace', quantity: '10662137820' }],
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '49b019613002b1308cd821130e395387c9c9d264abb314df8b9ac3746cbb32b5',
    tx_index: 8,
    output_index: 8,
    amount: [{ unit: 'lovelace', quantity: '17508384006' }],
    block: 'b0e7cf5d79c252d3f7023467c72e15d83598ff22e57af5c2bfa4b72ba15261f8',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const query_addresses_utxos_asset_regular_1 = [
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 1,
    output_index: 1,
    amount_lovelace: '10662137820',
    amount: [
      {
        unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
        quantity: '1',
      },
      { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
    ],
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '49b019613002b1308cd821130e395387c9c9d264abb314df8b9ac3746cbb32b5',
    tx_index: 8,
    output_index: 8,
    amount_lovelace: '17508384006',
    amount: [
      {
        unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
        quantity: '1',
      },
      { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
    ],
    block: 'b0e7cf5d79c252d3f7023467c72e15d83598ff22e57af5c2bfa4b72ba15261f8',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_addresses_utxos_asset_regular_1 = [
  {
    tx_hash: '897b4e8bc7fc26e3fc5c9e9f521235045f3417104fdc1c9844cf0cdfa45b7c1f',
    tx_index: 1,
    output_index: 1,
    amount: [
      { unit: 'lovelace', quantity: '10662137820' },
      {
        unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
        quantity: '1',
      },
      { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
    ],
    block: 'a01a5d3b0271ef0900fc6722366a5f02ad7c3b727d2ea14570b7438d3a05f689',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
  {
    tx_hash: '49b019613002b1308cd821130e395387c9c9d264abb314df8b9ac3746cbb32b5',
    tx_index: 8,
    output_index: 8,
    amount: [
      { unit: 'lovelace', quantity: '17508384006' },
      {
        unit: '476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e',
        quantity: '1',
      },
      { unit: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7', quantity: '2' },
    ],
    block: 'b0e7cf5d79c252d3f7023467c72e15d83598ff22e57af5c2bfa4b72ba15261f8',
    data_hash: null,
    inline_datum: null,
    reference_script_hash: null,
  },
];

const query_addresses_utxos_regular_testnet_1 = [
  {
    tx_hash: '80e46d2475b921a9d8a9f2c35cc351ac14222d95b05099626bba07b79989b7b6',
    tx_index: 0,
    output_index: 0,
    amount_lovelace: '136420772',
    amount: [
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
        quantity: 3,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
        quantity: 39000,
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
        quantity: 70,
      },
      {
        unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
        quantity: 12,
      },
    ],
    block: 'c2d6b5b822d0a00cdb56fbc890ffdd51580ce6c59e9d8a5550fc90122a908d5a',
    data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_addresses_utxos_regular_testnet_1 = [
  {
    tx_hash: '80e46d2475b921a9d8a9f2c35cc351ac14222d95b05099626bba07b79989b7b6',
    tx_index: 0,
    output_index: 0,
    amount: [
      { unit: 'lovelace', quantity: '136420772' },
      { unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518', quantity: '3' },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.414441',
        quantity: '39000',
      },
      {
        unit: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518.4154414441636f696e',
        quantity: '70',
      },
      { unit: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db', quantity: '12' },
    ],
    block: 'c2d6b5b822d0a00cdb56fbc890ffdd51580ce6c59e9d8a5550fc90122a908d5a',
    data_hash: 'a9be31977ee0a75de1efdeae66b3e49aabec3d20f61ac487d262a3a5aad28ba5',
    inline_datum: null,
    reference_script_hash: null,
  },
];

const response_400 = {
  error: 'Bad Request',
  message: 'Invalid address for this network or malformed address format.',
  status_code: 400,
};

const response_400_2 = {
  error: 'Bad Request',
  message: 'Invalid (malformed or out of range) from/to parameter(s).',
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
    name: 'respond with success and data on /addresses/:address',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_regular_1],
    },
    response: response_address_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address',
    endpoint: '/addresses/addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_regular_vkh_1],
    },
    response: response_address_regular_vkh_1,
  },

  {
    name: 'respond with success and data on /addresses/:address',
    endpoint:
      '/addresses/DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_byron_1],
    },
    response: response_address_byron_1,
  },
  {
    name: 'respond with success and data on /addresses/:address',
    endpoint:
      '/addresses/DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_haxxxor_1],
    },
    response: response_address_haxxxor_1,
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address',
    endpoint:
      '/addresses/addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_testnet_1],
    },
    network: 'testnet',
    response: response_address_testnet_1,
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address',
    endpoint: '/addresses/addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_vkh_testnet_1],
    },
    network: 'testnet',
    response: response_address_vkh_testnet_1,
  },

  {
    name: 'respond with success and data on /addresses/:address/total',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/total',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_total_regular_1],
    },
    response: response_address_total_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/total',
    endpoint: '/addresses/addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt/total',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_vkh_total_regular_1],
    },
    response: response_address_vkh_total_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/extended',
    endpoint:
      '/addresses/addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w/extended',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_extended_1],
    },
    response: response_address_extended_1,
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/total',
    endpoint:
      '/addresses/addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev/total',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_testnet_total_1],
    },
    network: 'testnet',
    response: response_address_testnet_total_1,
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/total',
    endpoint: '/addresses/addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge/total',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_vkh_testnet_total_1],
    },
    network: 'testnet',
    response: response_address_vkh_testnet_total_1,
  },

  {
    name: 'respond with success and data on /addresses/:address/total',
    endpoint:
      '/addresses/DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT/total',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [query_address_total_byron_1],
    },
    response: response_address_total_byron_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/txs',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/txs',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_address_tx_regular_1,
    },
    response: response_address_tx_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/transactions',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/transactions',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_address_transactions_regular_1,
    },
    response: response_address_transactions_regular_1,
  },
  {
    name: 'PAYMENT_CRED: respond with success and data on /addresses/:address/txs',
    endpoint: '/addresses/addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt/txs',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_address_tx_regular_1,
    },
    response: response_address_tx_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/txs',
    endpoint:
      '/addresses/addr1q93xdt5kd5839z8yhf6vn23y3vxp7q3v75xlpt7uw7rhxs4re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qtp66wa/txs',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: [],
    },
    response: [],
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/txs',
    endpoint:
      '/addresses/addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev/txs',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_address_tx_regular_testnet_1,
    },
    response: response_address_tx_regular_testnet_1,
    network: 'testnet',
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/txs',
    endpoint: '/addresses/addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge/txs', // 0 txs
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_address_tx_regular_testnet_1,
    },
    response: response_address_tx_regular_testnet_1,
    network: 'testnet',
  },
  {
    name: 'respond with success and data on /addresses/:address/utxos',
    endpoint:
      '/addresses/addr1qyw8xfunw6lhzzzsdrx5ze6j8ayxjhecv4ty5jtaey5jvwquwvnexa4lwyy9q6xdg9n4y06gd90nse2kffyhmjffycuq405jv6/utxos',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_addresses_utxos_regular_1,
    },
    response: response_addresses_utxos_regular_1,
  },
  {
    name: 'respond with success and data on /addresses/:address/utxos',
    endpoint: '/addresses/addr_vkh1r3ej0ymkhacss5rge4qkw53lfp547wr92e9yjlwf9ynrsk5q93m/utxos',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_addresses_utxos_regular_1,
    },
    response: response_addresses_utxos_regular_1,
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/utxos',
    endpoint:
      '/addresses/addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev/utxos',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_addresses_utxos_regular_testnet_1,
    },
    response: response_addresses_utxos_regular_testnet_1,
    network: 'testnet',
  },
  {
    name: 'TESTNET: respond with success and data on /addresses/:address/utxos',
    endpoint: '/addresses/addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge/utxos',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_addresses_utxos_regular_testnet_1,
    },
    response: response_addresses_utxos_regular_testnet_1,
    network: 'testnet',
  },
  {
    name: 'respond with success and data on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/addr_vkh1r3ej0ymkhacss5rge4qkw53lfp547wr92e9yjlwf9ynrsk5q93m/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    sqlQueryMock2: {
      rows: query_addresses_utxos_asset_regular_1,
    },
    response: response_addresses_utxos_asset_regular_1,
  },

  /*
      400s
  */
  {
    name: 'respond with 400 on /addresses/:address',
    endpoint: '/addresses/stonks_address',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/total',
    endpoint: '/addresses/stonks_address/total',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/extended',
    endpoint: '/addresses/stonks_address/extended',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/txs',
    endpoint: '/addresses/stonks_address/txs',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/transactions',
    endpoint: '/addresses/stonks_address/transactions',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/transactions?from=1&to=8789894849848',
    endpoint:
      '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/transactions?from=-1&to=8789894849848',
    sqlQueryMock: {
      rows: query_addresses_found,
    },
    response: response_400_2,
  },
  {
    name: 'respond with 400 on /addresses/:address/utxos',
    endpoint: '/addresses/stonks_address/utxos',
    response: response_400,
  },
  {
    name: 'respond with 400 on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/stonks_address/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
    response: response_400,
  },
  /*
      404s
  */
  {
    name: 'respond with 404 and empty data on /addresses/:address',
    endpoint: '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /addresses/:address/total',
    endpoint: '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/total',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /addresses/:address/extended',
    endpoint: '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/extended',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /addresses/:address/txs',
    endpoint: '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/txs',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with success and data on /addresses/:address/transactions',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/transactions',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /addresses/:address/utxos',
    endpoint: '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/utxos',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },
  {
    name: 'respond with 404 and empty data on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
    sqlQueryMock: {
      rows: [],
    },
    response: response_404,
  },

  /*
    500s
  */
  {
    name: 'respond with 500 and null on /addresses/:address',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/total',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/total',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/extended',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/extended',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/txs',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/txs',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/transactions',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/transactions',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/utxos',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/utxos',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
  {
    name: 'respond with 500 and null on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
    sqlQueryMock: {
      rows: null,
    },
    response: response_500,
  },
]; //as const;
