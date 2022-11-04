import { getInstance } from '../../utils';
import fixtures from '../../fixtures/mainnet/pools';
import { describe, test, expect } from 'vitest';

describe('pools endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toStrictEqual(fixture.response);
      });
    });
  });

  test('/pools/retiring', async () => {
    const client = getInstance();
    const response = await client.get('/pools/retiring').json();

    expect(response).toStrictEqual(
      expect.arrayContaining([{ pool_id: expect.any(String), epoch: expect.any(Number) }]),
    );
  });

  test('/pools/delegators', async () => {
    const client = getInstance();
    const response = await client
      .get('/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/delegators')
      .json();

    expect(response).toStrictEqual(
      expect.arrayContaining([{ address: expect.any(String), live_stake: expect.any(String) }]),
    );
  });

  //
  // long running tests
  //

  // it('/pools/:pool_id', async () => {
  //   const endpointUrl = getApiUrl(
  //     '/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  //   );
  //   const response = await axios.get(endpointUrl);
  //   const responseJson = response.data;

  //   const responseCheck = {
  //     pool_id: 'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',
  //     hex: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
  //     vrf_key: 'b512cc7c1a8ba689c2d8fd27adfdbac2049a3f8f95c8b85e8298f14d7d8dc4e6',
  //     blocks_minted: expect.any(Number),
  //     live_stake: expect.any(String),
  //     live_size: expect.any(Number),
  //     live_saturation: expect.any(Number),
  //     live_delegators: expect.any(Number),
  //     active_stake: expect.any(String),
  //     active_size: expect.any(Number),
  //     declared_pledge: '510000000000',
  //     live_pledge: expect.any(String),
  //     margin_cost: 0.049,
  //     fixed_cost: '340000000',
  //     reward_account: 'stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v',
  //     owners: ['stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v'],
  //     registration: ['a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e'],
  //     retirement: [],
  //   };

  //   // expect(responseJson.blocks_minted).toBeGreaterThan(0);
  //   // Bignumber cannot be checked for positive rn
  //   // expect(responseJson.live_stake).toBeGreaterThan(0);
  //   // expect(responseJson.live_size).toBeWithin(0, 0.1);
  //   // expect(responseJson.live_saturation).toBeWithin(0, 1.5);
  //   // expect(responseJson.active_stake).toBeGreaterThan(0);
  //   // expect(responseJson.declared_pledge).toBeGreaterThan(0);
  //   // expect(responseJson.live_pledge).toBeGreaterThan(0);
  //   // expect(responseJson.margin_cost).toBeWithin(0, 1);
  //   // expect(responseJson.live_delegators).toBeGreaterThan(0);

  //   expect(responseJson).toMatchObject(responseCheck);
  // });
});
