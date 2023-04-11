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
  if (customNetworkConfig.genesisShelleyPath) {
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
      throw new Error(
        `Could not load custom network config file: ${customNetworkConfig.genesisShelleyPath}. ` +
          `Make sure you are loading shelley-genesis.json config file as expected by cardano-node.`,
      );
    }
  } else {
    // custom network is not used so we return some don't care value
    return {
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
    };
  }
};

export const loadByronCustomConfig = (): ByronEraParameters => {
  if (customNetworkConfig.genesisByronPath) {
    try {
      const data = readFileSync(customNetworkConfig.genesisByronPath, 'utf8');

      const byronGenesis = JSON.parse(data);
      const k = byronGenesis['protocolConsts']['k'];

      return {
        epoch_length: k * 10,
        slot_length: byronGenesis['blockVersionData']['slotDuration'] / 1000,
        safe_zone: k * 2,
        end_epoch: customNetworkConfig.byronEndEpoch || 0,
      };
    } catch {
      throw new Error(
        `Could not load custom network config file: ${customNetworkConfig.genesisByronPath}. ` +
          `Make sure you are loading byron-genesis.json config file as expected by cardano-node.`,
      );
    }
  } else {
    // custom network is not used so we return some don't care value
    return {
      epoch_length: 21_600,
      slot_length: 20,
      safe_zone: 4320,
      end_epoch: 208,
    };
  }
};
