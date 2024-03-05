import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type Tx = OpenApiResponseTypes['tx_content'];
export type TxUtxoInputs = OpenApiResponseTypes['tx_content_utxo']['inputs'];
export type TxUtxoOutputs = OpenApiResponseTypes['tx_content_utxo']['outputs'];
export type TxStakes = OpenApiResponseTypes['tx_content_stake_addr'];
export type TxDelegations = OpenApiResponseTypes['tx_content_delegations'];
export type TxWithdrawals = OpenApiResponseTypes['tx_content_withdrawals'];
export type TxMirs = OpenApiResponseTypes['tx_content_mirs'];
export type TxPoolCert = OpenApiResponseTypes['tx_content_pool_certs'];
export type TxPoolRetires = OpenApiResponseTypes['tx_content_pool_retires'];
export type Relay = OpenApiResponseTypes['pool_relays'];
export type TxRedeemers = OpenApiResponseTypes['tx_content_redeemers'];
export type TxMetadataCbor = OpenApiResponseTypes['tx_content_metadata_cbor'];
export type TxMetadata = OpenApiResponseTypes['tx_content_metadata'];
export type TxWitnesses = OpenApiResponseTypes['tx_content_required_signers'];
