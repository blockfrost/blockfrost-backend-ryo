const query_found = [{ result: 1 }];

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
  address: 'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
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
  address: 'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
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
  address: 'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
  sent_amount_lovelace: '2922441943583',
  sent_amount: null,
  received_amount_lovelace: '2922441943583',
  received_amount: null,
  tx_count: 39,
};

const response_address_vkh_total_regular_1 = {
  address: 'addr_vkh1tadmy527qewxvm0c77392d7pyd26xghcye2shs40m4skqhysmzt',
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
  address: 'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
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
  address: 'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
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
      policy_id: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae',
      asset_name: '6e7574636f696e',
      quantity: '1',
      onchain_metadata: null,
    },
    {
      policy_id: '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a29829',
      asset_name: '50414e4441',
      quantity: '1000000',
      onchain_metadata: {
        PANDA: 'https://PANDA.IO',
        version: 1,
        copyright: '',
        publisherInfo: 'Pool Ticker TAILS',
        '432749982ba3bd2d969715860bb27f9efab8ab6ba7bd1e94a1a29829': { PANDA: { PANDA: 'PANDA' } },
      },
    },
    {
      policy_id: 'aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4',
      asset_name: '726561646d65',
      quantity: '1',
      onchain_metadata: {
        aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4: {
          readme: {
            name: 'readme',
            image: 'ipfs://QmTRayae5Vzq4MZ8EER9uXngZnJ1kysWdsV5e7DHSMsbz7',
            ticker: 'readme',
            publisher: 'https://minterr.io',
          },
        },
      },
    },
    {
      policy_id: 'b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc',
      asset_name: '43727970746f4d6167653033373930',
      quantity: '1',
      onchain_metadata: {
        creator: 'cryptomage.net',
        b43131f2c82825ee3d81705de0896c611f35ed38e48e33a3bdf298dc: {
          CryptoMage03751: {
            data: '083d6c03cd680dfe200d00024654',
            name: 'CryptoMage #03751',
            image: 'ipfs://QmXJMtaVm2NveTy5d9uPFQ42LkgH5AN7BSzEJ1n8hr9RC7',
          },
          CryptoMage03752: {
            data: '0800088bec920dac6000001c06d3',
            name: 'CryptoMage #03752',
            image: 'ipfs://QmNM852UDxnLSf9jboUj2wZ9dbZ1FjcSgEGQkrQPzn9SR6',
          },
          CryptoMage03753: {
            data: '000d059613b50842a00f0031404b',
            name: 'CryptoMage #03753',
            image: 'ipfs://QmQbrP92Uadh7mg7KsNMTMLrghTjpi2Kdda9cDgNB3GMjD',
          },
          CryptoMage03754: {
            data: '1f001d1c37a500bb000408851e25',
            name: 'CryptoMage #03754',
            image: 'ipfs://QmZMoFdLVEMAtm3Es7ZbNTNKANPYrzshuDe2TSbEr1N53u',
          },
          CryptoMage03755: {
            data: '1005164622bc04e4e01001b66535',
            name: 'CryptoMage #03755',
            image: 'ipfs://QmcQ9H8Rq2zrrTJBWEdg7hV5SGPWNQVDo9oHKQZxw8WrGk',
          },
          CryptoMage03756: {
            data: '000e249bbdae0a94a00d00260021',
            name: 'CryptoMage #03756',
            image: 'ipfs://QmSTgbc2HA9URaw2FfJaw897i7MHGS7Tt12C1gejrL8Tw8',
          },
          CryptoMage03757: {
            data: '1f0b010c82fa01ca60080142121e',
            name: 'CryptoMage #03757',
            image: 'ipfs://Qmcq6dWh9dMY1JVjjksHPWi6nZ9NpGmwZYcPqES3iqG1ga',
          },
          CryptoMage03758: {
            data: '1b0929b59d1b07f6a00b000212d8',
            name: 'CryptoMage #03758',
            image: 'ipfs://QmfEZNVaZUW824SoBbfSNfg4VnhK74rY4EfAA2fpwi2JiN',
          },
          CryptoMage03759: {
            data: '10075e65e8f6010a600602060a9a',
            name: 'CryptoMage #03759',
            image: 'ipfs://QmZTgDvEGmm3WWGrxE1hnQbDRog25G9jEz7vB53FhsawG4',
          },
          CryptoMage03760: {
            data: '04011633e6d70942c008003a9518',
            name: 'CryptoMage #03760',
            image: 'ipfs://QmZ9UtMNDTmb5AvsHqZuygKematrFXxDrGnMtLUSg6MLGz',
          },
          CryptoMage03761: {
            data: '14053f1f6473053ca000001d6e06',
            name: 'CryptoMage #03761',
            image: 'ipfs://QmYD5yE19r7zJSHwuLL6dqUtKqDytuEBEBRdjZ1VUd6z8w',
          },
          CryptoMage03762: {
            data: '180c08ccc9ce01ade007002150c8',
            name: 'CryptoMage #03762',
            image: 'ipfs://QmcchP6VoxnbkqHXtWUHZeGQ3gxzJyhgoySEayTw8MWgkc',
          },
          CryptoMage03763: {
            data: '140b29efaa2d0b05a00a002a16ce',
            name: 'CryptoMage #03763',
            image: 'ipfs://QmSoME7NiKHhXcwskcHh9fF8NRcUV2X1APot5qr64ATwT7',
          },
          CryptoMage03764: {
            data: '1e0f32e216c20d1fa0000d2a2c36',
            name: 'CryptoMage #03764',
            image: 'ipfs://QmVu99wPihq6fPmbiGm9dMMTjAnV6geZvnw9Dni6r9F6ZN',
          },
          CryptoMage03765: {
            data: '1c0252f45c0a0b92e0100d21ad06',
            name: 'CryptoMage #03765',
            image: 'ipfs://QmZrHSh28UU4Z7ueVKy88cZgGKG6uzKT7KzLMeDGo7R4jZ',
          },
          CryptoMage03766: {
            data: '1c01693451bd0cd1a004105615a7',
            name: 'CryptoMage #03766',
            image: 'ipfs://QmcgGvedLKR3CEdZ678tgH1486xfiT4RUind3o1JYsW6CL',
          },
          CryptoMage03767: {
            data: '1c0113e3c40309e4200d10a19bc8',
            name: 'CryptoMage #03767',
            image: 'ipfs://Qmes8wrJmSZU2QrTEDHteq6qbHtLndeNhK7ZnxFoHRTwVu',
          },
          CryptoMage03768: {
            data: '0803e30f71b60e15e9c3001e4fe0',
            name: 'CryptoMage #03768',
            image: 'ipfs://QmdibY1b3PM5wrUnFE9Bk1x3s2dL3KngpRLRThPQ9q5foj',
          },
          CryptoMage03769: {
            data: '0c02365ea80e084de0010008c8c5',
            name: 'CryptoMage #03769',
            image: 'ipfs://Qmbe7aNxSbrbq5tfk6GQWYD3ReTzqey5ZmUm4w6dKmht9y',
          },
          CryptoMage03770: {
            data: '181329a45e6203f780030028904b',
            name: 'CryptoMage #03770',
            image: 'ipfs://QmQCxmhxxDe4DzLPjNxDgzs6EoqRXBrboqriXxheKm9Tub',
          },
          CryptoMage03771: {
            data: '1b0bbe96ef875bbfbe0500881196',
            name: 'CryptoMage #03771',
            image: 'ipfs://QmRAKrfRokCAjLsVbaM46bZ8wZ2yPBaZ6sVt76rgcTKKXR',
          },
          CryptoMage03772: {
            data: '140b3e50aa840a7f400200401016',
            name: 'CryptoMage #03772',
            image: 'ipfs://QmfWyLaQZBnHLdDQSvrXd8MtfjAmYpzXapSDD2Q6Z1ffjf',
          },
          CryptoMage03773: {
            data: '1a02101b756b44fb20090206521a',
            name: 'CryptoMage #03773',
            image: 'ipfs://Qmdh4v6X4WMPgYWwavFSHdTF1adtYXhJytH6wFyAXpupVy',
          },
          CryptoMage03774: {
            data: '00000e590824008120070004d82c',
            name: 'CryptoMage #03774',
            image: 'ipfs://QmZa5mEKzRYLwY6zYfpaQrT11AZ9XRQDhAQp7ehtbCREzu',
          },
          CryptoMage03775: {
            data: '0c0670c23c4a088ae00f0008f1c8',
            name: 'CryptoMage #03775',
            image: 'ipfs://QmNcyoQpR1cUtirifS6WPtNKoTLB5YivmZG7BVZQgrnf1T',
          },
          CryptoMage03776: {
            data: '100b3518b86b0773400102ee1846',
            name: 'CryptoMage #03776',
            image: 'ipfs://QmWeNk7TBcLnDudN5tKWFqsVAPoLTtMzGYEWPXKEEoysgz',
          },
          CryptoMage03777: {
            data: '1f0f1baabe70045aa00908904f36',
            name: 'CryptoMage #03777',
            image: 'ipfs://QmXJcLyW2Adt58yejd7UJjvkL8eMYSnVurf4h6UNTchHzP',
          },
          CryptoMage03778: {
            data: '000c141523c8098740100038e400',
            name: 'CryptoMage #03778',
            image: 'ipfs://QmP7G59r7hxm1s2uLN7GB4xXmWbmLN1gPE1mwUw5Y7i4n1',
          },
          CryptoMage03779: {
            data: '100037446ed20af5c005028c34b9',
            name: 'CryptoMage #03779',
            image: 'ipfs://QmUnZscr8fZa2vRNP2QE8hEzyrMvj7kd1X9MYiM7uyGxFV',
          },
          CryptoMage03780: {
            data: '190811175a9806e0800d02815551',
            name: 'CryptoMage #03780',
            image: 'ipfs://Qmci2vbWe8CrS1ncYFYHzBDEeFiESuLH2tCR5SUFCUExiR',
          },
          CryptoMage03781: {
            data: '080c1434e7410dd8600700008ad1',
            name: 'CryptoMage #03781',
            image: 'ipfs://QmX4hzTHX1K9dLLvoNTA5XheHPixSGPu35ovxwU5AegUiF',
          },
          CryptoMage03782: {
            data: '14032d79b76b0513600b001ef6c6',
            name: 'CryptoMage #03782',
            image: 'ipfs://QmUTepn99wRy72JUt3ZNzpCrGQwA3u2xhFFCVtVxhp1Jfo',
          },
          CryptoMage03783: {
            data: '08053d62ee6e80bb600500036a98',
            name: 'CryptoMage #03783',
            image: 'ipfs://QmeLo9FX1Fgxub4VmPu3RAHTQtEhEchd4m1jfqNxBRbBBH',
          },
          CryptoMage03784: {
            data: '000803e5b8950b0e000800404622',
            name: 'CryptoMage #03784',
            image: 'ipfs://QmdMnod3C5i1caKR2g6CwfEAgm2irAnN5emev7U8F4KVsv',
          },
          CryptoMage03785: {
            data: '080134734a86463be00e00124b20',
            name: 'CryptoMage #03785',
            image: 'ipfs://QmcJ8WyRyUoYxEfctYZWkqJ9kivVGUNoTZaP2ngqFrT3bC',
          },
          CryptoMage03786: {
            data: '040b0a03f18d5bd5a00100094462',
            name: 'CryptoMage #03786',
            image: 'ipfs://QmUtX8NuBMN7xauEYnDootFrMH5fLnHU6bKg1DKE17yoxd',
          },
          CryptoMage03787: {
            data: '080b3e1eb22f033d4000001a611a',
            name: 'CryptoMage #03787',
            image: 'ipfs://QmRugyY7tmm9HX91jEVL2GZLjk2YxFRWrRyAG6uyz9s1LL',
          },
          CryptoMage03788: {
            data: '1a0545ac149c08d6a0060204942e',
            name: 'CryptoMage #03788',
            image: 'ipfs://QmXGpJLm4Xw6af7VhtxdLd6X2vQzRL946oWTQHu2fvXDmz',
          },
          CryptoMage03789: {
            data: '0c027e34def20aeb400e00086124',
            name: 'CryptoMage #03789',
            image: 'ipfs://QmRVtZKxcQgVL2LGrFxM5iFA2t2Gzx7d5Wt2uDJ2QnASKx',
          },
          CryptoMage03790: {
            data: '790940d154420ad68006028052eb',
            name: 'CryptoMage #03790',
            image: 'ipfs://QmZxr43yawsWhQVg7S7X4esnQXProUbVor1SkjPSodxFtP',
          },
          CryptoMage03791: {
            data: '1b0e20e9fb4e0461e00b00b24646',
            name: 'CryptoMage #03791',
            image: 'ipfs://QmbtF5YF9wd6DGtbEXgUAs7ec3QX8EAMczdmj3VQXEC5yv',
          },
          CryptoMage03792: {
            data: '1006031e526b0cd0000a02484635',
            name: 'CryptoMage #03792',
            image: 'ipfs://QmQidtTsnfprLC9tN3RjXPP4UyLEvijpvQu51i8d5SPSCc',
          },
          CryptoMage03793: {
            data: '1a00452b8a9a0817c00900081464',
            name: 'CryptoMage #03793',
            image: 'ipfs://Qmd5A9cE86VvuikeWY9rzb9EQuT4RHkLoaqaSawpRGnSn3',
          },
          CryptoMage03794: {
            data: '080e34f513700e548001000e0bd2',
            name: 'CryptoMage #03794',
            image: 'ipfs://QmasbjtixX9DK63oaV3ibgJPExVJqTQr7PcLxAnXguutuH',
          },
          CryptoMage03795: {
            data: '14060b37567a09d40000004a2884',
            name: 'CryptoMage #03795',
            image: 'ipfs://QmNLpoeuyV5qhwZXxGhLaVvGttq14Pm9f82sAV8SSGccAi',
          },
          CryptoMage03796: {
            data: '1900145bc4190513a00902a81411',
            name: 'CryptoMage #03796',
            image: 'ipfs://QmfRvP4Uxk3r8Px9PSZWhBWtvBdnuecTJJGzPi8MZeM9PS',
          },
          CryptoMage03797: {
            data: '0808f84ecb120bae6270000a77d8',
            name: 'CryptoMage #03797',
            image: 'ipfs://QmQ6A1jj24YDajwERnELEUpMmefLuVwFVYSjaaL4ia4KEX',
          },
          CryptoMage03798: {
            data: '04091eedb04e08f740010011d20c',
            name: 'CryptoMage #03798',
            image: 'ipfs://QmWyMEydabNeh7widbFyAk153mnCaFkzVFmnN9LqryM3yR',
          },
          CryptoMage03799: {
            data: '080b6ce104850d49000000078784',
            name: 'CryptoMage #03799',
            image: 'ipfs://QmaN4YzUQV4W8PxYNdjooYXLyfoAr1mwkvTyZeSdTxzbfh',
          },
          CryptoMage03800: {
            data: '1405342fe8be021f800300774282',
            name: 'CryptoMage #03800',
            image: 'ipfs://Qme4K7cLzg1fyLxTFmhK4u4Wnm4UYPNgQmVWA8n3wQYkoC',
          },
        },
      },
    },
    {
      policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
      asset_name: '537061636542756431303433',
      quantity: '1',
      onchain_metadata: {
        d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc: {
          SpaceBud3: {
            name: 'SpaceBud #3',
            type: 'Frog',
            image: 'ipfs://QmToz6Vgff4LNqxnZEBvy1JyVpDVxgZGvRMvjJLpSZqkGJ',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'W1NMCaWIvPPNo7d-a7515v4VrHNx1XgYmTDFzDxbUTU',
          },
          SpaceBud27: {
            name: 'SpaceBud #27',
            type: 'Elephant',
            image: 'ipfs://QmYMVfKMZEd2goMH275WsR8xhghHVPUeXCs2tPTZLh6FCC',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'TtX0jmuAeFKOjwrL7ovTgPPDmX8EcwM_GhWdFI2Jq6A',
          },
          SpaceBud113: {
            name: 'SpaceBud #113',
            type: 'Robot',
            image: 'ipfs://QmfRdspaR4ut1S7gzMM1uVzsS1KXupr6LfN4E1QAzxL6YT',
            traits: ['Belt', 'Wool Boots', 'SPO'],
            arweaveId: 't-EOiIYNyNRpFVKSy8KxcuPtqx38JAsFuk_ERVl_3bU',
          },
          SpaceBud312: {
            name: 'SpaceBud #312',
            type: 'Parrot',
            image: 'ipfs://QmZ2d8hzfyLNeAixBSyRwqmAyxSM4QVHYmgnejCEd9G6dT',
            traits: ['Belt', 'Covered Helmet', 'SPO'],
            arweaveId: 'pScOkeGfe2FE_Cjod1HiPsljeVBrU1pesiJn4obJyFY',
          },
          SpaceBud344: {
            name: 'SpaceBud #344',
            type: 'Alien',
            image: 'ipfs://QmZvyqfMb1fM2ysq3HQmaDAPqW2zmuXbNaxZNq7Gzrny2u',
            traits: [
              'Camo Suit',
              'Chestplate',
              'Belt',
              'Covered Helmet',
              'Ski Goggles',
              'Watch',
              'SPO',
            ],
            arweaveId: 'JtXqtrquCKrsMFJ9qmLd587p14dhNKBmBPH7--S-1BQ',
          },
          SpaceBud351: {
            name: 'SpaceBud #351',
            type: 'Alien',
            image: 'ipfs://QmRsPjD2G11dRxZ1AHSwGBJksFjsBWWWdoWZQPz5cQYyuA',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'bVkT0Q_HTjDo1jNWIr2Qv0iLRYZ-wEqLGZZPhySbtWU',
          },
          SpaceBud399: {
            name: 'SpaceBud #399',
            type: 'Cat',
            image: 'ipfs://QmZnqCPzD2gKQgJTg8miEnR7XtE7B795sb8xzUBw8xJxJE',
            traits: ['Chestplate', 'SPO'],
            arweaveId: 'EPuFX0rIue_2rG7i-9n4ygpe5aGk7lT-b0DnOMkXTHM',
          },
          SpaceBud432: {
            name: 'SpaceBud #432',
            type: 'Parrot',
            image: 'ipfs://QmRpXEXL4M8MnpmGTecNLyWWMKazGW4X2z4TtvgijU7hHC',
            traits: ['Camo Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'Watch', 'SPO'],
            arweaveId: 'ppnzk0AE_boT1dv29H2wk9ag2MTKYuEB5ZbdlRvSVUo',
          },
          SpaceBud519: {
            name: 'SpaceBud #519',
            type: 'Arcane',
            image: 'ipfs://QmakZYAXv5fjMF6CmEiYx25QSVtm9YCuxoUw8Hx2jJW3bc',
            traits: ['Camo Suit', 'Chestplate', 'Belt', 'Sun Glasses', 'SPO'],
            arweaveId: 'AYIEIo48bup30I9vxrM_kpi-y_SmwXftjvnMiysXuPY',
          },
          SpaceBud591: {
            name: 'SpaceBud #591',
            type: 'Ape',
            image: 'ipfs://QmcdGQxbpjaUxNrRD2kr3kVwGgBWfHfgbEGpCk3bEw34Gx',
            traits: ['Chestplate', 'SPO'],
            arweaveId: 'zBjF5bDQAbaB7a9aK8KBDmbXSOUzMg4ZYPyoL9FAs6E',
          },
          SpaceBud964: {
            name: 'SpaceBud #964',
            type: 'Ape',
            image: 'ipfs://Qmd1s94T1VfeoSvSMGw7FaCr2LrwZwxk7VqMcajbqF1Zwt',
            traits: ['Camo Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'SPO'],
            arweaveId: 'x0iz7D-eqsWuPjcnavCd0DSTDLBqH4QiItm2QUFl-4s',
          },
          SpaceBud987: {
            name: 'SpaceBud #987',
            type: 'Arcane',
            image: 'ipfs://QmfD2fgRMJL4eYt4YmLNUgFzjgdb9bvorMo3w39mmEKE9o',
            traits: ['Star Suit', 'Chestplate', 'Belt', 'Watch', 'SPO'],
            arweaveId: 'UWRESRbVUBRLsDeYqoFASE0ZYfZWWOl1UP-__RPzEaU',
          },
          SpaceBud1020: {
            name: 'SpaceBud #1020',
            type: 'Ape',
            image: 'ipfs://Qmc4mgJcsJ2oCkpda4UpuYc9JHiPFUtUNLC9rg41uGRBEw',
            traits: ['Star Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'SPO'],
            arweaveId: 'hIBgOo6-9PDBNBJID4-9hjcnyc9zVeuhU7tzr4f7MWI',
          },
          SpaceBud1043: {
            name: 'SpaceBud #1043',
            type: 'Tiger',
            image: 'ipfs://QmUuu6kFK4omAKhf77vVRNrZcA3LNDjRmjAaAZCbAVuXSj',
            traits: ['Belt', 'Wool Boots', 'SPO'],
            arweaveId: 'x6A-m2OrN3vzGyxMhRNPXBkkRizZIMT_myxwc9vTIoQ',
          },
          SpaceBud1064: {
            name: 'SpaceBud #1064',
            type: 'Arcane',
            image: 'ipfs://Qmf3WeedM545qUf2bHe2WQr4U3w27d6dW2UKmjqkKFXZ9p',
            traits: ['Chestplate', 'Belt', 'Covered Helmet', 'Snorkel', 'SPO'],
            arweaveId: 'WXFXXMxV2J1QWaAQmqvOpC1p-4tuOelDBhxjgrGeWL8',
          },
          SpaceBud1106: {
            name: 'SpaceBud #1106',
            type: 'Ape',
            image: 'ipfs://QmXdT3eF15QGhqVKr9Awt8voKEtSDJjBFy3ZLtm9XPL6qV',
            traits: ['Camo Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'SPO'],
            arweaveId: '6aZPA48J1Z5SVf4ML8sO9NyvvfvRR4vmCKX0qZ0kHb4',
          },
          SpaceBud1157: {
            name: 'SpaceBud #1157',
            type: 'Cat',
            image: 'ipfs://QmSzHfLZxwYjn5G5e5Sv8FEn32DLr1pFN29HWmWdMPyPLF',
            traits: ['Chestplate', 'Belt', 'Covered Helmet', 'SPO'],
            arweaveId: 'f6TyG9sLqIZl26SVjDTUMihCpoiJvBzl8sv9qZ96O7I',
          },
          SpaceBud1169: {
            name: 'SpaceBud #1169',
            type: 'Rhino',
            image: 'ipfs://QmSqRhmA3NBoQEoqoXHbGS9BcRApXvUytDNEyU1hqLXTMr',
            traits: ['Chestplate', 'SPO'],
            arweaveId: '2KCnN_tEq1aGIRSzCUxAePKsMOQV3wVgKraqdhmnT44',
          },
          SpaceBud1319: {
            name: 'SpaceBud #1319',
            type: 'Cat',
            image: 'ipfs://QmVUFMmfvba3sjML8VEojATK1ixmejsGT77dCpJHFudDr2',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'vaRcQRa-kG5DRF8yvUjadniFbhObLn-KolsSRvzGTk8',
          },
          SpaceBud1355: {
            name: 'SpaceBud #1355',
            type: 'Bear',
            image: 'ipfs://QmUDfsGw7gbPN4QCordXeoYTq6mHEDCWbX3zDAjuWgzKcK',
            traits: ['Chestplate', 'Eye Patch', 'SPO'],
            arweaveId: 'dhzhHdXDRi0HkHFqUk9E9OmXLhU2j72-PfPBTl-TqOI',
          },
          SpaceBud1378: {
            name: 'SpaceBud #1378',
            type: 'Dog',
            image: 'ipfs://QmZBTQB1tQdyHkfzSVRjQ2eKKC9ceZhpdxZ2E6fQtd8gU2',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'PMmuS3ofkgfKb_UMEHCwYWxlnG14eudTfL1Trc9yu0k',
          },
          SpaceBud1421: {
            name: 'SpaceBud #1421',
            type: 'Dog',
            image: 'ipfs://QmZrbjUYm6G8wJ5A3W5bZ7fw2W7AefkZZ3HcX6cVd4y6j4',
            traits: ['Chestplate', 'Belt', 'Sun Glasses', 'SPO'],
            arweaveId: 'J3Xhje5ap--eW2AHa_bIpskibLgLyoVVxiw8o1XuwSs',
          },
          SpaceBud1438: {
            name: 'SpaceBud #1438',
            type: 'Lion',
            image: 'ipfs://QmYdLTnoBeKDz422HcMVpJksbKQcw8Gu8F5gBzNw2h8rQ1',
            traits: ['Chestplate', 'Belt', 'Sun Glasses', 'SPO'],
            arweaveId: 'zf6HZhLSJxjYoM2g8Apwwg4N5NwlwbVtak5e89FWDkQ',
          },
          SpaceBud1481: {
            name: 'SpaceBud #1481',
            type: 'Bear',
            image: 'ipfs://QmWQ9B3iXnut8kb1idsdujJTFdhhQQG9WMqs5owF481865',
            traits: ['Camo Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'VR', 'SPO'],
            arweaveId: 'JyEAM_TpIa9GQa4WFeWrBa_oImkVeB31Btruo_y3ipg',
          },
          SpaceBud1502: {
            name: 'SpaceBud #1502',
            type: 'Bear',
            image: 'ipfs://QmRW54ZfoXbVX4nLoSroyG9VqeMzSnuSvb7UBJbkFXAbyy',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: '4SUNHDW2_fdLzJcUJGkFatMKteNSHdSVRCBaTlZfpdA',
          },
          SpaceBud1585: {
            name: 'SpaceBud #1585',
            type: 'Cat',
            image: 'ipfs://QmUogPsFgcthRLWV5dWCREPu6ccGquW2gFg5wUNHr6Kcxe',
            traits: ['Belt', 'Covered Helmet', 'Snorkel', 'SPO'],
            arweaveId: '3LyTm3hTdPIWGQofhc5XOUuOdmRAgvUFP6idlINTsaI',
          },
          SpaceBud1597: {
            name: 'SpaceBud #1597',
            type: 'Cat',
            image: 'ipfs://QmVJhHpWCjDhXCBvkdNvGepn1iogSns3N2sGBSW1wzN3qy',
            traits: ['Star Suit', 'Chestplate', 'Belt', 'Covered Helmet', 'SPO'],
            arweaveId: 'mpRMAESWG5begJI9v4imuRFjameM2tFQKx-6YoLUOuY',
          },
          SpaceBud1635: {
            name: 'SpaceBud #1635',
            type: 'Ape',
            image: 'ipfs://QmQeNpjajBJWuBpeXHnoEVqdZ2RR5HepTMEhUBzW8oXoZ5',
            traits: ['Belt', 'SPO'],
            arweaveId: 'fxBnPrAg5ubGIi3c0HvQz5CFQ0VI9m7VZzGFehm6ZQo',
          },
          SpaceBud1657: {
            name: 'SpaceBud #1657',
            type: 'Cat',
            image: 'ipfs://QmXKx8UKVVoQUAXKeC9sJzRbga7pjJDRHT4WC6ha7HHhNd',
            traits: ['Chestplate', 'Belt', 'SPO'],
            arweaveId: 'L9lAUdn9lIIbzNqE4OQlAPQ30FJGYT31RXMTw-ZqdF4',
          },
        },
      },
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
      unit: 'aa1b03c6a49951282e9a68b17133a814f4c603f85be469e22869ecb4726561646d65',
      quantity: '1',
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

const response_400_asset = {
  error: 'Bad Request',
  message: 'Invalid or malformed asset format.',
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
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
      rows: query_found,
    },
    sqlQueryMock2: {
      rows: query_found,
    },
    sqlQueryMock3: {
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
      rows: query_found,
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
  {
    name: 'respond with 400 on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/addr1q904hvj3tcr9cendlrm6y4fhcy34tgezlqn92z7z4lwkzczvqdpz4hpzh09mr3360akg0y9wss24hhvfhtkp2fjh65cs7q4z89/utxos/stonks_asset',
    response: response_400_asset,
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
  {
    name: 'respond with 404 and empty data on /addresses/:address/utxos/:asset',
    endpoint:
      '/addresses/Ae2tdPwUPEZ3Lb6Rh44ZQtFPegVYyhhJa58MQeeVNgDcsYw2YTq8ERT2RqE/utxos/6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aaa',
    sqlQueryMock: {
      rows: query_found,
    },
    sqlQueryMock2: {
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
