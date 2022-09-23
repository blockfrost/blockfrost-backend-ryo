const response_400 = {
  error: 'Bad Request',
  message: 'Invalid or malformed xpub format. Has to be hex of length 128.',
  status_code: 400,
};

const response_400_1 = {
  error: 'Bad Request',
  message: 'Missing, out of range or malformed role.',
  status_code: 400,
};

const response_400_2 = {
  error: 'Bad Request',
  message: 'Missing, out of range or malformed index.',
  status_code: 400,
};

export default [
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/0',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 0,
      address:
        'addr1qxykyqgwd577heaunndagj66z0n2z0jgedjcn3qxlrujpjq49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqnt753m',
    },
  },
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/1',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 1,
      address:
        'addr1qy535472n2ctu3x55v03zmm9jnz54grqu3sueap9pnk4xys49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dq5u58qk',
    },
  },
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/3',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 3,
      address:
        'addr1qy9ltwrqmtl9vu2y9y24aaxppyfhjhyhrfdgy8usxuu3hdq49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqjrqcu2',
    },
  },
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/0',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 0,
      address:
        'addr1q9nkzfywe6q9yyuclr9pr95l04n6h3nrxqytqqyjkmn9aqg49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqmu94ne',
    },
  },
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/1',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 1,
      address:
        'addr1qx8dz454rqaxjhrynjhppwq22wwk2dtkz022ngxgcdahflc49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqq078gh',
    },
  },
  {
    name: 'respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/3',
    network: 'mainnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 3,
      address:
        'addr1qytpyxyh5j023fq88xhj862guwrymhwjadt5czqvumpv02s49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dq56wr69',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/0',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 0,
      address:
        'addr_test1qzykyqgwd577heaunndagj66z0n2z0jgedjcn3qxlrujpjq49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqsar5ay',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/1',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 1,
      address:
        'addr_test1qq535472n2ctu3x55v03zmm9jnz54grqu3sueap9pnk4xys49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqh2f8vf',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/0/3',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 0,
      index: 3,
      address:
        'addr_test1qq9ltwrqmtl9vu2y9y24aaxppyfhjhyhrfdgy8usxuu3hdq49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dq34acs4',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/0',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 0,
      address:
        'addr_test1qpnkzfywe6q9yyuclr9pr95l04n6h3nrxqytqqyjkmn9aqg49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqc2c4lx',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/1',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 1,
      address:
        'addr_test1qz8dz454rqaxjhrynjhppwq22wwk2dtkz022ngxgcdahflc49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqrer8yg',
    },
  },
  {
    name: 'TESTNET: respond with success and data on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152/1/3',
    network: 'testnet',
    response: {
      xpub: '7ec9738746cb4708df52a455b43aa3fdee8955abaf37f68ffc79bb84fbf9e1b39d77e2deb9749faf890ff8326d350ed3fd0e4aa271b35cad063692af87102152',
      role: 1,
      index: 3,
      address:
        'addr_test1qqtpyxyh5j023fq88xhj862guwrymhwjadt5czqvumpv02s49ucjdfty5p5qlw5qe28v9k988stffc2g0hx2xx86a2dqhvnrk6',
    },
  },
  /*
    400s
  */
  {
    name: 'respond with 400 on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint: '/utils/addresses/xpub/stonks_xpub/0/0',
    network: 'mainnet',
    response: response_400,
  },
  {
    name: 'respond with 400 on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/6d17587575a3b4f0f86ebad3977e8f7e4981faa863eccf5c1467065c74fe3435943769446dd290d103fb3d360128e86de4b47faea73ffb0900c94c6a61ef9ea2/2147483649/0',
    network: 'mainnet',
    response: response_400_1,
  },
  {
    name: 'respond with 400 on /utils/addresses/xpub/:xpub/:role/:index',
    endpoint:
      '/utils/addresses/xpub/6d17587575a3b4f0f86ebad3977e8f7e4981faa863eccf5c1467065c74fe3435943769446dd290d103fb3d360128e86de4b47faea73ffb0900c94c6a61ef9ea2/0/2147483649',
    network: 'mainnet',
    response: response_400_2,
  },
] as const;
