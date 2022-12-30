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
  {
    testName: 'assets/:asset - metadata coin example with cip68 onchain metadata',
    endpoints: [
      'assets/9fd4b32460b3f63e22e1f0c4eaaf9371e5f202902e213770126b4fcb000de1406f766f3738',
    ],
    response: {
      asset: '9fd4b32460b3f63e22e1f0c4eaaf9371e5f202902e213770126b4fcb000de1406f766f3738',
      policy_id: '9fd4b32460b3f63e22e1f0c4eaaf9371e5f202902e213770126b4fcb',
      asset_name: '000de1406f766f3738',
      fingerprint: 'asset1zfn8zelp9mj4k3w8nsfr02srqxxcswj6eysh9d',
      quantity: '1',
      initial_mint_tx_hash: 'cc97a4e226e0dd3b7f01e9010feb5e30d743f15c761f49405b4d9bb60dbc19a3',
      mint_or_burn_count: 1,
      onchain_metadata: {
        CHA: '9',
        CON: '8',
        DEX: '6',
        INT: '8',
        STR: '6',
        TYPE: '3',
        WIS: '2',
        creator: 'ElRaulito',
        image: 'ipfs://QmP7Em1bqYqc1LPcRrxEYzQaTWJ8CoCwT8i31fWFfguDJQ',
        mediaType: 'image/gif',
        name: 'OVO 78',
      },
      onchain_metadata_standard: 'CIP68v1',
      metadata: null,
    },
  },
];
