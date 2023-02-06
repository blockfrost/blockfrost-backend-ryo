import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type Block = OpenApiResponseTypes['block_content'];
export type BlockAddresses = OpenApiResponseTypes['block_content_addresses'];

// export interface BlockParameters {
//   time: number;
//   height: number;
//   hash: string;
//   slot: number;
//   epoch: number;
//   epoch_slot: number;
//   slot_leader: string;
//   size: number;
//   next_block: null;
//   confirmations: number;
//   tx_count: number | null;
//   fees: string | null;
//   op_cert: string | null;
//   op_cert_counter: string | null;
// }

// export interface BlockIdParameters {
//   time: number;
//   height: number;
//   hash: string;
//   slot: number;
//   epoch: number;
//   epoch_slot: number;
//   size: number;
//   next_block: string;
//   confirmations: number;
//   op_cert: string | null;
//   op_cert_counter: string | null;
// }
