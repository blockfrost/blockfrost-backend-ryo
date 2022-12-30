import { expect } from 'vitest';

export default [
  {
    testName: 'assets list of all assets',
    endpoints: ['assets'],
    response: [
      {
        asset: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
        quantity: '1',
      },
      {
        asset: '3a9241cd79895e3a8d65261b40077d4437ce71e9d7c8c6c00e3f658e4669727374636f696e',
        quantity: '1',
      },
      {
        asset: '02f68378e37af4545d027d0a9fa5581ac682897a3fc1f6d8f936ed2b4154414441',
        quantity: '2000000',
      },
      {
        asset: 'e8e62d329e73190190c3e323fb5c9fb98ee55f0676332ba949f29d724649525354',
        quantity: '1',
      },
      {
        asset: 'ac3f4224723e2ed9d166478662f6e48bae9ddf0fc5ee58f54f6c322943454e54',
        quantity: '10000000',
      },
      {
        asset: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b151754534c41',
        quantity: '425839369',
      },
      {
        asset: 'e12ab5cf12f95cd57b739282d06af9dd61e1b1dde1e06f0c31f0251167696d62616c',
        quantity: '42',
      },
      {
        asset: 'da8c30857834c6ae7203935b89278c532b3995245295456f993e1d244c51',
        quantity: '21000000000000',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417175616d6172696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417368',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727941756275726e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417572656c6961',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417572656f6c696e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417765736f6d65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417a756c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794265696765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426572796c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426c61636b',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426c7565',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426f6e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279427269636b',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727942726f776e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727942797a616e74696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794361646574',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943616d656c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794361707269',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943617264696e616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436572756c65616e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943686172747265757365',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436865727279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943696e6e616d6f6e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436c656d656e74696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f62616c74',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f66666565',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f72616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794379616e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727945626f6e79',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279456d6572616c64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727946756368736961',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279476f6c64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727947726179',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279477265656e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727948617a656c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727948756d62726f6c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279496e6469676f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727949726973',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794a616465',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794a657474',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794b656c6c79',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794b68616b69',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c617661',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c6176656e646572',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c656d6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c696d65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c757374',
        quantity: '1',
      },
      {
        asset: 'ca079f39e33ca1b6ec7b4f4eedffa4f40d7d111f96bde855ba224dc2444558',
        quantity: '10000000',
      },
      {
        asset: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b15174141504c',
        quantity: '9648589196',
      },
      {
        asset: 'b93822810dbd56a5b5b815b1946da690312913da74c94e019e028af97065646572',
        quantity: '5',
      },
      {
        asset: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b15174150504c45',
        quantity: '9648589196',
      },
      { asset: 'd63b50fe629b69f1da4897aee9f381fe197c30c06bf35be4355360bd6d617279', quantity: '1' },
      {
        asset: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b15175445534c41',
        quantity: '425839369',
      },
      {
        asset: 'd3501d9531fcc25e3ca4b6429318c2cc374dbdbcf5e99c1c1e5da1ff444f4e545350414d',
        quantity: '10000000',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d61726f6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d61757665',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d656c616e6965',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d656c6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d696e74',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d6f7261646f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d6f7373',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d757374617264',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d7972746c65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794e617679',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f6c697665',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f6e7978',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f72616e6765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f7263686964',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795065616368',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950656172',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950696e6b',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950697374616368696f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279506c6174696e756d',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279507572706c65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795261636b6c6579',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526173706265727279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526176656e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526564',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526f7365',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526f7578',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727952756279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279527573736574',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795275737479',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616666726f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616c6d6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616e64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795361707068697265',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279536361726c657474',
        quantity: '1',
      },
    ],
  },
  {
    testName: 'assets?queryparams list of all assets',
    endpoints: ['assets?page=2&count=2'],
    response: [
      {
        asset: '02f68378e37af4545d027d0a9fa5581ac682897a3fc1f6d8f936ed2b4154414441',
        quantity: '2000000',
      },
      {
        asset: 'e8e62d329e73190190c3e323fb5c9fb98ee55f0676332ba949f29d724649525354',
        quantity: '1',
      },
    ],
  },
  {
    testName: 'assets/:asset - Matrix Berry reference NFT',
    endpoints: [
      'assets/01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e000de1404d61747269783734',
    ],
    response: {
      asset: '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e000de1404d61747269783734',
      policy_id: '01cecfaeda9d846c08675902b55a6371f593d9239744867462c5382e',
      asset_name: '000de1404d61747269783734',
      fingerprint: 'asset1lnsxthf9078zkecyr057pf5kva6y9z75hr7f52',
      quantity: '1',
      initial_mint_tx_hash: '709ba2b7f511b3a3f03eead6f931f3e914edac03aa3cce58078376e9081ff9bc',
      mint_or_burn_count: 1,
      onchain_metadata: {
        description: '',
        id: 74,
        image: 'ipfs://QmcRUC912FgyxV8fGqJnnnMSHxkxzwmeG6s5eEMJRRF1RN',
        name: 'Matrix Berry #74',
      },
      onchain_metadata_standard: 'CIP68v1',
      metadata: null,
    },
  },
  // TODO: registry is currently flapping
  // {
  //   testName: 'assets/:asset - all hail nutcoin!',
  //   endpoints: ['assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e'],
  //   response: {
  //     asset: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
  //     policy_id: '00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae',
  //     asset_name: '6e7574636f696e',
  //     fingerprint: 'asset12h3p5l3nd5y26lr22am7y7ga3vxghkhf57zkhd',
  //     quantity: '1',
  //     initial_mint_tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
  //     mint_or_burn_count: 1,
  //     onchain_metadata: null,
  //     metadata: {
  //       name: 'nutcoin',
  //       description: 'The legendary Nutcoin, the first native asset minted on Cardano.',
  //       ticker: 'NUT',
  //       url: 'https://fivebinaries.com/nutcoin',
  //       logo: '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',
  //       decimals: null,
  //     },
  //     onchain_metadata_standard: null,
  //   },
  // },
  // {
  //   testName: 'assets/:asset - space bud with metadata update which is not the latest tx_mint',
  //   endpoints: [
  //     'assets/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  //   ],
  //   response: {
  //     asset: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc537061636542756433343132',
  //     policy_id: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
  //     asset_name: '537061636542756433343132',
  //     fingerprint: 'asset1fvqhhxjxgrlec2fanc86quyhdrrhxw0ap3x6yr',
  //     quantity: '1',
  //     initial_mint_tx_hash: 'faa2833937966c130380d1dfa20014c9a899a4d1353f5867610a73fba6dbdb2d',
  //     mint_or_burn_count: 7,
  //     onchain_metadata: {
  //       name: 'SpaceBud #3412',
  //       image: 'ipfs://QmPQWCUh9abUP2NQ2svMsRgcehez1VN6QGAcBCpuVQNdKp',
  //       type: 'Bear',
  //       traits: ['Star Suit', 'Belt', 'Sword'],
  //       arweaveId: 'h9DQz_MVMCAbKX5FX0OJrUEaM-OgFuZ_y-4nSOVXIgk',
  //     },
  //     onchain_metadata_standard: 'CIP25v1',
  //     metadata: null,
  //   },
  // },
  // {
  //   testName: 'assets/:asset - asset with hex name',
  //   endpoints: ['assets/e2bdb31c13a57d94934d01a4ca17cf3b2cac61d055637261b089c8f6dada'],
  //   response: {
  //     asset: 'e2bdb31c13a57d94934d01a4ca17cf3b2cac61d055637261b089c8f6dada',
  //     policy_id: 'e2bdb31c13a57d94934d01a4ca17cf3b2cac61d055637261b089c8f6',
  //     asset_name: 'dada',
  //     fingerprint: 'asset1zaych76n6rrw9q9306xgpu92ng40vpqmur3flu',
  //     quantity: '1',
  //     initial_mint_tx_hash: '7ffa840579680db30b5a8b4aa25642198bf02fb63e265c9021ee48f17392f33d',
  //     mint_or_burn_count: 1,
  //     onchain_metadata: null,
  //     onchain_metadata_standard: null,
  //     metadata: null,
  //   },
  // },
  // {
  //   testName: 'assets/:asset - non-valid according to https://cips.cardano.org/cips/cip25/',
  //   endpoints: [
  //     'assets/0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673033323839',
  //   ],
  //   response: {
  //     asset: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673033323839',
  //     policy_id: '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04',
  //     asset_name: '756e7369673033323839',
  //     fingerprint: 'asset1fvqdhv6t92f37qrx303rzf4t7mze8gj7ttpeta',
  //     quantity: '1',
  //     initial_mint_tx_hash: '8a90035365879467fe8355730410ae7032b54a4cf9e76b2ad4dbee122a3056ad',
  //     mint_or_burn_count: 1,
  //     onchain_metadata: {
  //       image: 'ipfs://Qmdyx14QbRyBCZREkJLmyn2Cku4watkydXcXGSyV78D98i',
  //       files: [
  //         { src: 'ipfs://QmPTjWSx2NqpCfr88vv9MEckvBFFp42eDQf2oF1R9iBJKL', mediatype: 'image/png' },
  //       ],
  //       title: 'unsig_03289',
  //       series: 'unsigned_algorithms',
  //       unsigs: {
  //         index: 3289,
  //         num_props: 4,
  //         properties: {
  //           colors: ['Blue', 'Green', 'Red', 'Red'],
  //           rotations: ['0', '180', '180', '270'],
  //           multipliers: ['0.5', '1', '2', '2'],
  //           distributions: ['Normal', 'CDF', 'CDF', 'CDF'],
  //         },
  //       },
  //       source_key: [
  //         '721',
  //         '0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04',
  //         'unsig00000',
  //         'files',
  //         'code',
  //       ],
  //       source_tx_id: 'e4a90da18935e73f7fd6ffaa688b35b011a1a8a710b47bdb5d7103a05afc0197',
  //     },
  //     onchain_metadata_standard: null,
  //     metadata: null,
  //   },
  // },
  // {
  //   testName: 'assets/:asset - general asset',
  //   endpoints: ['assets/12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b1517414441'],
  //   response: {
  //     asset: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b1517414441',
  //     policy_id: '12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b1517',
  //     asset_name: '414441',
  //     fingerprint: 'asset163klk5xrd8hmv79jffse23nhcj8y5g4h6c42lz',
  //     quantity: expect.any(String),
  //     initial_mint_tx_hash: '2a3202c2c1f10edbe8df77fa872603055d62e5aee5e2c8f671f58791bcbf436a',
  //     mint_or_burn_count: expect.any(Number),
  //     onchain_metadata: null,
  //     onchain_metadata_standard: null,
  //     // @ts-expect-error test
  //     metadata: expect.toBeTypeOrNull(JSON),
  //   },
  // },
  // {
  //   testName: 'assets/:asset - metadata coin example with onchain metadata',
  //   endpoints: [
  //     'assets/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616e64',
  //   ],
  //   response: {
  //     asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616e64',
  //     policy_id: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
  //     asset_name: '426572727953616e64',
  //     fingerprint: 'asset120gt4gr9k5kzy2eq77rrstlrtg0m7aap93kkag',
  //     quantity: '1',
  //     initial_mint_tx_hash: '6556b532acf59835084f62d30675f3a55b78c61959bca44a86ea02c320fbf822',
  //     mint_or_burn_count: 1,
  //     onchain_metadata: {
  //       name: 'Berry Sand',
  //       image: 'ipfs://ipfs/QmXhvddYsApbgyKjKwHzfuUwxxJBe5d76hGJSUaxBaK4hh',
  //       color: '#C2B280',
  //     },
  //     onchain_metadata_standard: 'CIP25v1',
  //     metadata: null,
  //   },
  // },
  // {
  //   testName: 'assets/:asset - asset with metadata',
  //   endpoints: [
  //     'assets/026a18d04a0c642759bb3d83b12e3344894e5c1c7b2aeb1a2113a570390dbfc3f92cdaebc581ec7c28e35da8b92c87cabf981511698df52d7ea61c70',
  //   ],
  //   response: {
  //     asset:
  //       '026a18d04a0c642759bb3d83b12e3344894e5c1c7b2aeb1a2113a570390dbfc3f92cdaebc581ec7c28e35da8b92c87cabf981511698df52d7ea61c70',

  //     policy_id: '026a18d04a0c642759bb3d83b12e3344894e5c1c7b2aeb1a2113a570',
  //     asset_name: '390dbfc3f92cdaebc581ec7c28e35da8b92c87cabf981511698df52d7ea61c70',
  //     fingerprint: 'asset1ke7qqcjpmjpyqjjzmgc4vskrcflvv6r79s0vk7',
  //     quantity: '9223372036854774807',
  //     initial_mint_tx_hash: 'ce31065a46c865fb99cd5602eed7021e7a77d44d85a6b7ead142dd10130494d5',
  //     mint_or_burn_count: 1,
  //     onchain_metadata: null,
  //     onchain_metadata_standard: null,
  //     metadata: {
  //       name: 'WingRiders ADA - USDT',
  //       description: 'WingRiders ADA - USDT (Nomad) liquidity provider token',
  //       ticker: null,
  //       decimals: 0,
  //       url: 'https://www.wingriders.com',
  //       logo: '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',
  //     },
  //   },
  // },
  {
    testName: 'assets/:asset/history - all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/history',
    ],
    response: [
      {
        tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
        action: 'minted',
        amount: '1',
      },
    ],
  },
  {
    testName: 'assets/:asset/history?queryparams - general asset',
    endpoints: [
      'assets/12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b1517414441/history?count=1',
      'assets/12e65fa3585d80cba39dcf4f59363bb68b77f9d3c0784734427b1517414441/history?count=1&page=1',
    ],
    response: [
      {
        tx_hash: '2a3202c2c1f10edbe8df77fa872603055d62e5aee5e2c8f671f58791bcbf436a',
        action: 'minted',
        amount: '45000000000',
      },
    ],
  },
  {
    testName: 'assets/:asset/txs -  all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs',
    ],
    response: [
      'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
      'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
      '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
      'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
      '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
      '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    ],
  },
  {
    testName: 'assets/:asset/transactions -  all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs',
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/txs?count=6&page=1&order=asc',
    ],
    response: [
      'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
      'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
      '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
      'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
      '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
      '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
    ],
  },

  {
    testName: 'assets/:asset/transactions -  all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions',
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions?count=6&page=1&order=asc',
    ],
    response: [
      {
        tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
        tx_index: 8,
        block_height: 5406748,
        block_time: 1614635257,
      },
      {
        tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
        tx_index: 12,
        block_height: 5602653,
        block_time: 1618666110,
      },
      {
        tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
        tx_index: 3,
        block_height: 5616031,
        block_time: 1618938881,
      },
      {
        tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
        tx_index: 3,
        block_height: 5633144,
        block_time: 1619290972,
      },
      {
        tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
        tx_index: 2,
        block_height: 5640905,
        block_time: 1619448344,
      },
      {
        tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
        tx_index: 27,
        block_height: 5746642,
        block_time: 1621596098,
      },
    ],
  },
  {
    testName: 'assets/:asset/transactions?queryparams -  all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions?order=desc',
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions?count=6&page=1&order=desc',
    ],
    response: [
      {
        tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
        tx_index: 27,
        block_height: 5746642,
        block_time: 1621596098,
      },
      {
        tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
        tx_index: 2,
        block_height: 5640905,
        block_time: 1619448344,
      },
      {
        tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
        tx_index: 3,
        block_height: 5633144,
        block_time: 1619290972,
      },
      {
        tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
        tx_index: 3,
        block_height: 5616031,
        block_time: 1618938881,
      },
      {
        tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
        tx_index: 12,
        block_height: 5602653,
        block_time: 1618666110,
      },
      {
        tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
        tx_index: 8,
        block_height: 5406748,
        block_time: 1614635257,
      },
    ],
  },
  {
    testName: 'assets/:asset/transactions?queryparams -  all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions',
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions?order=asc',
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/transactions?count=6&page=1&order=asc',
    ],
    response: [
      {
        tx_hash: 'e252be4c7e40d35919f741c9649ff207c3e49d53bb819e5c1cb458055fd363ed',
        tx_index: 8,
        block_height: 5406748,
        block_time: 1614635257,
      },
      {
        tx_hash: 'c38a0892729d071242b89ddd0069eb7c3b6cb0eb7170f040c4b59020b2081a0f',
        tx_index: 12,
        block_height: 5602653,
        block_time: 1618666110,
      },
      {
        tx_hash: '09869a301892df7020e0b54a838e53821e304d2fcf64c9aa00902d8bce92a4c3',
        tx_index: 3,
        block_height: 5616031,
        block_time: 1618938881,
      },
      {
        tx_hash: 'd02d83d6e327f558cd8fef770900065d904f8cf5f61f9eef3e06ad98f0ecb2ef',
        tx_index: 3,
        block_height: 5633144,
        block_time: 1619290972,
      },
      {
        tx_hash: '9d2d313b77c7524c50e09ef96b4ed0a2a384f7caa052d430a53a0db272b11987',
        tx_index: 2,
        block_height: 5640905,
        block_time: 1619448344,
      },
      {
        tx_hash: '91254a41b9b9a23e2de5f498d41696460d751355d2ffafc2401b11b9b0556033',
        tx_index: 27,
        block_height: 5746642,
        block_time: 1621596098,
      },
    ],
  },
  {
    testName: 'assets/:asset/addresses - all hail nutcoin!',
    endpoints: [
      'assets/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e/addresses',
    ],
    response: [
      {
        address:
          'addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w',
        quantity: '1',
      },
    ],
  },
  {
    testName: 'assets/policy/:policy_id?queryparams - general asset',
    endpoints: [
      'assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f',
      'assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f?page=1',
      'assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f?page=1&count=100',
      'assets/policy/b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f?page=1&count=100&order=asc',
    ],
    response: [
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416c6261',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279416d657468797374',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417175616d6172696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417368',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727941756275726e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417572656c6961',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417572656f6c696e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417765736f6d65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279417a756c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794265696765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426572796c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426c61636b',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426c7565',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279426f6e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279427269636b',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727942726f776e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727942797a616e74696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794361646574',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943616d656c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794361707269',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943617264696e616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436572756c65616e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943686172747265757365',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436865727279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727943696e6e616d6f6e',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436c656d656e74696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f62616c74',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f66666565',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279436f72616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794379616e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727945626f6e79',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279456d6572616c64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727946756368736961',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279476f6c64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727947726179',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279477265656e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727948617a656c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727948756d62726f6c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279496e6469676f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727949726973',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794a616465',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794a657474',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794b656c6c79',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794b68616b69',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c617661',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c6176656e646572',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c656d6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c696d65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794c757374',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d61726f6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d61757665',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d656c616e6965',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d656c6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d696e74',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d6f7261646f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d6f7373',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d757374617264',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794d7972746c65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794e617679',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f6c697665',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f6e7978',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f72616e6765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272794f7263686964',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795065616368',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950656172',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950696e6b',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727950697374616368696f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279506c6174696e756d',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279507572706c65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795261636b6c6579',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526173706265727279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526176656e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526564',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526f7365',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279526f7578',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727952756279',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279527573736574',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795275737479',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616666726f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616765',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616c6d6f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953616e64',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795361707068697265',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279536361726c657474',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795369656e6e61',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953696c766572',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953696e6f706961',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727953756e676c6f77',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727954616e67656c6f',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795465616c',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279546f6d61746f',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727954757271756f697365',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727956616e696c6c61',
        quantity: '1',
      },
      {
        asset:
          'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f42657272795665726d696c696f6e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727956696f6c6574',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f4265727279566972696469616e',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727957696e65',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727958616e616475',
        quantity: '1',
      },
      {
        asset: 'b863bc7369f46136ac1048adb2fa7dae3af944c3bbb2be2f216a8d4f426572727959656c6c6f77',
        quantity: '1',
      },
    ],
  },

  //
  // long running tests
  //

  // {
  //   testName: 'assets/:asset/transactions?queryparams -  spacecoin - many txs',
  //   endpoints: [
  //     'assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73/txs?count=3&page=10000',
  //   ],
  //   response: [
  //     '274e9e08ecc865b0b9fd0e6fe3fc97a0d0db7ee2dcb77591f6e40e68d31a36df',
  //     'd0a12fdc50bf000d026d5483cabcd5a6e741bde8f963be74dc5ccf2ef46b7f63',
  //     '6782e181105f06cd48206ed5d7c43c649b487290ee1771503b97ad7cab8549a8',
  //   ],
  // },
  // {
  //   testName: 'assets/:asset/transactions?queryparams -  spacecoin - many transactions',
  //   endpoints: [
  //     'assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73/transactions?count=3&page=10000',
  //   ],
  //   response: [
  //     {
  //       tx_hash: '274e9e08ecc865b0b9fd0e6fe3fc97a0d0db7ee2dcb77591f6e40e68d31a36df',
  //       tx_index: 11,
  //       block_height: 5774295,
  //       block_time: 1622148685,
  //     },
  //     {
  //       tx_hash: 'd0a12fdc50bf000d026d5483cabcd5a6e741bde8f963be74dc5ccf2ef46b7f63',
  //       tx_index: 9,
  //       block_height: 5774338,
  //       block_time: 1622149297,
  //     },
  //     {
  //       tx_hash: '6782e181105f06cd48206ed5d7c43c649b487290ee1771503b97ad7cab8549a8',
  //       tx_index: 14,
  //       block_height: 5774362,
  //       block_time: 1622149715,
  //     },
  //   ],
  // },
  // {
  //   testName: 'assets/:asset/txs?queryparams - spacecoin huge asset',
  //   endpoints: [
  //     'assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73/txs?count=100&page=2',
  //     'assets/d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73/txs?page=2',
  //   ],
  //   response: [
  //     '7460d8e7f9f9d8955cd7f41f8fd8f59fe507faa918d6e5c20bc55ec74564cef2',
  //     '7df145f3ab8e2a8a8c85c95a4d191371f6dad74f276e7d5a68346f6bdc6d08ae',
  //     'aa24e382775fecfd854dcd09296d6d8f480827a8cef9d31ec9e832df537e1443',
  //     '666aab51362f80d385810e2f09159d02b79c4ee14feac6cbaa5ae3824e3a8d63',
  //     '123308ea9f2ba624f427397361bff90d04ff03574fbff153b9088aebec162faf',
  //     '504c18825286780901ac3ab9367637ef0ddcc370779b44ee154fb82bc56c3fa9',
  //     'fed8398363fa9267562b8ee7effea8857f9aaf828fb1053e3fe87719a88f8684',
  //     'a6df5688777a7c7f293b60faf4ff4ef08a99e876f38212302b4730010e3957a8',
  //     '29a5defaae3544d53317b268dfd7e671702b5d555cc7eafd800f4a284e7f65dd',
  //     '8537840b9d5dcc537fb36ae9bfbe1be8e4763e1c98bf23df3910565568c4fb25',
  //     '0a51351a058e399ac094c885cdfc0ac1e12035ee30947c58f11ff946853dcbaa',
  //     '1226e5fcb9e949efbdb56fc245f41c4b38ed54445dc193bc3cf5c1bcda19b76b',
  //     'a935c1ebb082770185f22d6e99c3ee8107a3e90fe65d2e205634c82e1723575f',
  //     'cc966d5f1cb49bafa1492b3b8eb310943cb433182a622e151e70fcbedafd547d',
  //     'df4d736eea4624272d393232f055b9735ae0cc0ade6e0cbf7e787b9d17a81400',
  //     '0f7a6536d23cbcd4862d0a1045a02f2878028fc1964eea95aa3ee18698c7fa55',
  //     '85f2c143c8eddd0507e7d01b80de0256054c94f195eef7ccbf2fdf6fe8f33dba',
  //     '241728e29f77120ee95b5a64f8e31a7ce1818eafc91faca57ad9abc2a5b2b5a2',
  //     'cff26f211b1d41bcde40e58cf8220c62f6e7e93db8bb006d29c7bde890f73111',
  //     '563dc1339ba03964c257a88334ae903ab8df378a61b203acf390dc965a42bce2',
  //     'd20c0703924149ca3c500c4781e75addd3f4ee239959a95b532e53bb43bcdd37',
  //     '6324a9b6dcfee3ec6cd51a762ca971762b736f950f561b26b6f1273e8968d604',
  //     'd0974592bfb9bd5d1dca714da5ad4c9fe4f1f3aeee9f6f73d287bdefc5853f91',
  //     'a1d51ab96fbd1f78a22800996074f0f1c18989396ee0461235c60d151f1ab96a',
  //     'a1aba61bf148af8816ffa51fd8385531af8b8bdc2f42bc361d528b22c2fa7634',
  //     '37d36c91d5e6b264123c45a9fb0af3b365eecba06d982bed029ea15b1ac4a9ce',
  //     '7b4e3ced7669a19570b160ea772300e39e4a80c7cbefc042cf2fd221787465dd',
  //     'f70cecd821efd822c4acd9be235e422f72367840928b3c7448f74b969bf5097b',
  //     '70f94ca53c27a0487d7884ac8d7bf90039d6f1e75ae27540f5a1ae89ffa6dd80',
  //     '23925cdddb401f21c59214f710142722588b682d2fb52af5feb66c31d973a416',
  //     'a84c175d69c136a08e7a90b64d9bada648c4244026f28a5234c00f861f2036f2',
  //     'b1b4bae7173955c8d788cd993c72fbd56f526d3a8d7147b79a511a8c34f0df52',
  //     '536ecffe44b30d2c89aec7a30cbfa0a3c1a8b68ca97159b22b685a150e9140d5',
  //     '06c6c3f75a4ae46dba48927fb46e663174fc77f88fc3a20642f4df60934d9e5a',
  //     'be4680e0264ffc3b3b3c787ff9523d61cc1a7a7f9d21c660db828e0e52c87b2a',
  //     '10fc9a3c49752dafa6d517b8bad94e5679c97090ae92eba48dad7f864d7329e6',
  //     'cff718a87398a56da311e0bbd86010321f7e8e4bf2d8887a0e9ccf8ad545aaa1',
  //     '529a44e8405550b1c9e26d73ccab0f6a039add5e6face598ad6815c6f7b0a638',
  //     '04177d1bd05692b4df426a8d41168e1926054e5dfbeabfa7370f79cc06da9398',
  //     '64d74c014bbbe49b7ca775c17a04c2ccffd9de5ae5e019820f3eee1fff23d347',
  //     '0bfc13a44339f89d8a2fe5a163d9e7502fa3415063af4737c78eee0a4963b9a5',
  //     '750f16017686b508c5b587efaf1ef494c25a9de283ecdb9678fe3f4b819892b6',
  //     '80d2552027bbdaf7d63523b304946b045832b955a5533c38389ad5aa811fc28b',
  //     '855dc5e02c1606f2cccb3b4e1a66d087f2bd09a797e5e0862a13792b29fbd846',
  //     '02c519ae349c1d335c88d13d03a07b0ac3edcfaa8ca660d60b7ba285baa8e74e',
  //     'fc6def108712a4cdaea864a1962cb73f7af7dd4bdd25b6f975c1fe115f64c556',
  //     '3c97be8bd22ac83737a0a18e42a08429ea14f7e337c185b643db5298734b8149',
  //     'c3dce1d58e1d5c50529b77d593de240b174e993764efa41a6b3e1640ce722ed4',
  //     '6593b85c7509cc7e92eed37a7ae4843d85c47cab3a6d6bc1a0b12fd2568991f7',
  //     '384225989ea110b04e23a175f93207536809a048bd7dda24213a50825989ab73',
  //     'c87f7f4aa5893b2ff9c15505f73b11528f99ae7b4cd6985ded950bf0a6fd8e9c',
  //     'a75c2e97c4709bfa03b0a00f6f93d02ebf8036083df3ec87e42bf38f3862b343',
  //     '3fe8ed7af1dd325bb0d467f100bc54171d1b22d80d22b84f0a0843c070e6f304',
  //     '86207f5c1a30149fc54712c34e4ca91130e1fc552e0b2ae0542d27b7ad661fdb',
  //     'd7a3a1c925c605999acb14d4b29172ffc13bb791cf91097200c0e5cfe0736fc4',
  //     '84598c1c0f6e8c6235aadcbc06cd5192c86da357f91cd419e95b54e93508de96',
  //     '55d68c60c07debedce87ff747fadf8f85ddafc1da4b601f1833e3d90c1a593b5',
  //     '02aa058c64b87348bc6b2be55cf9a6e9880b23227b23d5297bfde7eff380a1fd',
  //     'ee20933d5817ae8a14e3040c29278d3cbaad941ac48eb810bd6ffdadc483fc45',
  //     '9a166f7c51d0d16a11e0ff8ba9face7114ee579d87998daf6089b578a3141d31',
  //     'f5b4ced60d9d6e03a6afa90aa4c856c2358c936c4e4165d6ce2917b12243cb36',
  //     'f7f33fab38876fb065ea075131d9ba3558ec6bf7a7b2721a00fbb175d811331e',
  //     '4b4bf4d05c8234e45f91d2a145b5e55b1c110da82058ce8155198489a3153486',
  //     '60c7b032496acb111d5b76f30b780f5a652c995413692e8f7dab49b072b62aec',
  //     '59dc35df491c9f38f7fc8cd0a8868ff5d8271f008c2e71a6dfb9242b2a787f74',
  //     'd6ffe7ca3850a8bfc7457c692f8873da964f9a6c968f38c6668df3d5edece58c',
  //     'fea3fd1f99be58302fb7c3c9b2dbb8c52b41070c57e70bf5a17e47d2ed33d3a9',
  //     '64f96d94fc02e321be63f032eb376e7df3b2827dcb7f40a109c97697852dc45e',
  //     'afecc6ceaeafac6be6b86b8309f8b6c8a3c4600682a4bdedd0ed1efe35635627',
  //     '227cecdb65ca126dd60399b4140849673a8e58fd9aeb2dd4b479df3b8bf029f0',
  //     '77f20ebeb307837daa595eac82cfd3bd55bceb0e84e904f3a0af7c44966e776d',
  //     'b0539c331f41dca140a1ee806c3aefd7ab5c436fcf65b317215b165b814f60b2',
  //     '69ff5019bcb9cf143081f95abbebe2139866472d300f1d28df26ed1320154976',
  //     '453a36d3e8ee384fc2f89c72d54c8b666bfef9fa0e3c7131b870979da1cd829d',
  //     'ed703a4d027d204d289a042e26eb431d73961d4c722183b85e80fb88ae23cce3',
  //     '9b5560bdfee0f8c0a56a6de89737814a13c7c8d667098fc9e622bb7070858841',
  //     '0ffa4a7b60bfafae5a83f569fc49a5188137cbf2e38fa21d56914e76aca3d4c8',
  //     '11bbf686d278fc56a21503f91dbfc574d25f99190c5140fab120ecb4b5990709',
  //     'afe211cce8df49f79ebcafacf475b84b32827689485475fdc3f4796ed87fe770',
  //     '1b743354f9799e5ffc9d3ba6eb2c1d03769e37aec10bed2b1e10ba7f004df59f',
  //     '02530c01b950acf02431d9a87c9fcd658557db84cfac6de4800d5915ace80e60',
  //     '44a49ae98d3393296c784cc76f416175b28f41f529a2e6680b1387c8e8921e22',
  //     '0a0fb8c8f1c1c56be1e8b02fab4e84425aa6065bae37174d81f4d39f1b51801c',
  //     'eee89554bbde1b4c2d0b4095a785d8715f411981e777f45c7a38fbe61105463b',
  //     'acd340b85f3ac73d31d230d6a95b7fda6bf8375ade77e79d3052579637841a47',
  //     'eee55770d106618f898667691821222df9c015dc1f687a3d5bdc218b6c4071a4',
  //     '146cad40bfa510c69b1ca82d8c5e521239bb0aaae1d95e71dc1a0cce95d51e99',
  //     '2ff485c6c13dbf092ec7ba417124db5c9e59c73e4099a028b1f9c346c3ffc3c4',
  //     '23ddc4b7ebf4b5d63c7c3b614659ad92e11061277234d8e7b229a01aef147ee5',
  //     '62504448791970ff9b4a4a4ae01266a3a87cf3914e94a0c53f13e7c276fb3c83',
  //     'e795f34d43c40c2c76a199af3fd507f6991c7b468af33d62b603cad4c89cf437',
  //     '036ca336fe374d2ad75cc8cd1abfb4f564edfd046f34a9c40604d211d2b7a2b7',
  //     '94370f30dafaef19bd91be04cf42ae3d6803a5b6756526f4b0250b98aa68e936',
  //     '39cec0ae48e78848e0c849ab965414845ed46283e6776d30bdba85ef6e679578',
  //     '1cebceb80bb1ee7e1a497befcf906dddcc2ebb6fd43e7e9a7ad1bc1451e37381',
  //     '012ea70cd4524e4e54da533fc65f5d88ecfdfd659b0ae396d6c076f966eb6d8f',
  //     '967ca74a94e1a300b128efd87566128817b630f24c424a32afc5b3b8be60228f',
  //     '636a27448588310c62263f3c82dda1c9320abab7a8b975d89e145deff9313e58',
  //     'c5b8d9dc3f5d296e20bc0fe4eea0ea9ef41e21fbe9d4fa97ff718675d2e9299b',
  //     '688670c8edb23cc00aa7a6610b3d2dcf3ee9a726a2eb774d20fc3197cdeb2ea4',
  //   ],
  // },
];
