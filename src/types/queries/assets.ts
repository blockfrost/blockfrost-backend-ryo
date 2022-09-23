import { Order } from '../common';
export type { ResultFound } from '../common';

export interface AssetsPolicyFound {
  result: number;
}

export interface RequestParameters {
  Params: {
    asset: string;
  };
}

export interface RequestAssetsParameters {
  Params: {
    asset: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestAssetsPolicyParameters {
  Params: {
    policy_id: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface Assets {
  asset: string;
  quantity: string;
}

interface Metadata {
  name: string;
  description: string;
  ticker: string | null;
  url: string | null;
  logo: string | null;
}

interface OnchainMetadata {
  name: string | null;
  image: string | null;
}

export interface Asset {
  asset: string;
  policy_id: string;
  asset_name: string | null;
  asset_name_UTF8: string | null;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onchain_metadata: OnchainMetadata | null | any;
  metadata: Metadata | null;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
}

export interface AssetHistory {
  tx_hash: string;
  amount: string;
  action: 'burned' | 'minted';
}

export interface AssetTxs {
  tx_hash: string;
}

export interface AssetTransactions {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
}

export interface PolicyId {
  asset: string;
  quantity: string;
}

export interface AssetAddresses {
  address: string;
  quantity: string;
}
