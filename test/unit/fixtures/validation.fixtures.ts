export const validateStakeAddressFixture = [
  {
    name: 'Valid stake address',
    input: 'stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss',
    response: true,
    network: 'mainnet',
  },
  {
    name: 'Valid stake address, wrong network',
    input: 'stake1uxmdw34s0rkc26d9x9aax69pcua8eukm2tytlx3szg75mcg5z5nss',
    response: false,
    network: 'testnet',
  },
  {
    name: 'Non valid/malformed stake address',
    input: 'stake_stonks',
    response: false,
    network: 'mainnet',
  },
  {
    name: 'TESTNET: Valid stake address',
    input: 'stake_test1urtemlwr6hmw6q5mc5p0q6z06g4f3v33czec67yf688w4wsw6rnpq',
    response: true,
    network: 'testnet',
  },
  {
    name: 'TESTNET: Valid stake address, wrong network',
    input: 'stake_test1uzxpncx82vfkl5ml00ws44hzfdh64r22kr93e79jqsumv0q8g8cy08878787',
    response: false,
    network: 'mainnet',
  },
  {
    name: 'TESTNET: Non valid/malformed stake address',
    input: 'stake_stonks_testnet',
    response: false,
    network: 'testnet',
  },
] as const;

export const detectAndValidateAddressTypeFixture = [
  {
    name: 'Valid byron address',
    input:
      'DdzFFzCqrhstmqBkaU98vdHu6PdqjqotmgudToWYEeRmQKDrn4cAgGv9EZKtu1DevLrMA1pdVazufUCK4zhFkUcQZ5Gm88mVHnrwmXvT',
    response: 'byron',
    network: 'mainnet',
  },
  {
    name: 'Valid shelley address',
    input:
      'addr1qyw8xfunw6lhzzzsdrx5ze6j8ayxjhecv4ty5jtaey5jvwquwvnexa4lwyy9q6xdg9n4y06gd90nse2kffyhmjffycuq405jv6',
    response: 'shelley',
    network: 'mainnet',
  },
  {
    name: 'Valid paymentCred address',
    input: 'addr_vkh1r3ej0ymkhacss5rge4qkw53lfp547wr92e9yjlwf9ynrsk5q93m',
    response: 'shelley',
    network: 'mainnet',
  },
  {
    name: 'Valid address, wrong network',
    input:
      'addr1qyw8xfunw6lhzzzsdrx5ze6j8ayxjhecv4ty5jtaey5jvwquwvnexa4lwyy9q6xdg9n4y06gd90nse2kffyhmjffycuq405jv6',
    response: undefined,
    network: 'testnet',
  },

  {
    name: 'Non valid/malformed address',
    input: 'stonks_address',
    response: undefined,
    network: 'mainnet',
  },
  {
    name: 'TESTNET: Valid address',
    input:
      'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
    response: 'shelley',
    network: 'testnet',
  },
  {
    name: 'TESTNET: Valid paymentCred address',
    input: 'addr_vkh1epr2wj5sg6x66gr650nlrlk9eahlrynxag3hjye6xctfvmdduge',
    response: 'shelley',
    network: 'testnet',
  },
  {
    name: 'TESTNET: Valid address, wrong network',
    input:
      'addr_test1qryydf62jprgmtfq02370u07ch8kluvjvm4zx7gn8gmpd9snea2aza02sj9c0h4nay20a0t7q28zhajng36a2taec0gqeywmev',
    response: undefined,
    network: 'mainnet',
  },
  {
    name: 'TESTNET: Non valid/malformed address',
    input: 'stonks_address_testnet',
    response: undefined,
    network: 'testnet',
  },
] as const;

export const convertStakeAddressFixture = [
  {
    name: 'Valid onchain address',
    input: 'e1ffd02ae28da95344585e7aa1fdad328b11c997a763a94216c6d903d2',
    response: 'stake1u8laq2hz3k54x3zctea2rlddx293rjvh5a36jsskcmvs85sf0vdl6',
    network: 'mainnet',
  },
  {
    name: 'Valid non-onchain address',
    input: 'e1b94ee4b98a8ada410ae6eff01969e64f365d7a407b8eaf4cb430a61a',
    response: 'stake1uxu5ae9e329d5sg2umhlqxtfue8nvht6gpacat6vksc2vxsmnmm4g',
    network: 'mainnet',
  },
  {
    name: 'Non-valid non-onchain address',
    input: 'stonks',
    response: undefined,
    network: 'mainnet',
  },
  {
    name: 'TESTNET: valid onchain address',
    input: 'e04f1606da213feae8ddd434a7a3467ca48f25deac14ecf7adadbe3238',
    response: 'stake_test1up83vpk6yyl746xa6s620g6x0jjg7fw74s2weaad4klrywqg2nh3w',
    network: 'testnet',
  },
  {
    name: 'TESTNET: valid non-onchain address',
    input: 'e05a29b4c93eb2affed20854d8f0c07aafe3b04eff4212bb079e0f20fb',
    response: 'stake_test1updzndxf86e2llkjpp2d3uxq02h78vzwlapp9wc8nc8jp7cgqjwlv',
    network: 'testnet',
  },
  {
    name: 'TESTNET: valid non-onchain address',
    input: 'stonks',
    response: undefined,
    network: 'testnet',
  },
] as const;

