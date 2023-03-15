import supertest from 'supertest';
import buildFastify from '../../../../src/app.js';
import * as config from '../../../../src/config.js';
import { describe, expect, test, vi } from 'vitest';

describe('ledger service', () => {
  test('network - Mainnet', async () => {
    vi.spyOn(config, 'getConfig').mockReturnValue({
      ...config.mainConfig,
      network: 'mainnet',
    });

    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/genesis');

    // expect(response).toMatchSnapshot();
    expect(response.body).toEqual({
      active_slots_coefficient: 0.05,
      update_quorum: 5,
      max_lovelace_supply: '45000000000000000',
      network_magic: 764_824_073,
      epoch_length: 432_000,
      system_start: 1_506_203_091,
      slots_per_kes_period: 129_600,
      slot_length: 1,
      max_kes_evolutions: 62,
      security_param: 2160,
    });

    fastify.close();
  });

  test('network - Testnet', async () => {
    vi.spyOn(config, 'getConfig').mockReturnValue({
      ...config.mainConfig,
      network: 'testnet',
    });
    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/genesis');

    // expect(response).toMatchSnapshot();
    expect(response.body).toEqual({
      active_slots_coefficient: 0.05,
      update_quorum: 5,
      max_lovelace_supply: '45000000000000000',
      network_magic: 1_097_911_063,
      epoch_length: 432_000,
      system_start: 1_563_999_616,
      slots_per_kes_period: 129_600,
      slot_length: 1,
      max_kes_evolutions: 62,
      security_param: 2160,
    });

    fastify.close();
  });
});
