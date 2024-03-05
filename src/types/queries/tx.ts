import { Amount } from '../common.js';
export type { ResultFound } from '../common.js';

export interface RequestParameters {
  Params: {
    hash: string;
  };
}

export interface Tx {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  index: number;
  slot: number;
  amount_lovelace: string;
  amount: Amount[];
  fees: string;
  deposit: string;
  size: number;
  invalid_before: string | null;
  invalid_hereafter: string | null;
  utxo_count: number;
  delegation_count: number;
  withdrawal_count: number;
  mir_cert_count: number;
  stake_cert_count: number;
  pool_update_count: number;
  pool_retire_count: number;
  asset_mint_or_burn_count: number;
  redeemer_count: number;
  valid_contract: boolean;
}

export interface TxUtxoInputs {
  address: string;
  amount: Amount[];
  amount_lovelace: string;
  tx_hash: string;
  output_index: number;
  collateral: boolean;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
  reference: boolean;
}
export interface TxUtxoOutputs {
  address: string;
  amount: Amount[];
  amount_lovelace: string;
  collateral: boolean;
  output_index: number;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
}

export interface TxStakes {
  cert_index: number;
  address: string;
  registration: boolean;
}

export interface TxDelegations {
  index: number; // deprecated
  cert_index: number;
  address: string;
  pool_id: string;
  active_epoch: number;
}

export interface TxWithdrawals {
  address: string;
  amount: string;
}
export interface TxMir {
  pot: 'reserve' | 'treasury';
  cert_index: number;
  address: string;
  amount: string;
}

export interface MetadataTextJSON {
  name: string | null;
  homepage: string | null;
  description: string | null;
}

export interface TxPoolUpdates {
  cert_index: number;
  pu_id: string;
  pool_id: string;
  hash: string;
  vrf_key: string;
  pledge: string;
  margin_cost: number;
  fixed_cost: string;
  reward_account: string;
  reward_account_raw: string;
  owners: string[];
  metadata: Metadata;
  metadata_hash: string;
  metadata_url: string;
  metadata_text: MetadataTextJSON | null;
  ticker: string;
  relays: Relay[];
  active_epoch: number;
}

interface Metadata {
  url: string | null;
  hash: string | null;
  ticker: string | null;
  name: string | null;
  description: string | null;
  homepage: string | null;
}

export interface Relay {
  ipv4: string;
  ipv6: string;
  dns: string;
  dns_srv: string;
  port: number;
}

export interface TxPoolRetires {
  cert_index: number;
  pool_id: string;
  retiring_epoch: number;
}

export interface TxMetadata {
  label: string;
  json_metadata: (string | { [key: string]: unknown }) & {
    [key: string]: unknown;
  };
}

export interface TxMetadataCbor {
  label: string;
  cbor_metadata: string;
  metadata: string | null;
}

export interface TxRedeemers {
  tx_index: number;
  purpose: 'spend' | 'mint' | 'cert' | 'reward';
  script_hash: string;
  datum_hash: string;
  unit_mem: string;
  unit_steps: string;
  fee: string;
  redeemer_data_hash: string;
}

export interface TxWitnesses {
  witness_hash: string;
}
