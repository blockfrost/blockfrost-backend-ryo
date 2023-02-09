import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type Address = OpenApiResponseTypes['address_content'];
export type AddressTotal = OpenApiResponseTypes['address_content_total'];
export type AddressUtxos = OpenApiResponseTypes['address_utxo_content'];
export type AddressExtended = OpenApiResponseTypes['address_content_extended'];
export type AddressUtxo = OpenApiResponseTypes['address_utxo_content'];
export type AmountExtended = AddressExtended['amount'];
export type AddressTransactions = OpenApiResponseTypes['address_transactions_content'];
export type AddressTxs = OpenApiResponseTypes['address_txs_content'];
