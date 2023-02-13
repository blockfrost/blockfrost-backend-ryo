import { Order } from '../common.js';

export interface RequestLabels {
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface RequestLabelParameters {
  Params: {
    label: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: Order;
  };
}

export interface MetadataTxLabels {
  label: string;
  cip10: string | null;
  count: string;
}

export interface MetadataTxLabel {
  tx_hash: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json_metadata: any;
}

export interface MetadataTxLabelCbor {
  tx_hash: string;
  cbor_metadata: string;
  metadata: string;
}
