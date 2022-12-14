# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] -

### Added

- `address` field to `/addresses/{address}/utxos` and `/addresses/{address}/utxos/{asset}`

### Changed

- increased token registry timeout to 5s -> 10s

### Fixed

- `/addresses/{address}/utxos/{asset}` asset validation for `/lovelace`

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
