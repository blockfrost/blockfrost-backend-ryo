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
  cost_models_raw: Record<string, unknown> | null;
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
  pvt_motion_no_confidence: number | null;
  pvt_committee_normal: number | null;
  pvt_committee_no_confidence: number | null;
  pvt_hard_fork_initiation: number | null;
  dvt_motion_no_confidence: number | null;
  dvt_committee_normal: number | null;
  dvt_committee_no_confidence: number | null;
  dvt_update_to_constitution: number | null;
  dvt_hard_fork_initiation: number | null;
  dvt_p_p_network_group: number | null;
  dvt_p_p_economic_group: number | null;
  dvt_p_p_technical_group: number | null;
  dvt_p_p_gov_group: number | null;
  dvt_treasury_withdrawal: number | null;
  committee_min_size: string | null;
  committee_max_term_length: string | null;
  gov_action_lifetime: string | null;
  gov_action_deposit: string | null;
  drep_deposit: string | null;
  drep_activity: string | null;
  registered_tx_id: number | null;
  pvtpp_security_group: number | null;
  pvt_p_p_security_group: number | null;
  min_fee_ref_script_cost_per_byte: number | null;
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
