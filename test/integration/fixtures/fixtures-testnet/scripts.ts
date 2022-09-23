export default [
  {
    testName: 'scripts/:hash - blockfrostHello',
    endpoints: ['/scripts/4f590a3d80ae0312bad0b64d540c3ff5080e77250e9dbf5011630016'],
    response: {
      script_hash: '4f590a3d80ae0312bad0b64d540c3ff5080e77250e9dbf5011630016',
      type: 'plutusV1',
      serialised_size: 2739,
    },
  },
  {
    testName: 'scripts/:hash/redeemers - blockfrostHello redeemers',
    endpoints: ['/scripts/4f590a3d80ae0312bad0b64d540c3ff5080e77250e9dbf5011630016/redeemers'],
    response: [
      {
        tx_hash: 'b9bfc67b144f7776710e6662fdf0397e5e54ac8bc1ecc785c344768f8edfed6f',
        tx_index: 0,
        purpose: "spend",
        datum_hash: "5a595ce795815e81d22a1a522cf3987d546dc5bb016de61b002edd63a5413ec4",
        redeemer_data_hash: "5a595ce795815e81d22a1a522cf3987d546dc5bb016de61b002edd63a5413ec4",
        unit_mem: "520448",
        unit_steps: "211535239",
        fee: "45282",
      },
    ]
  },
  {
    testName: 'scripts/datum/:hash - blockfrostHello datum (via redeemer)',
    endpoints: ['/scripts/datum/5a595ce795815e81d22a1a522cf3987d546dc5bb016de61b002edd63a5413ec4'],
    response: {
      json_value: {
        bytes: "3c33",
      },
    },
  },
  {
    testName: 'scripts/datum/:hash - from redeemer_data table',
    endpoints: ['/scripts/datum/bb30a42c1e62f0afda5f0a4e8a562f7a13a24cea00ee81917b86b89e801314aa'],
    response: {
      json_value: {
        int: 2,
      },
    },
  },
  {
    testName: 'scripts/datum/:hash/cbor - from redeemer_data table',
    endpoints: ['/scripts/datum/bb30a42c1e62f0afda5f0a4e8a562f7a13a24cea00ee81917b86b89e801314aa/cbor'],
    response: {
      cbor: "02",
    },
  },
  {
    testName: 'scripts/:hash/cbor - AlwaysSucceeds',
    endpoints: ['/scripts/67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656/cbor'],
    response: {
      cbor: '4e4d01000033222220051200120011',
    },
  },
  {
    testName: 'scripts/:hash/json - random timelock',
    endpoints: ['/scripts/476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c3/json'],
    response: {
      json: {
        type: "sig",
        keyHash: "8ed9e675aaf99868736c372d5eac9f5b3deae4568f0cde6a7d9e1422",
      },
    },
  },

];
