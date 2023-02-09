# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
