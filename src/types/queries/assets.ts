import { OnchainMetadata, Order } from '../common.js';
export type { ResultFound } from '../common.js';

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
    from: string;
    to: string;
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

interface Metadata {
  name: string;
  description: string;
  ticker: string | null;
  url: string | null;
  logo: string | null;
}

export interface Asset {
  asset: string;
  policy_id: string;
  asset_name: string | null;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_id: string;
  onchain_metadata: OnchainMetadata | null;
  onchain_metadata_cbor: string | null;
  metadata: Metadata | null;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
}

export interface AssetOutputDatum {
  cbor: string;
}
