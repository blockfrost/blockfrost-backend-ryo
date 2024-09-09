import { validation } from '@blockfrost/blockfrost-utils';
import { getConfig } from '../config.js';
import { bech32 } from 'bech32';

type BlockfrostNetwork = 'mainnet' | 'testnet' | 'preview' | 'preprod' | 'sanchonet';

// This is a workaround till blockfrost-utils is updated with custom network support
const getNetwork = () => {
  const network = getConfig().network;

  if (network === 'custom') {
    return 'testnet' as BlockfrostNetwork;
  } else {
    return network as BlockfrostNetwork;
  }
};

export const isNumber = validation.isNumber;
export const validateHex = validation.validateHex;

export const detectAndValidateAddressType = (address: string) =>
  validation.detectAndValidateAddressType(
    address,
    getConfig().network as BlockfrostNetwork,
  ) as BlockfrostNetwork;

export const getAddressTypeAndPaymentCred = (address: string) =>
  validation.getAddressTypeAndPaymentCred(address, getNetwork());

export const validateStakeAddress = (address: string) =>
  validation.validateStakeAddress(address, getNetwork());

export const convertStakeAddress = (address: string) =>
  validation.convertStakeAddress(address, getNetwork());

export const validateAndConvertPool = validation.validateAndConvertPool;
export const paymentCredToBech32Address = validation.paymentCredToBech32Address;

export const validatePositiveInRangeSignedInt = validation.validatePositiveInRangeSignedInt;
export const validatePositiveInRangeSignedBigInt = validation.validatePositiveInRangeSignedBigInt;
export const validateInRangeUnsignedInt = validation.validateInRangeUnsignedInt;

export const validateDerivationXpub = validation.validateDerivationXpub;
export const validateBlockHash = validation.validateBlockHash;

export const isTestnet = (): boolean => {
  const network = getConfig().network;

  return network === 'mainnet' ? false : true;
};

/**
 * Validates a DRep ID and returns both the ID and its raw format if applicable.
 *
 * @param {string} bechDrepId - The DRep ID in Bech32 format that needs to be validated.
 * @returns {{ id: string, raw: string | null }} - An object containing the validated ID and its raw form.
 *   - `id`: The original DRep ID.
 *   - `raw`: The raw format of the DRep ID in hexadecimal if applicable, or `null` for special cases ()drep_always_abstain, drep_always_no_confidence).
 *
 * @throws {Error} If the DRep ID prefix is invalid, an error is thrown.
 */
export const validateDRepId = (
  bechDrepId: string,
): {
  id: string;
  raw: string | null;
} => {
  const SPECIAL_DREP_IDS = ['drep_always_abstain', 'drep_always_no_confidence'];

  if (SPECIAL_DREP_IDS.includes(bechDrepId)) {
    return {
      id: bechDrepId,
      raw: null,
    };
  }
  const { prefix, words } = bech32.decode(bechDrepId);

  if (prefix !== 'drep' && prefix !== 'drep_script') {
    throw new Error('Invalid drep id prefix');
  }

  const hashBuf = Buffer.from(bech32.fromWords(words));
  const drepIdRaw = `\\x${Buffer.from(hashBuf).toString('hex')}`;

  return {
    id: bechDrepId,
    raw: drepIdRaw,
  };
};
