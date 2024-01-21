# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

| :warning: WARNING                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------- |
| This version of `blockfrost-backend-ryo` requires `cardano-db-sync 13.1.1.3` or newer. Use version `1.7.x` for earlier releases. |

### Added

- `/governance/dreps`
- `/governance/dreps/{hash}`
- `/governance/dreps/{hash}/distribution`
- feature flag to turn on/off `CIP-1694` support
- support for Cardano Sanchonet
- translation of cost models from numerical IDs to strings,
  required for `cardano-db-sync 13.1.1.3` and newer [#130](https://github.com/blockfrost/blockfrost-backend-ryo/pull/130)

### Changed

- node_modules
- yarn

### Fixed

- port configuration via config option `dbSync.port`

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

- `onchain_metadata_extra` field to `/assets/:asset`
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
