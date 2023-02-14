import { Order } from '../common.js';
export type { ResultFound } from '../common.js';

export interface RequestParameters {
  Params: {
    address: string;
  };
}

export interface RequestAddressParameters {
  Params: {
    address: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersAddressTicker {
  Params: {
    address: string;
    ticker: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestParametersTicker {
  Params: {
    ticker: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface NutlinkAddress {
  address: string;
  metadata_url: string;
  metadata_hash: string;
  metadata: { [key: string]: unknown };
}

export interface NutlinkAddressTickers {
  name: string;
  count: number;
  latest_block: number;
}

export interface NutlinkAddressTicker {
  tx_hash: string;
  block_height: number;
  tx_index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface NutlinkTickersTicker {
  address: string;
  tx_hash: string;
  block_height: number;
  tx_index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}
