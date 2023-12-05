import { Order } from '../common.js';
export type { ResultFound } from '../common.js';

export interface RequestParameters {
  Params: {
    hash_or_number: string;
    hash: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersSlot {
  Params: {
    slot_number: number;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersEpochSlot {
  Params: {
    epoch_number: number;
    slot_number: number;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersLatest {
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface Block {
  time: number;
  height: number;
  hash: string;
  slot: number;
  epoch: number;
  epoch_slot: number;
  slot_leader: string;
  size: number;
  next_block: null;
  confirmations: number;
  tx_count: number;
  fees: string | null;
  op_cert: string | null;
  op_cert_counter: string | null;
  previous_block: string;
  output: string;
  block_vrf: string | null;
}

export interface BlockTxs {
  hash: string;
}

export interface BlockAddresses {
  address: string;
  transactions: { tx_hash: string }[];
}
