import * as ResponseTypes from '../types/responses/ledger.js';
import { Network, ByronEraParameters, ProtocolInfo } from '../types/common.js';

export const GENESIS: Record<Network, ResponseTypes.Ledger> = {
  mainnet: {
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
  },
  testnet: {
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
  },
  preview: {
    active_slots_coefficient: 0.05,
    update_quorum: 5,
    max_lovelace_supply: '45000000000000000',
    network_magic: 2,
    epoch_length: 86_400,
    system_start: 1_666_656_000,
    slots_per_kes_period: 129_600,
    slot_length: 1,
    max_kes_evolutions: 62,
    security_param: 432,
  },
  preprod: {
    active_slots_coefficient: 0.05,
    update_quorum: 5,
    max_lovelace_supply: '45000000000000000',
    network_magic: 1,
    epoch_length: 432_000,
    system_start: 1_654_041_600,
    slots_per_kes_period: 129_600,
    slot_length: 1,
    max_kes_evolutions: 62,
    security_param: 2160,
  },
  sanchonet: {
    active_slots_coefficient: 0.05,
    update_quorum: 3,
    max_lovelace_supply: '45000000000000000',
    network_magic: 4,
    epoch_length: 86_400,
    system_start: 1_686_789_000,
    slots_per_kes_period: 129_600,
    slot_length: 1,
    max_kes_evolutions: 62,
    security_param: 432,
  },
};

export const BYRON_GENESIS: Record<Network, ByronEraParameters> = {
  mainnet: {
    epoch_length: 21_600,
    slot_length: 20,
    safe_zone: 4320,
    end_epoch: 208,
  },
  testnet: {
    epoch_length: 21_600,
    slot_length: 20,
    safe_zone: 4320,
    end_epoch: 74,
  },
  preprod: {
    epoch_length: 21_600,
    slot_length: 20,
    safe_zone: 4320,
    end_epoch: 4,
  },
  preview: {
    epoch_length: 4320,
    slot_length: 20,
    safe_zone: 864,
    end_epoch: 0,
  },
  sanchonet: {
    epoch_length: 4320,
    slot_length: 20,
    safe_zone: 864,
    end_epoch: 0,
  },
};

export const PROTOCOL_VERSIONS: Record<number, ProtocolInfo> = {
  0: {
    name: 'Byron with Ouroboros classic',
    is_era_hardfork: false,
  },
  1: {
    name: 'Byron with Ouroboros permissive BFT',
    is_era_hardfork: false,
  },
  2: {
    name: 'Shelley',
    is_era_hardfork: true,
  },
  3: {
    name: 'Allegra',
    is_era_hardfork: true,
  },
  4: {
    name: 'Mary',
    is_era_hardfork: true,
  },
  5: {
    name: 'Alonzo',
    is_era_hardfork: true,
  },
  6: {
    name: 'Alonzo (intra era hardfork)',
    is_era_hardfork: false,
  },
  7: {
    name: 'Babbage',
    is_era_hardfork: true,
  },
  8: {
    name: 'Babbage with SECP256K1 support (intra era hardfork)',
    is_era_hardfork: false,
  },
};
