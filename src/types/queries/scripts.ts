export type { ResultFound } from '../common.js';
import type { Amount } from '../common.js';

export interface RequestParameters {
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}

export interface RequestParametersScriptHash {
  Params: {
    script_hash: string;
  };
}

export interface RequestParametersScriptHashRedeemers {
  Params: {
    script_hash: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}
export interface RequestParametersScriptHashUtxos {
  Params: {
    script_hash: string;
  };
  Querystring: {
    count: number;
    page: number;
    order: 'asc' | 'desc';
  };
}
export interface RequestParametersDatumHash {
  Params: {
    datum_hash: string;
  };
}

export interface Scripts {
  script_hash: string;
}

type ScriptType = 'timelock' | 'plutusV1' | 'plutusV2';

export interface ScriptHash {
  script_hash: string;
  type: ScriptType;
  serialised_size: number;
}

type PurposeType = 'spend' | 'mint' | 'cert' | 'reward';

export interface ScriptHashRedeemers {
  tx_hash: string;
  tx_index: number;
  purpose: PurposeType;
  datum_hash: string;
  unit_mem: string;
  unit_steps: string;
  fee: string;
  redeemer_data_hash: string;
}

export interface ScriptHashUtxosQuery {
  address: string;
  tx_hash: string;
  output_index: number;
  amount_lovelace: string;
  amount: Amount[] | null;
  block: string;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string;
}

export interface DatumHash {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json_value: any;
}

export interface DatumHashCbor {
  cbor: string;
}

export interface ScriptHashJson {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any;
}
export interface ScriptHashCbor {
  cbor: string;
}
