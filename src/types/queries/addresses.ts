import { Amount, OnchainMetadata, Order } from '../common.js';
export type { ResultFound } from '../common.js';
export interface RequestParameters {
  Params: {
    address: string;
  };
}

export interface RequestParametersUtxos {
  Params: {
    address: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersUtxosAsset {
  Params: {
    address: string;
    asset: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}
export interface RequestParametersTxs {
  Params: {
    address: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersTransactions {
  Params: {
    address: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
    from: string;
    to: string;
  };
}

export interface AmountExtended {
  asset_name: string;
  policy_id: string;
  quantity: string;
  decimals: null | number;
  onchain_metadata: OnchainMetadata | null;
  onchain_metadata_cbor: string | null;
}

export interface AddressQuery {
  address: string;
  amount_lovelace: string;
  amount: Amount[];
  stake_address: string | null;
  script: boolean;
}

// eslint-disable-next-line import/export
export interface AddressTotalQuery {
  received_amount_lovelace: string;
  sent_amount_lovelace: string;
  sent_amount: Amount[];
  received_amount: Amount[];
  tx_count: number;
}

// eslint-disable-next-line import/export
export interface AddressTotalQuery {
  address: string;
  received_amount_lovelace: string;
  sent_amount_lovelace: string;
  sent_amount: Amount[];
  received_amount: Amount[];
  tx_count: number;
}

export interface AddressUtxosQuery {
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount_lovelace: string;
  amount: Amount[];
  block: string;
  data_hash: string;
  inline_datum: string;
  reference_script_hash: string;
}

export interface AddressExtendedQuery {
  address: string;
  amount_lovelace: string;
  amount: AmountExtended[];
  stake_address: string | null;
  script: boolean;
}

export interface AddressTxsQuery {
  hash: string;
}

export interface AddressTransactionsQuery {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
}
