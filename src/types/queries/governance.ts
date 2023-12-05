import { Order } from '../common.js';

export interface DrepRequestParameters {
  Params: {
    hash: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}
