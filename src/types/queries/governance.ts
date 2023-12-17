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
