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
}

export interface DRepsDrepID {
  drep_id: string;
  hex: string;
  amount: string;
  active: boolean;
  active_epoch: number | null;
  has_script: boolean;
}

export interface DRepsDrepIDDelegators {
  address: string;
  amount: string;
}

export interface DRepsDrepIDMetadata {
  drep_id: string;
  hex: string;
  url: string | null;
  hash: string | null;
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

export interface RequestParametersProposalVotes {
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
  governance_description: string | null;
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

export interface ProposalsProposalVote {
  tx_hash: string;
  cert_index: number;
  voter_role: 'constitutional_committee' | 'drep' | 'spo';
  voter: string;
  vote: 'yes' | 'no' | 'abstain';
}
