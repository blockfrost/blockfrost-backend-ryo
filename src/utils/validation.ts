import { validation } from '@blockfrost/blockfrost-utils';
import { getConfig } from '../config.js';

type BlockfrostNetwork = 'mainnet' | 'testnet' | 'preview' | 'preprod';

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

export const validateStakeCred = (address: string) =>
  validation.validateStakeCred(address, getNetwork());

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
