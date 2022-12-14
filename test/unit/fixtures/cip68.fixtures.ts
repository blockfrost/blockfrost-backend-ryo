export const fromLabel = [
  { description: 'min value', payload: '00000000', result: 0 },
  { description: 'in between', payload: '02b670b0', result: 11111 },
  { description: 'max value', payload: '0ffff240', result: 65535 },
  { description: 'max value', payload: '0ffff240', result: 65535 },
  { description: 'invalid label', payload: 'invalidlabel', result: null },
];

export const toLabel = [
  { description: 'min value', payload: 0, result: '00000000' },
  { description: 'in between', payload: 11111, result: '02b670b0' },
  { description: 'max value', payload: 65535, result: '0ffff240' },
  { description: 'value out of range throws', payload: 999999, result: Error },
];

export const toUTF8OrHex = [
  {
    description: 'Matrix Berry #99',
    payload: '4d617472697820426572727920233939',
    result: 'Matrix Berry #99',
  },
  {
    description: 'empty string',
    payload: '',
    result: '',
  },
  {
    description: 'invalid utf-8',
    payload: 'e03e382e7e637866',
    result: 'e03e382e7e637866',
  },
];

export const toCip68Assets = [
  {
    description: 'get all labels from reference nft',
    payload: '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e000643b04d61747269783734',
    result: {
      reference_nft:
        '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e000643b04d61747269783734',
      // ft does not exist
      ft: '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e0014df104d61747269783734',
      // nft exists
      nft: '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e000de1404d61747269783734',
    },
  },
];

export const getMetadataFromOutputDatum = [
  {
    description: 'Matrix Berry reference NFT datum',
    payload:
      'd8799fa4446e616d65504d61747269782042657272792023393945696d6167655835697066733a2f2f516d594e795162774c4359766a503734334a6e756431626f7a6346504453584679594e59556d66516a597335415142696418634b6465736372697074696f6e4001ff',
    result: {
      metadata: {
        description: '',
        id: 99,
        image: 'ipfs://QmYNyQbwLCYvjP743Jnud1bozcFPDSXFyYNYUmfQjYs5AQ',
        name: 'Matrix Berry #99',
      },
      version: 1,
    },
  },
  {
    description: 'jano je najlepsi reference NFT datum',
    payload:
      'd8799fa4446e616d65506A616E6F206A65206E616A6C6570736945696d6167655835697066733a2f2f516d594e795162774c4359766a503734334a6e756431626f7a6346504453584679594e59556d66516a597335415142696418634b6465736372697074696f6e4001ff',
    result: {
      metadata: {
        description: '',
        id: 99,
        image: 'ipfs://QmYNyQbwLCYvjP743Jnud1bozcFPDSXFyYNYUmfQjYs5AQ',
        name: 'jano je najlepsi',
      },
      version: 1,
    },
  },
  {
    description: 'NFT datum with non-utf8 name (cr28 at the end of the name)',
    payload:
      'd8799fa4446e616d65504d61747269782042657272792023c32845696d6167655835697066733a2f2f516d594e795162774c4359766a503734334a6e756431626f7a6346504453584679594e59556d66516a597335415142696418634b6465736372697074696f6e4001ff',
    result: {
      metadata: {
        description: '',
        id: 99,
        image: 'ipfs://QmYNyQbwLCYvjP743Jnud1bozcFPDSXFyYNYUmfQjYs5AQ',
        name: '4d61747269782042657272792023c328',
      },
      version: 1,
    },
  },
];
