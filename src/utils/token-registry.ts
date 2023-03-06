import axios, { isAxiosError } from 'axios';
import * as Sentry from '@sentry/node';
import { Asset } from '../types/responses/assets.js';
import { getConfig } from '../config.js';

const CONFIG_TOKEN_REGISTRY_URL = getConfig().tokenRegistryUrl;

interface TokenRegistryValue<TValueType extends string | number> {
  signatures: {
    signature: string;
    publicKey: string;
  }[];
  sequenceNumber: number;
  value: TValueType;
}

export interface TokenRegistryMetadata {
  subject: string;
  name: TokenRegistryValue<string>;
  description: TokenRegistryValue<string>;
  policy?: string;
  url?: TokenRegistryValue<string>;
  ticker?: TokenRegistryValue<string>;
  decimals?: TokenRegistryValue<number>;
  logo?: TokenRegistryValue<string>;
}

export const transformTokenRegistryAsset = (
  tokenRegistryAsset: TokenRegistryMetadata,
): Asset['metadata'] => {
  const metadata = {
    name: tokenRegistryAsset.name?.value,
    description: tokenRegistryAsset.description?.value,
    ticker: tokenRegistryAsset.ticker?.value ?? null,
    url: tokenRegistryAsset.url?.value ?? null,
    logo: tokenRegistryAsset.logo?.value ?? null,
    decimals: tokenRegistryAsset.decimals?.value ?? null,
  };

  return metadata;
};

export const fetchAssetMetadata = async (
  asset: string,
  tokenRegistryUrl = CONFIG_TOKEN_REGISTRY_URL,
) => {
  try {
    const url = `${tokenRegistryUrl}/metadata/${asset}`;

    const response = await axios.get<TokenRegistryMetadata>(url, {
      timeout: 10_000,
      headers: { 'User-Agent': 'Blockfrost Backend RYO' },
    });

    if (response?.data?.name !== undefined && response?.data?.description !== undefined) {
      return transformTokenRegistryAsset(response.data);
    } else {
      console.error(
        `Failed to fetch metadata for asset ${asset} due to invalid format. Response:`,
        response,
        `data:`,
        response.data,
      );
      return null;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      // 404 just means asset is not in token registry
      // console.info(`Failed to fetch metadata for asset ${asset}`, error.message);
      return null;
    } else {
      Sentry.captureException(error);
      console.error(error);
      throw error;
    }
  }
};
