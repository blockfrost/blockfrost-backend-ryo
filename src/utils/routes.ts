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

    return JSON.parse(data) as ResponseTypes.Ledger;
  } catch {
    throw new Error(`Could not load custom config file: ${customNetworkConfig.genesisShelleyPath}`);
  }
};

export const loadByronCustomConfig = (): ByronEraParameters => {
  if (!customNetworkConfig.genesisByronPath)
    throw new Error('Invalid custom network `genesisByronPath` in the config.');

  try {
    const data = readFileSync(customNetworkConfig.genesisByronPath, 'utf8');

    return JSON.parse(data) as ByronEraParameters;
  } catch {
    throw new Error(`Could not load custom config file: ${customNetworkConfig.genesisByronPath}`);
  }
};
