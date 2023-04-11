import { readFileSync } from 'node:fs';
import { FastifyRequest } from 'fastify';
import { ByronEraParameters } from '../types/common.js';
import * as ResponseTypes from '../types/responses/ledger.js';
import { getConfig } from '../config.js';

const { customNetworkConfig } = getConfig();

export const standardSafeZone = (securityParameter: number, activeSlotsCoeff: number) =>
  (3 * securityParameter) / activeSlotsCoeff;

export const isUnpaged = (request: FastifyRequest): boolean => {
  return !!request.headers['unpaged'];
};

export const loadShelleyCustomConfig = (): ResponseTypes.Ledger => {
  if (!customNetworkConfig.genesisShelleyPath)
    throw new Error('Invalid custom network `genesisShelleyPath` in the config.');

  try {
    const data = readFileSync(customNetworkConfig.genesisShelleyPath, 'utf8');

    const shelleyGenesis = JSON.parse(data);
    const dateObject = new Date(shelleyGenesis['systemStart']);
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000); // millis to seconds

    return {
      active_slots_coefficient: shelleyGenesis['activeSlotsCoeff'],
      update_quorum: shelleyGenesis['updateQuorum'],
      max_lovelace_supply: shelleyGenesis['maxLovelaceSupply'],
      network_magic: shelleyGenesis['networkMagic'],
      epoch_length: shelleyGenesis['epochLength'],
      system_start: unixTimestamp,
      slots_per_kes_period: shelleyGenesis['slotsPerKESPeriod'],
      slot_length: shelleyGenesis['slotLength'],
      max_kes_evolutions: shelleyGenesis['maxKESEvolutions'],
      security_param: shelleyGenesis['securityParam'],
    };
  } catch {
    throw new Error(`Could not load custom config file: ${customNetworkConfig.genesisShelleyPath}`);
  }
};

export const loadByronCustomConfig = (): ByronEraParameters => {
  if (!customNetworkConfig.genesisByronPath)
    throw new Error('Invalid custom network `genesisByronPath` in the config.');

  try {
    const data = readFileSync(customNetworkConfig.genesisByronPath, 'utf8');

    const byronGenesis = JSON.parse(data);
    const k = byronGenesis['protocolConsts']['k'];

    return {
      epoch_length: k * 10,
      slot_length: byronGenesis['blockVersionData']['slotDuration'] / 1000,
      safe_zone: k * 2,
      end_epoch: 0,
    };
  } catch {
    throw new Error(`Could not load custom config file: ${customNetworkConfig.genesisByronPath}`);
  }
};
