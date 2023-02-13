import express from 'express';
import { Server } from 'http';
import * as mocks from './fixtures/token-registry.fixtures.js';

let server: Server;
const serverName = 'token registry server';
const port = 3100;

export const setup = () => {
  console.log(`Running ${serverName} mock on port ${port}`);
  const app = express();

  app.get(
    '/metadata/00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e',
    (_request, response) => {
      response.status(200).json(mocks.transformTokenRegistryAssetFixture[0].tokenRegistryAsset);
    },
  );

  server = app.listen({ port });
};

export const teardown = () => {
  console.log(`Closing ${serverName} mock on port ${port}`);
  server.close();
};
