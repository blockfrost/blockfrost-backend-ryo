# Contributing to Blockfrost backend

## Submitting a pull request

- Keep pull request focused on one topic
- Mark your pull request as a `Draft` while still working on it
- Provide informative commit messages
- Try to clean-up your commit history before submitting the pull request for review
  - Squash the formatting, whitespace or other minor changes to relevant commits using interactive rebase (`git rebase -i`)

## Development environment

Use `nix-shell` to enter development environment with pinned version of dependencies and tools. A `yarn` command is automatically executed when entering `nix-shell`, however, if you make a change to dependencies, you have to re-run `yarn` manually.

You will need also the [yarn-plugin-nixify](https://github.com/stephank/yarn-plugin-nixify) to rebuild your pinned dependencies.

After that, make sure you install all the dependencies.

```
$ yarn
```

Next, you can run your local development environment.

```
$ yarn dev
```

### Generating TS types from Blockfrost OpenAPI

In `package.json` you will find script `generate-types`. Running it generates types from [@blockfrost/openapi](https://github.com/blockfrost/openapi) and generates typescript types into `/src/types/openapi.ts` file. These types are used in the implementation of API endpoints to ensure that response returned to a client matches the specification.

```
$ yarn generate-types
```

## Testing

### Unit tests

```
$ yarn test
```

### Integration tests

When running integration tests, make sure that you have updated appropriate configuration files (`development.ts` and `development-testnet.ts`) in the `config/` directory to point to your cardano-db-sync instance.

Mainnet:

```
$ yarn dev
$ yarn test-integration-local-mainnet
```

Testnet:

```
$ yarn dev-testnet
$ yarn test-integration-local-testnet
```
