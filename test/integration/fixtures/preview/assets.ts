export default [
  {
    testName: 'assets/:asset - metadata coin example with onchain metadata',
    endpoints: [
      'assets/add8604a36a46446dd22281473614c5b390afbc064ff1338516b19f58424fcf2617ba79f8089f860c2ce679d14345c9b153d0c14ea0481eaa0624751',
    ],
    response: {
      asset:
        'add8604a36a46446dd22281473614c5b390afbc064ff1338516b19f58424fcf2617ba79f8089f860c2ce679d14345c9b153d0c14ea0481eaa0624751',
      policy_id: 'add8604a36a46446dd22281473614c5b390afbc064ff1338516b19f5',
      asset_name: '8424fcf2617ba79f8089f860c2ce679d14345c9b153d0c14ea0481eaa0624751',
      fingerprint: 'asset10m8zhjspkwczmmx86hq9m6gdqclzxjc494wm95',
      quantity: '10',
      initial_mint_tx_hash: '4cddc91fdfea357aa81f50be0c2d0cc839124eb9f664e8490eaa04ff9dc387a4',
      mint_or_burn_count: 1,
      onchain_metadata: {
        name: 'Optim EQT',
        image: ['ipfs://bafkreif5iapksurpzoegyxl7jybdlxbqsz2upsagu2dmbygj4qbf6cfc', 'di'],
      },
      metadata: null,
    },
  },
];
