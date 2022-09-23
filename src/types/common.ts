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
