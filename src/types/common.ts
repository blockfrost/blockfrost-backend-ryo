export type Order = 'asc' | 'desc';
export type AddressType = 'byron' | 'shelley';
export interface Amount {
  unit: string;
  quantity: string;
}

export interface AmountExtended extends Amount {
  decimals: null | number;
  has_nft_onchain_metadata: boolean;
}

export interface ResultFound {
  result: number;
}

export const CARDANO_NETWORKS = ['mainnet', 'testnet', 'preview', 'preprod'];

export type Network = 'mainnet' | 'testnet' | 'preview' | 'preprod';

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
