import { components } from '@blockfrost/openapi';

// generic types

export type Order = 'asc' | 'desc';
export type AddressType = 'byron' | 'shelley';

export const CARDANO_NETWORKS = ['mainnet', 'testnet', 'preview', 'preprod', 'sanchonet', 'custom'];

export type Network = 'mainnet' | 'testnet' | 'preview' | 'preprod' | 'sanchonet' | 'custom';

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

export interface SnapshotMirror {
  originalUrl: string;
  mirrorUrl: string;
}

export type OffChainFetchError =
  | { code: 'HASH_MISMATCH'; message: string }
  | { code: 'CONNECTION_ERROR'; message: string }
  | { code: 'HTTP_RESPONSE_ERROR'; message: string }
  | { code: 'DECODE_ERROR'; message: string }
  | { code: 'SIZE_EXCEEDED'; message: string }
  | { code: 'UNKNOWN_ERROR'; message: string };
