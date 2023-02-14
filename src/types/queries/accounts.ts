import { Amount, Order } from '../common.js';
export type { ResultFound } from '../common.js';
export interface RequestAccountsQueryParameters {
  Params: {
    stake_address: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface Account {
  stake_address: string;
  active: boolean;
  active_epoch: number;
  controlled_amount: string;
  rewards_sum: string;
  withdrawals_sum: string;
  reserves_sum: string;
  treasury_sum: string;
  withdrawable_amount: string;
  pool_id: string;
}

export interface AccountRewards {
  epoch: number;
  amount: string;
  pool_id: string;
  type: 'leader' | 'member' | 'pool_deposit_refund';
}

export interface AccountDelegations {
  active_epoch: number;
  tx_hash: string;
  amount: string;
  pool_id: string;
}

export interface AccountRegistrations {
  tx_hash: string;
  action: 'registered' | 'deregistered';
}

export interface AccountWithdrawalsAndMirs {
  tx_hash: string;
  amount: string;
}

export interface AccountHistory {
  active_epoch: number;
  amount: string;
  pool_id: string;
}

export interface AccountAssets {
  amount: Amount[];
}

export interface AccountAddresses {
  address: string;
}

export interface AccountAddressesTotal {
  stake_address: string;
  received_amount_lovelace: string;
  sent_amount_lovelace: string;
  sent_amount: Amount[];
  received_amount: Amount[];
  tx_count: number;
}
