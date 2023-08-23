import { components } from '@blockfrost/openapi';

// generic types

export type Order = 'asc' | 'desc';
export type AddressType = 'byron' | 'shelley';

export const CARDANO_NETWORKS = ['mainnet', 'testnet', 'preview', 'preprod', 'sanchonet'];

export type Network = 'mainnet' | 'testnet' | 'preview' | 'preprod' | 'sanchonet';

export interface ResultFound {
  result: number;
}

// less generic types
export interface ByronEraParameters {
  epoch_length: number;
  slot_length: number;
  safe_zone: number;
  end_epoch: number;
}

export interface ProtocolInfo {
  name: string;
  is_era_hardfork: boolean;
}
export interface Amount {
  unit: string;
  quantity: string;
}

type OnchainMetadataItem = components['schemas']['asset']['onchain_metadata'];

export type OnchainMetadata = {
  version?: number;
} & Record<string, Record<string, OnchainMetadataItem>>;
