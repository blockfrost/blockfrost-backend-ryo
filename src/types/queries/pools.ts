export type { ResultFound } from '../common.js';

export interface RequestParameters {
  Params: {
    pool_id: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}

export interface Pools {
  pool_id: string;
}

export interface PoolsExtended {
  pool_id: string;
  hex: string;
  active_stake: string;
  live_stake: string;
}

export interface PoolID {
  pool_id: string;
  hex: string;
  vrf_key: string;
  blocks_minted: number;
  blocks_epoch: number;
  pledge_declared: string;
  pledge_active: string;
  margin_cost: number;
  fixed_cost: string;
  reward_account: string;
  reward_account_raw: string;
  owners: string[];
  registration: string[];
  retirement: string[];
  live_stake: string;
  live_size: number;
  live_saturation: number;
  live_delegators: number;
  active_stake: string;
  active_size: number;
  declared_pledge: string;
  live_pledge: string;
}

export interface PoolsRetire {
  pool_id: string;
  epoch: number;
}

export interface MetadataTextJSON {
  name: string | null;
  homepage: string | null;
  description: string | null;
}
export interface PoolMetadata {
  pool_id: string;
  hex: string;
  url: string;
  hash: string;
  ticker: string | null;
  metadata_text: MetadataTextJSON | null;
}

export interface PoolDelegators {
  address: string;
  live_stake: string;
}

export interface PoolBlocks {
  block: string;
}

export interface PoolHistory {
  epoch: number;
  blocks: number;
  active_stake: string;
  active_size: number;
  pool_size: number;
  delegators_count: number;
  rewards: string;
  fees: string;
}

export interface PoolUpdates {
  tx_hash: string;
  cert_index: number;
  action: 'registered' | 'deregistered';
}

export interface PoolRelays {
  ipv4: string;
  ipv6: string;
  dns: string;
  dns_srv: string;
  port: number;
}
