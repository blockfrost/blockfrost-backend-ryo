export default [
  {
    testName: 'nutlink/:address nut.link oracle address',
    endpoints: [
      '/nutlink/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
    ],
    response: {
      address:
        'addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
      metadata_url: 'https://nut.link/metadata.json',
      metadata_hash: '9586368825d39caf48bc64b2ca8a8db7bffa9227a5dad8464ce499be4516498f',
      metadata: {
        ticker: 'NUTS',
        name: 'StakeNuts.com',
        description: 'StakeNuts nut.link oracle pool',
        homepage: 'https://stakenuts.com',
        address:
          'addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
      },
    },
  },
  {
    testName: 'nutlink/:address/tickers nut.link oracle address',
    endpoints: [
      '/nutlink/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t/tickers?count=3',
      '/nutlink/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t/tickers?count=3&page=1&order=asc',
    ],
    response: [
      { name: 'ADABTC', count: expect.any(Number), latest_block: expect.any(Number) },
      { name: 'ADACAD', count: expect.any(Number), latest_block: expect.any(Number) },
      { name: 'ADAEUR', count: expect.any(Number), latest_block: expect.any(Number) },
    ],
  },
  {
    testName: 'nutlink/:address/tickers/:ticker nut.link oracle address',
    endpoints: [
      '/nutlink/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t/tickers/ADAUSD?count=2&page=2',
      '/nutlink/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t/tickers/ADAUSD?count=2&page=2&order=asc',
    ],
    response: [
      {
        tx_hash: '1abe80dc1f101ff3b76659d32b532d53b21d76c98cfce0c0c3c45957680c54ff',
        block_height: 4925818,
        tx_index: 1,
        payload: [
          { value: '0.10547', source: 'coinGecko' },
          { value: '0.10663800237162917', source: 'ergoOracles' },
        ],
      },
      {
        tx_hash: 'b8cc8d75ca200555ca4efdf79599a06300c2a28ffbaa82fd23f22c8f95967bf9',
        block_height: 4925982,
        tx_index: 1,
        payload: [
          { value: '0.106359', source: 'coinGecko' },
          { value: '0.10575249137006794', source: 'ergoOracles' },
        ],
      },
    ],
  },
  {
    testName: 'nutlink/tickers/:ticker nut.link oracle address',
    endpoints: [
      '/nutlink/tickers/ADAUSD?count=2&page=2',
      '/nutlink/tickers/ADAUSD?count=2&page=2&order=asc',
    ],
    response: [
      {
        address:
          'addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
        tx_hash: '1abe80dc1f101ff3b76659d32b532d53b21d76c98cfce0c0c3c45957680c54ff',
        block_height: 4925818,
        tx_index: 1,
        payload: [
          { value: '0.10547', source: 'coinGecko' },
          { value: '0.10663800237162917', source: 'ergoOracles' },
        ],
      },
      {
        address:
          'addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
        tx_hash: 'b8cc8d75ca200555ca4efdf79599a06300c2a28ffbaa82fd23f22c8f95967bf9',
        block_height: 4925982,
        tx_index: 1,
        payload: [
          { value: '0.106359', source: 'coinGecko' },
          { value: '0.10575249137006794', source: 'ergoOracles' },
        ],
      },
    ],
  },
];
