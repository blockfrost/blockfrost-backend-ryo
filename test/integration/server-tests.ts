import type { PreviewServer } from 'vite';
import { preview } from 'vite';

let server: PreviewServer;

export const setup = async () => {
  server = await preview();
};

export const teardown = async () => {
  await new Promise<void>((resolve, reject) => {
    server.httpServer.close(error => (error ? reject(error) : resolve()));
  });
};
