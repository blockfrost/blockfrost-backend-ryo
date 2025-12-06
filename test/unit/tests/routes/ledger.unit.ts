import supertest from 'supertest';
import buildFastify from '../../../../src/app.js';
import * as config from '../../../../src/config.js';
import { describe, expect, test, vi } from 'vitest';

describe('ledger service', () => {
  test('network - Mainnet', async () => {
    vi.stubEnv('BLOCKFROST_CONFIG_NETWORK', 'mainnet');
    vi.spyOn(config, 'getConfig').mockReturnValue(config.loadConfig());

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

  test('network - preview', async () => {
    vi.stubEnv('BLOCKFROST_CONFIG_NETWORK', 'preview');
    vi.spyOn(config, 'getConfig').mockReturnValue(config.loadConfig());

    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/genesis');

    // expect(response).toMatchSnapshot();
    expect(response.body).toEqual({
      active_slots_coefficient: 0.05,
      update_quorum: 5,
      max_lovelace_supply: '45000000000000000',
      network_magic: 2,
      epoch_length: 86400,
      system_start: 1666656000,
      slots_per_kes_period: 129_600,
      slot_length: 1,
      max_kes_evolutions: 62,
      security_param: 432,
    });

    fastify.close();
  });
});
