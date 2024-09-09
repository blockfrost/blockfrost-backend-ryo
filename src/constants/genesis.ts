import { ProtocolInfo } from '../types/common.js';

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
  9: {
    name: 'Conway',
    is_era_hardfork: true,
  },
};
