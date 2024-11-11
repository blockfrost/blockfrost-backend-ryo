<a href="https://fivebinaries.com/"><img src="https://img.shields.io/badge/made%20by-Five%20Binaries-darkviolet.svg?style=flat-square" /></a>

<img src="https://blockfrost.io/images/logo.svg" width="250" align="right" height="90"><br>

# Blockfrost.io backend service

<p align="center"><a href="https://blockfrost.io">Blockfrost.io</a> backend is <a href="https://github.com/blockfrost/openapi">an API service</a> providing abstraction between you and Cardano blockchain data, taking away the burden of complexity, so you can focus on what really matters - developing your applications. <br><br> You can now Run-Your-Own.</p>
<p align="center">
  <a href="#getting-started">Getting started</a> •
  <a href="#running-your-own">Running your own</a> •
  <a href="#developing">Developing</a> •
  <a href="https://github.com/orgs/blockfrost/projects/8">:pushpin: Roadmap</a>
</p>
<br>

## Getting started

The backend is Node.js app written in Typescript using Fastify. To run it you need Node.js version 16 and higher (LTS is highly recommended). Blockchain data are queried from [cardano-db-sync](https://github.com/input-output-hk/cardano-db-sync). Follow their documentation to learn more about running your own instance.

## Running your own

We made it simple to run your own version of the Blockfrost backend.

### System requirements

The system requirements for the basic Blockfrost backend stack (which means `blockfrost-backend`, `cardano-node`, `cardano-db-sync` and `postgresql` on the same machine) are:

- 64 GB of RAM or more
- 8 CPU cores or more
- 250 GB of disk space or more
- SSD disk with at least 80k IOPS (measured as chunk size)

### Configuration

There are several configuration files in `config` directory. Config file is picked based on a value in an environment variable `NODE_ENV` (value set in `NODE_ENV` must match the name of the config file). This environment variable is set automatically while running the backend via prepared `yarn` scripts.

If you are using an authenticated db connection that requires a password, you'd need to provide a `PGPASSWORD` environment variable and the postgres library will automatically pick it up.

#### Schema

```yaml

  // Blockfrost backend settings
  server:
    # Server listen address, you need to set this to 0.0.0.0 if running within docker
    listenAddress: 'localhost'
    # Server port
    port: 3000
    # Whether to enable verbose logging, when disabled only ERRORs are printed to a console
    debug: true
    # Whether to expose /prometheus endpoint
    prometheusMetrics: false
  # Cardano DB Sync SQL connection
  dbSync:
    host: 'cdbsync-dev.mydomain.com'
    user: 'username'
    database: 'dbname'
    # Optionally define a password
    password: 'randomstringthatissolongandpowerfulthatnoonecanguess'
  # Cardano network - mainnet, testnet, preview, preprod, custom
  network: 'mainnet'
  # path to the folder containing genesis data. If left blank, ./genesis/${network} will be used
  genesisDataFolder: './genesis/mainnet'
  # Path to token registry directory (see next section for more details)
  tokenRegistryUrl: 'https://tokens.cardano.org'
  # Experimental Mithril proxy
  mithril:
    enabled: true # ENV var BLOCKFROST_MITHRIL_ENABLED=true
    aggregator: "https://aggregator.pre-release-preview.api.mithril.network/aggregator" # ENV var BLOCKFROST_MITHRIL_AGGREGATOR
    snapshotCDN: "https://example.com/" # ENV var BLOCKFROST_MITHRIL_SNAPSHOT_CDN
```

<details>
<summary>:bulb: All config variables can be also set via environment variables which take precedence over values from a config file.</summary>

These values are `BLOCKFROST_CONFIG_SERVER_PORT`, `BLOCKFROST_CONFIG_SERVER_DEBUG`, `BLOCKFROST_CONFIG_SERVER_PROMETHEUS_METRICS`, `BLOCKFROST_CONFIG_DBSYNC_HOST`, `BLOCKFROST_CONFIG_DBSYNC_USER`, `BLOCKFROST_CONFIG_DBSYNC_DATABASE`, `BLOCKFROST_CONFIG_DBSYNC_MAX_CONN`, `BLOCKFROST_CONFIG_NETWORK`, `BLOCKFROST_CONFIG_GENESIS_DATA_FOLDER`, `BLOCKFROST_CONFIG_TOKEN_REGISTRY_URL`.

</details>

#### Token registry

Blockfrost Backend uses token registry to provide off-chain metadata for native assets (eg. number of decimals). [The token registry](https://developers.cardano.org/docs/native-tokens/token-registry/cardano-token-registry/) operated by Cardano Foundation and hosted at <https://tokens.cardano.org> is used by default. You can use self-hosted registry by setting `tokenRegistryUrl` in the config file.

#### Indices

Although it is possible to run RYO with vanilla db sync, Blockfrost usually queries hex values in the already encoded form.

Therefore, in order to speed up queries, it is recommended to create the following, custom, indices:

```
CREATE INDEX IF NOT EXISTS bf_idx_block_hash_encoded ON block USING HASH (encode(hash, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_datum_hash ON datum USING HASH (encode(hash, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_multi_asset_policy ON multi_asset USING HASH (encode(policy, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_multi_asset_policy_name ON multi_asset USING HASH ((encode(policy, 'hex') || encode(name, 'hex')));
CREATE INDEX IF NOT EXISTS bf_idx_pool_hash_view ON pool_hash USING HASH (view);
CREATE INDEX IF NOT EXISTS bf_idx_redeemer_data_hash ON redeemer_data USING HASH (encode(hash, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_scripts_hash ON script USING HASH (encode(hash, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_tx_hash ON tx USING HASH (encode(hash, 'hex'));
CREATE UNIQUE INDEX IF NOT EXISTS bf_u_idx_epoch_stake_epoch_and_id ON epoch_stake (epoch_no, id);
CREATE INDEX IF NOT EXISTS bf_idx_reference_tx_in_tx_in_id ON reference_tx_in (tx_in_id);
CREATE INDEX IF NOT EXISTS bf_idx_collateral_tx_in_tx_in_id ON collateral_tx_in (tx_in_id);
CREATE INDEX IF NOT EXISTS bf_idx_redeemer_script_hash ON redeemer USING HASH (encode(script_hash, 'hex'));
CREATE INDEX IF NOT EXISTS bf_idx_redeemer_tx_id ON redeemer USING btree (tx_id);
CREATE INDEX IF NOT EXISTS bf_idx_col_tx_out ON collateral_tx_out USING btree (tx_id);
CREATE INDEX IF NOT EXISTS bf_idx_ma_tx_mint_ident ON ma_tx_mint USING btree (ident);
CREATE INDEX IF NOT EXISTS bf_idx_ma_tx_out_ident ON ma_tx_out USING btree (ident);
CREATE INDEX IF NOT EXISTS bf_idx_reward_rest_addr_id ON reward_rest USING btree (addr_id);
CREATE INDEX IF NOT EXISTS bf_idx_reward_rest_spendable_epoch ON reward_rest USING btree (spendable_epoch);
CREATE INDEX bf_idx_stake_address_raw ON public.drep_hash USING hash (raw);
CREATE INDEX bf_idx_stake_address_view ON public.drep_hash USING hash (view);
CREATE INDEX bf_idx_delegation_vote_addr_id ON delegation_vote USING HASH (addr_id);

```

### Experimental features

### Mithril

Blockfrost Backend optionally provides a proxy for the Mithril aggregator API. This feature allows users to interact with Mithril's endpoints through Blockfrost, with additional enhancements and customizations specific to Blockfrost.

> This is an experimental feature. Mithril is currently a work in progress and its API may change.

All Mithril-related endpoints are available under the `/mithril` path.
For list of available endpoints please visit https://mithril.network/doc/aggregator-api/.

To enable this experimental feature add following lines to your config:

```yaml
mithril:
  enabled: true # ENV var BLOCKFROST_MITHRIL_ENABLED=true
  aggregator: 'https://aggregator.pre-release-preview.api.mithril.network/aggregator' # ENV var BLOCKFROST_MITHRIL_AGGREGATOR
  snapshotCDN: 'https://example.com/' # Optional, ENV var BLOCKFROST_MITHRIL_SNAPSHOT_CDN
```

Then you can simply query Mithril API using Blockfrost Backend:

```
curl localhost:3000/mithril/artifact/snapshots
```

If you set `mithril.snapshotCDN` option, then the response of `/artifact/snapshots` and `/artifact/snapshot/{digest}` endpoints is enhanced with additional link to the list of snapshot locations.

### Docker

We are hosting latest release of this software on Dockerhub. To run it using Docker:

```console
docker run --rm \
  --name blockfrost-ryo \
  -p 3000:3000 \
  -e BLOCKFROST_CONFIG_SERVER_LISTEN_ADDRESS=0.0.0.0 \
  -v $PWD/config:/app/config \
  blockfrost/backend-ryo:latest
```

You can also generate a Docker image using Nix instead of the `Dockerfile` running

```console
nix build .#dockerImage
```

### Nix

To start the Blockfrost backend under nix, just run:

```console
$(nix-build -A blockfrost-backend-ryo --no-out-link)/bin/blockfrost-backend-ryo
```

Or, since this repository is also a Nix flake, you can also run

```console
nix run # inside this repo folder
# Otherwise, without manually cloning the repo before:
# nix run github:blockfrost/blockfrost-backend-ryo
```

#### NixOS module

It's also possible enabling the Blockfrost backend on NixOS using the module provided by the flake.
A minimal usage example is:

```nix
{config, ...}: {
  imports = [
    # official IOG cardano node NixOS  module
    # official IOG cardano-db-sync NixOS module
    # module provided by this flake
  ];
  services = {
    cardano-node = {
      enable = true;
      # rest of you config...
    };
    cardano-db-sync = {
      enable = true;
      socketPath = config.services.cardano-node.socketPath;
      # rest of your config...
    };
    postgresql = {
      enable = true;
      ensureDatabases = [ config.services.cardano-db-sync.postgres.database ];
      ensureUsers = [{
        name = config.services.cardano-db-sync.postgres.user;
        ensurePermissions = {
          "DATABASE ${config.services.cardano-db-sync.postgres.database}" = "ALL PRIVILEGES";
        };
      }];
       identMap = ''
        users root ${config.services.cardano-db-sync.postgres.user}
        users cardano-db-sync ${config.services.cardano-db-sync.postgres.user}
        users ${config.services.blockfrost.user} ${config.services.cardano-db-sync.postgres.user}
        users postgres postgres
      '';
      authentication = ''
        local all all ident map=users
      '';
    };
    blockfrost = {
      enable = true;
      settings.dbSync = {
        user = config.services.cardano-db-sync.postgres.user;
        port = config.services.cardano-db-sync.postgres.port;
        database = config.services.cardano-db-sync.postgres.database;
        host = config.services.cardano-db-sync.postgres.socketdir;
      };
    };
  };
}
```

Check the [nixos-module.nix file](./nixos-module.nix) to check options and the default values.

## Custom Networks
blockfrost-ryo can be configured to run with any genesis parameters. Setting network to `custom`, and using `genesisDataFolder` value in the yaml configuration or environment variable `BLOCKFROST_CONFIG_GENESIS_DATA_FOLDER` you can specify your genesis details.

## Developing

This is an open-source project and anyone is welcome to contribute, please see [CONTRIBUTING](CONTRIBUTING.md) for more information.
