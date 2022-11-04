import { defineConfig } from 'vitest/config';

if (!['mainnet', 'preprod', 'preview'].includes(process.env.NETWORK as string)) {
  throw 'Error NETWORK env variable can be only `testnet, mainnet, preview, preprod`';
}

export default defineConfig({
  test: {
    testTimeout: 50_000,
    globalSetup: ['./test/integration/server-tests.ts'],
    hookTimeout: 30_000,
    cache: false,
    include: [
      `./test/integration/tests/${process.env.NETWORK}/**/*.ts`,
      `./test/integration/tests/common/**/*.ts`,
    ],
  },
});
