import { Order } from '../common.js';

export interface RequestParameters {
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}
export interface RequestParametersDRepID {
  Params: {
    drep_id: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestDRepID {
  Params: {
    drep_id: string;
  };
}

export interface DReps {
  drep_id: string;
  hex: string;
  has_script: boolean;
}

export interface DRepsDrepID {
  drep_id: string;
  hex: string;
  amount: string;
  active: boolean;
  active_epoch: number | null;
  has_script: boolean;
  retired: boolean;
  expired: boolean;
  last_active_epoch: number | null;
}

export interface DRepsDrepIDDelegators {
  address: string;
  amount: string;
}

export interface DRepsDrepIDMetadata {
  drep_id: string;
  hex: string;
  url: string;
  hash: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json_metadata: any;
  bytes: string;
}
export interface DRepsDrepIDUpdates {
  tx_hash: string;
  cert_index: number;
  action: 'registered' | 'deregistered';
}

export interface DRepsDrepIDVotes {
  tx_hash: string;
  cert_index: number;
  voter_role: 'constitutional_committee' | 'drep' | 'spo';
  committee_voter_hash: string | null;
  vote: 'yes' | 'no' | 'abstain';
}

export interface RequestParametersProposal {
  Params: {
    tx_hash: string;
    cert_index: number;
  };
}

export interface RequestParametersProposalPaged {
  Params: {
    tx_hash: string;
    cert_index: number;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersVotesVote {
  Params: {
    tx_hash: string;
    cert_index: number;
  };
}

export interface Votes {
  tx_hash: string;
  cert_index: number;
  voter_role: 'constitutional_committee' | 'drep' | 'spo';
  committee_voter_hash: string | null;
  vote: 'yes' | 'no' | 'abstain';
}

export interface ProposalsProposal {
  tx_hash: string;
  cert_index: number;
  governance_type:
    | 'hard_fork_initiation'
    | 'new_committee'
    | 'new_constitution'
    | 'info_action'
    | 'no_confidence'
    | 'parameter_change'
    | 'treasury_withdrawals';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  governance_description: any;
  deposit: string;
  return_address: string;
  ratified_epoch: number | null;
  enacted_epoch: number | null;
  dropped_epoch: number | null;
  expired_epoch: number | null;
  expiration: number;
  anchor_url: string | null;
  anchor_hash: string | null;
}

export interface Proposals {
  tx_hash: string;
  cert_index: number;
  governance_type:
    | 'hard_fork_initiation'
    | 'new_committee'
    | 'new_constitution'
    | 'info_action'
    | 'no_confidence'
    | 'parameter_change'
    | 'treasury_withdrawals';
}

export interface ProposalsProposalVotes {
  tx_hash: string;
  cert_index: number;
  voter_role: 'constitutional_committee' | 'drep' | 'spo';
  voter: string;
  voter_has_script: boolean;
  vote: 'yes' | 'no' | 'abstain';
}

export interface ProposalsProposalMetadata {
  tx_hash: string;
  cert_index: number;
  url: string;
  hash: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json_metadata: any;
  bytes: string;
}

export interface ProposalsProposalParameters {
  tx_hash: string;
  cert_index: number;
  parameters: {
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
  };
}

export interface ProposalsProposalWithdrawals {
  tx_hash: string;
  cert_index: number;
  stake_address: string;
  amount: string;
}
