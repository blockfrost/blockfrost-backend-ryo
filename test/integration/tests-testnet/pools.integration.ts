import { getApiUrl } from '../utils';
import fixtures from '../fixtures/fixtures-testnet/pools';
import axios from 'axios';

describe('pools endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      it(fixture.testName, async () => {
        const endpointUrl = getApiUrl(endpoint);
        const response = await axios.get(endpointUrl);
        const responseJson = response.data;

        expect(responseJson).toMatchObject(fixture.response);
      });
    });
  });

  // needs cache
  // it('pools/pool_id', async () => {
  //   const endpointUrl = getApiUrl(
  //     '/pools/pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc',
  //   );
  //   const response = await axios.get(endpointUrl);
  //   const responseJson = response.data;

  //   const responseCheck = {
  //     pool_id: 'pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc',
  //     hex: '26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed',
  //     vrf_key: 'db61b20aeb616dbc39ca36194e7a54d5cef5464c6e6d0d420cfa551f7dc43d64',
  //     blocks_minted: expect.any(Number),
  //     live_stake: expect.any(String),
  //     live_size: expect.any(Number),
  //     live_saturation: expect.any(Number),
  //     live_delegators: expect.any(Number),
  //     active_stake: expect.any(String),
  //     active_size: expect.any(Number),
  //     declared_pledge: expect.any(String),
  //     live_pledge: expect.any(String),
  //     margin_cost: expect.any(Number),
  //     fixed_cost: '340000000',
  //     reward_account: 'stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27',
  //     owners: ['stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27'],
  //     registration: ['05102775ac07354e7247c55f8b7e1b2d5ada1c32fdc363d1782b5d77da23354a'],
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
