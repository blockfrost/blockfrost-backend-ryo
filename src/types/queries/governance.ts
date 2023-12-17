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
  /** @description Certificate within the transaction */
  cert_index: number;
  /**
   * @description Action in the certificate
   * @enum {string}
   */
  action: 'registered' | 'deregistered';
}
