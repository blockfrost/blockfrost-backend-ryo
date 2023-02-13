import { validation } from '@blockfrost/blockfrost-utils';
import { getConfig } from '../config.js';

export const isNumber = validation.isNumber;
export const validateHex = validation.validateHex;

export const detectAndValidateAddressType = (address: string) =>
  validation.detectAndValidateAddressType(address, getConfig().network);

export const getAddressTypeAndPaymentCred = (address: string) =>
  validation.getAddressTypeAndPaymentCred(address, getConfig().network);

export const validateStakeAddress = (address: string) =>
  validation.validateStakeAddress(address, getConfig().network);

export const convertStakeAddress = (address: string) =>
  validation.convertStakeAddress(address, getConfig().network);

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
