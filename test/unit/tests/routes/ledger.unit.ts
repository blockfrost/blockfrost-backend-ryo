import supertest from 'supertest';
import buildFastify from '../../../../src/app';
import jestOpenAPI from 'jest-openapi';
import path from 'path';
import sinon from 'sinon';
import * as config from '../../../../src/config';

jestOpenAPI(path.join(__dirname, '../../../../node_modules/@blockfrost/openapi/openapi.yaml'));

describe('ledger service', () => {
  test('network - Mainnet', async () => {
    const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
      ...config.mainConfig,
      network: 'mainnet',
    });
    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/genesis');

    expect(response).toSatisfyApiSpec();
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

    sinonConfigStub.restore();
    fastify.close();
  });

  test('network - Testnet', async () => {
    const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
      ...config.mainConfig,
      network: 'testnet',
    });
    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/genesis');

    expect(response).toSatisfyApiSpec();
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

    sinonConfigStub.restore();
    fastify.close();
  });
});
