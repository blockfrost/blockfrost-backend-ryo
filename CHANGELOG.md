# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- exposed new attributes `live_saturation`, `blocks_minted`, `declared_pledge`, `margin_cost`, `fixed_cost` and `metadata` in `/pools/extended`
- Added support for calidus keys (CIP-0151) in `/pools/:pool_id` endpoint
  - Requires [pg_cardano](https://github.com/cardano-community/pg_cardano) PostgreSQL extension

## [4.0.0] - 2025-04-04

### Changed

- BREAKING CHANGE: Endpoints `/accounts/{stake_addr}` are now using CIP129 format for `drep_id` attribute

## [3.3.0] - 2025-03-26

### Added

- `/blocks/:hash_or_number/txs/cbor` endpoint

## [3.2.0] - 2025-03-25

### Added

- `/blocks/latest/txs/cbor` endpoint

## [3.1.2] - 2025-01-24

### Fixed

- Unexpected server error in `/governance/proposals/:proposal/metadata` (introduced in 3.1.1)

## [3.1.1] - 2025-01-23

### Fixed

- Incorrect proposal parameters

## [3.1.0] - 2025-01-20

### Changed

- New fields in `/governance/dreps/:drep`
  - `retired`: Indicates the registration state of the DRep. Set to `true` if the DRep has been deregistered; otherwise, `false`.
  - `expired`: , Indicates whether the DRep has been inactive for a consecutive number of epochs (determined by a epoch parameter `drep_activity`)
  - `last_active_epoch`: Epoch of the most recent action - registration, update, deregistration or voting
- Deprecated fields in `/governance/dreps/:drep`
  - `active`: Superseded by the new `retired` and `expired`
  - `active_epoch`: Replaced by `last_active_epoch`

## [3.0.1] - 2025-01-02

### Fixed

- DRep was incorrectly marked as active if a DRep update occurred after a DRep registration

## [3.0.0] - 2024-12-17

### Added

- Support for CIP129 DRep ID - you can query DReps using both legacy format and CIP129 format. The `drep_id` and `hex` fields will reflect the format of the query param

### Changed

- BREAKING CHANGE: Endpoints `/governance/dreps` and `/governance/proposals/{tx_hash}/{cert_index}/votes` are now using CIP129 format
- Looser validation for cost model size in `epochs/:num/parameters`

## [2.4.0] - 2024-11-20

### Added

- Custom network support
- Option to disable token registry lookups

### Changed

- Mithril: Snapshot mirrors are now configured via config option `mithril.snapshotMirrors`, `mithril.snapshotCDN` config option and `BLOCKFROST_MITHRIL_SNAPSHOT_CDN` env config variable were removed

### Fixed

- Issue with attempting to release an already-released PostgreSQL client during error handling
- Incorrectly retrieving DRep when registered under both keyHash and scriptHash

## [2.3.1] - 2024-11-04

### Fixed

- Don't list unregistered stake addresses in `/governance/dreps/:drep/delegators`
- SQL optimization in `/governance/dreps/:drep/delegators`

## [2.3.0] - 2024-11-04

### Added

- `/account/:stake_addr/utxos` for retrieving utxos associated with a stake account

## [2.2.4] - 2024-10-31

### Fixed

- Added instant rewards, reserves, treasury and proposal_refund to the calculation of delegators' total amount in `/governance/dreps/:drep/delegators`
- Handle `PlutusV3 Chang+1` cost model mapping

## [2.2.3] - 2024-10-14

### Changed

- CIP68v3: allow byte string fields to be encoded as an array of bytes
- CIP25v1: allow alternative metadata encoding where asset name not utf8 encoded

## [2.2.2] - 2024-05-10

### Fixed

- Retrieving data for special dreps `drep_always_abstain` and `drep_always_no_confidence`

## [2.2.1] - 2024-09-24

### Fixed

- Querying Dreps with `drep_script` bech32 prefix

## [2.2.0] - 2024-09-12

### Added

- `/txs/{hash}/utxos`
  - `consumed_by_tx` field
- `/epochs/{number}/parameters` and `/epochs/latest/parameters`
  - `cost_models_raw` field, list variant of cost_models without name mapping

### Fixed

- Naming of `pvtpp_security_group` -> `pvt_p_p_security_group`, the old field is preserved but marked as deprecated.

## [2.1.1] - 2024-08-23

### Changed

- Asset in `output_amount` of `/txs` is now sorted by the unit name

### Fixed

- Plutus V3 cost model mapping
- `/txs/{hash}/pool_updates` returning multiple rows

## [2.1.0] - 2024-07-31

### Added

- `Conway` era support
- initial `CIP-1694` support
- `/txs/{hash}/cbor` endpoint
- Proxy for Mithril Aggregator API
  - config options `mithril.enabled`, `mithril.aggregator`, `mithril.snapshotCDN` (optional) and `mithril.allowedEndpoints` (optional)
  - ENV var options `BLOCKFROST_MITHRIL_ENABLED`, `BLOCKFROST_MITHRIL_AGGREGATOR` and `BLOCKFROST_MITHRIL_SNAPSHOT_CDN`

### Changed

- Upgraded Fastify dependencies
- Upgraded Typescript

### Fixed

- `/addresses/{payment_cred}` and `/addresses/{payment_cred}/extended` to always show `stake_address: null`
- ordering in `/scripts`

## [2.0.3] - 2024-05-23

### Fixed

- calculation of `live_stake` in `/pools/{pool_id}/delegators` to reflect the split of MIRs into a separate table (`instant_reward`) in new dbsync, which was omitted in 2.0.1 for this endpoint

## [2.0.2] - 2024-05-09

### Fixed

- calculation of `live_saturation` in `/pools/{pool_id}` as although ledger specifies the variable as circulating supply, total supply (45B-reserves) is used in this calculation instead

## [2.0.1] - 2024-04-08

| :warning: WARNING                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------- |
| This version of `blockfrost-backend-ryo` requires `cardano-db-sync 13.2.0.1` or newer. Use version `1.7.x` for earlier releases. |

### Fixed

- calculation of endpoints affected by moving MIRs into `instant_reward` table required for `cardano-db-sync 13.2.0.1`
  - `/accounts/{stake_address}`
  - `/pools/extended`
  - `/pools/{pool_id}`
  - `/network`
- calculation of `live_size` for `/pools/{pool_id}` only taking into account live pools (ommiting retired from the calculation)

## [2.0.0] - 2024-03-13

| :warning: WARNING                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------- |
| This version of `blockfrost-backend-ryo` requires `cardano-db-sync 13.2.0.1` or newer. Use version `1.7.x` for earlier releases. |

### Added

- `/governance/dreps`
- `/governance/dreps/{hash}`
- `/governance/dreps/{hash}/distribution`
- feature flag to turn on/off `CIP-1694` support
- support for Cardano Sanchonet
- translation of cost models from numerical IDs to strings,
  required for `cardano-db-sync 13.1.1.3` and newer [#130](https://github.com/blockfrost/blockfrost-backend-ryo/pull/130)
- indices improving `/assets/{asset}` when querying CIP68 assets and `/txs/{hash}` with redeemers
- IS_LOCAL env for testing
- Parsing version 2 of CIP68 metadata (`@blockfrost/openapi` 0.1.62)
- `/txs/{hash}/required_signers` endpoint

### Changed

- node_modules
- yarn
- updated vitest
- removed token registry mock server, using function mocking instead
- bump blockfrost-tests to `dd9b2fe5ed7fa5cad60b34555b3c05d287382226`

### Fixed

- ordering in `/assets/{asset}/txs`, `/assets/{asset}/transactions` and `/epochs/{number}/stakes`
- port configuration via config option `dbSync.port`
- live_stake for retired pools in `/pools/{pool_id}` was always 0, instead of displaying the delegated amount
- `metadata/txs/labels/{number}` and `/scripts/{hash}/json` json encoding for primitive types (eg. string) (`@blockfrost/openapi` 0.1.62)
- `/txs/{hash}/utxos` rendering of wrong asset in collateral output [#161](https://github.com/blockfrost/blockfrost-backend-ryo/pull/161)
- in `/epochs/{number}/parameters` set `min_utxo` to `coins_per_utxo_size` with a fallback to `min_utxo_value` if `coins_per_utxo_size` is null

## [1.7.0] - 2023-08-30

### Added

- Flake now exports NixOS module

### Changed

- support defining a postgres password in config or env
- new custom index on `redeemer` table to README
- bumped blockfrost-utils to 2.8.0
  - !from&to breaking change [] -> 400
- bump blockfrost-tests to 1.9.4
- CI to run on Node 18

### Fixed

- nixpkgs updated to latest `nixos-23.05`
- NodeJS updated to `18.16.1`
- README config example
- shell.nix default to Node 18
- registered missing /prometheus endpoint

## [1.6.0] - 2023-06-28

### Added

- `onchain_metadata_extra` field to `/assets/{asset}`
- CIP68 RFT 444 support

### Changed

- bump @blockfrost/blockfrost-tests to 1.7.2

## [1.5.0] - 2023-03-20

### Added

- Nix Flake
- Docker image build using Nix `dockerTools`
- Registry published Docker image is now the Nix built one, publish to ghcr.io as well
- cardano-db-sync port to config
- Support for ScriptHash payment credential using `script` addresses.

### Changed

- migrated to ESM project
- format of a config file changed from .ts to .yaml (due to ESM migration)
- regenerated yarn.lock
- nixpkgs updated to latest `nixos-22.11` and hence NodeJS to `16.18.1`
- do not leak framework in errors
- bumped blockfrost-tests to 1.7.1
- bumped blockfrost-utils to 2.4.0
- bumped blockfrost-openapi to 0.1.57

### Fixed

- `/scripts/datum/{datum-hash}/cbor` endpoint adjusted to return `CBOR` of redeemers as well (similar to JSON variant at `/scripts/datum/{datum-hash}` endpoint)

## [1.4.0] - 2023-02-07

### Added

- `unpaged` queries

## [1.3.2] - 2023-02-06

### Fixed

- CIP68 `getMetadataFromOutputDatum` parsing of `files` and custom fields

## [1.3.1] - 2023-02-03

### Fixed

- CIP25v2 metadata validation

## [1.3.0] - 2023-01-15

### Added

- support for CIP68 onchain metadata in `/assets/{asset}` and `/addresses/{address}/extended`
- support for configurable memory settings for pm2 in the nix service

### Changed

- split routes into files
- fastify deps upgrade

### Fixed

- tests
- `/network/eras` endpoint returning incorrect latest epoch boundary
- `preview`: Corrected `system_start` (`/genesis` endpoint)

## [1.2.0] - 2022-12-14

### Added

- `address` field to `/addresses/{address}/utxos` and `/addresses/{address}/utxos/{asset}`

### Changed

- increased token registry timeout to 5s -> 10s

### Fixed

- `/addresses/{address}/utxos/{asset}` asset validation for `/lovelace`
- 400 handling of invalid POST routes

## [1.1.1] - 2022-12-07

### Fixed

- wrong item count returned on the first page of `/epochs/{number}/stakes/{pool_id}`

## [1.1.0] - 2022-11-30

### Added

- `/network/eras` endpoint

### Changed

- CIP-25 standard for on-chain metadata
- refactor test environments
- production logger logs only with debug option
- replaced and improved (v2) CIP-25 validation logic for:
  - `/assets/{asset}`
  - `/addresses/{address}/extended`

### Fixed

- validation of `{asset}` and `{policy}` (400)
- ordering of various `/txs` to be consistent (useful when running ryo in cluster)
  - most notably, `/txs/{hash}/utxos` now consistently return collaterals (`collateral: true`) at the end
- `preprod` and `preview` respins: Updated `slots_per_kes_period` and `max_kes_evolutions`
- added entrypoint to Dockerfile

## [1.0.1] - 2022-10-25

### Changed

- Behaviour of `paymentCred` to improve performance with default indexes

### Fixed

- test coverage

## [1.0.0] - 2022-09-23

### Added

- Initial release
