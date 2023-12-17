export type { ResultFound } from '../common.js';

export interface RequestParameters {
  Params: {
    number: number;
  };
  Querystring: {
    count: number;
    page: number;
  };
}

export interface RequestStakeParameters {
  Params: {
    number: number;
  };
  Querystring: {
    count: number;
    page: number;
  };
}

export interface RequestBlockParameters {
  Params: {
    number: number;
  };
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}

export interface RequestStakePoolIdParameters {
  Params: {
    number: number;
    pool_id: string;
  };
  Querystring: {
    count: number;
    page: number;
  };
}

export interface RequestBlockPoolIdParameters {
  Params: {
    number: number;
    pool_id: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}

export interface Epoch {
  epoch: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  block_count: number;
  tx_count: number;
  output: string;
  fees: string;
  active_stake: string | null;
}

export interface EpochParameters {
  epoch: number;
  min_ee_b: number;
  min_fee_a: number;
  min_fee_b: number;
  min_utxo: string;
  max_block_size: number;
  max_tx_size: number;
  max_block_header_size: number;
  key_deposit: string;
  pool_deposit: string;
  e_max: number;
  n_opt: number;
  a0: number;
  rho: number;
  tau: number;
  decentralisation_param: number;
  extra_entropy: string;
  protocol_major_ver: number;
  protocol_minor_ver: number;
  min_pool_cost: string;
  nonce: string;
  cost_models: Record<string, unknown> | null;
  price_mem: number;
  price_step: number;
  max_tx_ex_mem: string;
  max_tx_ex_steps: string;
  max_block_ex_mem: string;
  max_block_ex_steps: string;
  max_val_size: string;
  collateral_percent: number;
  max_collateral_inputs: number;
  coins_per_utxo_word: string; // deprecated
  coins_per_utxo_size: string;
  p1: number | null;
  p2a: number | null;
  p2b: number | null;
  p3: number | null;
  p4: number | null;
  p5a: number | null;
  p5b: number | null;
  p5c: number | null;
  p5d: number | null;
  p6: number | null;
  p7: number | null;
  q1: number | null;
  q2a: number | null;
  q2b: number | null;
  q4: number | null;
  min_c_c_size: string | null;
  cc_term_limit: string | null;
  gov_expiration: string | null;
  gov_deposit: string | null;
  drep_activity: string | null;
  registered_tx_id: number | null;
}

export interface EpochStake {
  stake_address: string;
  pool_id: string;
  fees_sum: number;
  amount: string;
}

export interface EpochBlocks {
  hash: string;
}

export interface EpochBlocksPoolId {
  hash: string;
}

export interface EpochStakesPoolId {
  stake_address: string;
  amount: string;
}
