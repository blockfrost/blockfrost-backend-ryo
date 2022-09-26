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

```ts
{
  // Blockfrost backend settings
  server: {
    // Server port
    port: 3000,
    // Whether to enable verbose logging, when disabled only ERRORs are printed to a console
    debug: true,
    // Whether to expose /prometheus endpoint
    prometheusMetrics: false,
  },
  // Cardano DB Sync SQL connection
  dbSync: {
    host: 'cdbsync-dev.mydomain.com',
    user: 'username',
    database: 'password',
  },
  // Cardano network - mainnet, testnet, preview, preprod
  network: 'mainnet',
  // Path to token registry directory (see next section for more details)
  tokenRegistryUrl: 'https://tokens.cardano.org',
}
```

<details>
<summary>:bulb: All config variables can be also set via environment variables which take precedence over values from a config file.</summary>

These values are `BLOCKFROST_CONFIG_SERVER_PORT`, `BLOCKFROST_CONFIG_SERVER_DEBUG`, `BLOCKFROST_CONFIG_SERVER_PROMETHEUS_METRICS`, `BLOCKFROST_CONFIG_DBSYNC_HOST`, `BLOCKFROST_CONFIG_DBSYNC_USER`, `BLOCKFROST_CONFIG_DBSYNC_DATABASE`, `BLOCKFROST_CONFIG_DBSYNC_MAX_CONN`, `BLOCKFROST_CONFIG_NETWORK`, `BLOCKFROST_CONFIG_TOKEN_REGISTRY_URL`.

</details>

#### Token registry

Blockfrost Backend uses token registry to provide off-chain metadata for native assets (eg. number of decimals). [The token registry](https://developers.cardano.org/docs/native-tokens/token-registry/cardano-token-registry/) operated by Cardano Foundation and hosted at https://tokens.cardano.org is used by default. You can use self-hosted registry by setting `tokenRegistryUrl` in the config file.

### Docker

We are hosting latest release of this software on Dockerhub. To run it using Docker:

```console
docker run --rm \
  --name blockfrost-ryo \
  -p 3000:3000 \
  -v ./config:/app/config \
  blockfrost/backend-ryo:latest
 ```

### Nix

To start the Blockfrost backend under nix, just run:

```console
$(nix-build -A blockfrost-backend --no-out-link)/bin/blockfrost-backend
```


## Developing

This is an open-source project and anyone is welcome to contribute, please see [CONTRIBUTING](CONTRIBUTING.md) for more information.
