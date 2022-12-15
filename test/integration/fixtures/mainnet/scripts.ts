export default [
  {
    testName: 'scripts/:hash - blockfrostHello',
    endpoints: ['scripts/4f590a3d80ae0312bad0b64d540c3ff5080e77250e9dbf5011630016'],
    response: {
      script_hash: '4f590a3d80ae0312bad0b64d540c3ff5080e77250e9dbf5011630016',
      type: 'plutusV1',
      serialised_size: 2739,
    },
  },
  {
    testName: 'scripts/:hash/cbor - AlwaysSucceeds',
    endpoints: ['scripts/67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656/cbor'],
    response: {
      cbor: '4d01000033222220051200120011',
    },
  },
  {
    testName: 'scripts/:hash/json - AlwaysSucceeds json should be null',
    endpoints: ['scripts/67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656/json'],
    response: {
      json: null,
    },
  },
  {
    testName: 'scripts/datum/:hash - random datum',
    endpoints: ['scripts/datum/fe9af0a9392b6b2435a3be352c20c5034452fad062895493a88aa1ffb6c08826'],
    response: {
      json_value: {
        fields: [
          { bytes: '4a1e7332045dace10c7aebf2a960e45f73fc2796e21fd1b034f60776' },
          { int: 7999000000 },
          { bytes: 'c364930bd612f42e14d156e1c5410511e77f64cab8f2367a9df544d1' },
          { bytes: '426f7373436174526f636b6574436c756239323033' },
          { bytes: 'f10608451aaad361761cf6d62f8eede24c8f16fb4362610e56da2555' },
          { int: 30 },
        ],
        constructor: 0,
      },
    },
  },
  {
    testName: 'scripts/datum/:hash/cbor - random datum',
    endpoints: [
      'scripts/datum/fe9af0a9392b6b2435a3be352c20c5034452fad062895493a88aa1ffb6c08826/cbor',
    ],
    response: {
      cbor: 'd866820086581c4a1e7332045dace10c7aebf2a960e45f73fc2796e21fd1b034f607761b00000001dcc70dc0581cc364930bd612f42e14d156e1c5410511e77f64cab8f2367a9df544d155426f7373436174526f636b6574436c756239323033581cf10608451aaad361761cf6d62f8eede24c8f16fb4362610e56da2555181e'
    },
  },
];