export const validateAndConvertPoolFixture = [
  {
    name: 'Valid pool Bech32',
    input: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
    response: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  },
  {
    name: 'Valid pool Hex',
    input: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
    response: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  },
  {
    name: 'Valid Bech32, but not pool id',
    input:
      'addr1qyw8xfunw6lhzzzsdrx5ze6j8ayxjhecv4ty5jtaey5jvwquwvnexa4lwyy9q6xdg9n4y06gd90nse2kffyhmjffycuq405jv6',
    response: undefined,
  },
  {
    name: 'Invalid pool',
    input: 'stonks_pool',
    response: undefined,
  },
] as const;

export const validateDerivationXpubFixture = [
  {
    name: 'Valid xpub',
    input:
      '6d17587575a3b4f0f86ebad3977e8f7e4981faa863eccf5c1467065c74fe3435943769446dd290d103fb3d360128e86de4b47faea73ffb0900c94c6a61ef9ea2',
    response: true,
  },
  {
    name: 'Invalid xpub',
    input: 'stonks',
    response: false,
  },
] as const;

export const validateInRangeUnsignedIntFixture = [
  {
    name: 'Invalid unsigned gint - empty input',
    input: '',
    response: false,
  },
  {
    name: 'Valid unsigned int - zero num input',
    input: 0,
    response: true,
  },
  {
    name: 'Valid unsigned int - zero string input',
    input: '0',
    response: true,
  },
  {
    name: 'Valid unsigned int - string input',
    input: '42',
    response: true,
  },
  {
    name: 'Valid unsigned int - max string input',
    input: '2147483648',
    response: true,
  },
  {
    name: 'Valid unsigned int - max num input',
    input: 2147483648,
    response: true,
  },
  {
    name: 'Valid unsigned int - over max num input',
    input: 2147483649,
    response: false,
  },
  {
    name: 'Valid unsigned int - over max string input',
    input: '2147483649',
    response: false,
  },
  {
    name: 'Valid unsigned int - invalid string input',
    input: 'stonks',
    response: false,
  },
  {
    name: 'Valid unsigned int - negative num input',
    input: -1,
    response: false,
  },
  {
    name: 'Valid unsigned int - negative string input',
    input: '-1',
    response: false,
  },
] as const;

export const validatePositiveInRangeSignedIntFixture = [
  {
    name: 'Invalid signed int - empty input',
    input: '',
    response: false,
  },
  {
    name: 'Valid signed int - zero num input',
    input: 0,
    response: true,
  },
  {
    name: 'Valid signed int - zero string input',
    input: '0',
    response: true,
  },
  {
    name: 'Valid signed int - string input',
    input: '42',
    response: true,
  },
  {
    name: 'Valid signed int - max num input',
    input: 2147483647,
    response: true,
  },
  {
    name: 'Valid signed int - max string input',
    input: '2147483647',
    response: true,
  },
  {
    name: 'Valid signed int - over max num input',
    input: 2147483648,
    response: false,
  },
  {
    name: 'Valid signed int - over max string input',
    input: '2147483648',
    response: false,
  },
  {
    name: 'Valid signed int - invalid string input',
    input: 'stonks',
    response: false,
  },
  {
    name: 'Valid signed int - negative num input',
    input: -1,
    response: false,
  },
  {
    name: 'Valid signed int - negative string input',
    input: '-1',
    response: false,
  },
] as const;

export const validatePositiveInRangeSignedBigIntFixture = [
  {
    name: 'Invalid signed bigint - empty input',
    input: '',
    response: false,
  },
  {
    name: 'Valid signed bigint - zero string input',
    input: '0',
    response: true,
  },
  {
    name: 'Valid signed bigint - input',
    input: '42',
    response: true,
  },
  {
    name: 'Valid signed bigint - max input',
    input: '9223372036854775807',
    response: true,
  },
  {
    name: 'Valid signed bigint - over max input',
    input: '9223372036854775808',
    response: false,
  },
  {
    name: 'Valid signed bigint - invalid input',
    input: 'stonks',
    response: false,
  },
  {
    name: 'Valid signed bigint - negative input',
    input: '-1',
    response: false,
  },
];

export const validateBlockHashFixture = [
  {
    name: 'Valid hex, valid length',
    input: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
    response: true,
  },
  {
    name: 'Valid hex, invalid length',
    input: 'deadbeef',
    response: false,
  },
  {
    name: 'Invalid hex, valid length',
    input: 'Ae2tdPwUPEZEdDxg52so2k6iB5tLtNoATiNdKMCBHiAQHWGTpd2n6Lrym7Cabc69',
    response: false,
  },
  {
    name: 'Invalid hex, invalid length',
    input: 'deadbppf',
    response: false,
  },
] as const;

export const validateHexFixture = [
  {
    name: 'Valid hex',
    input: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
    response: true,
  },
  {
    name: 'Valid hex',
    input: 'deadbeef',
    response: true,
  },
  {
    name: 'Invalid hex',
    input: 'Ae2tdPwUPEZEdDxg52so2k6iB5tLtNoATiNdKMCBHiAQHWGTpd2n6Lrym7Cabc69',
    response: false,
  },
  {
    name: 'Invalid hex',
    input: 'deadbppf',
    response: false,
  },
] as const;

export const isNumber = [
  {
    name: 'isNumber hash',
    input: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
    response: false,
  },
  {
    name: 'isNumber number',
    input: '271471741',
    response: true,
  },
  {
    name: 'isNumber empty string',
    input: '',
    response: false,
  },
  {
    name: 'isNumber undefined',
    input: undefined,
    response: false,
  },
] as const;
