// eslint-disable-next-line import/extensions
import { defineConfig } from 'vitest/config';
import { chai } from 'vitest';

// Allows to print long diffs
chai.config.truncateThreshold = 100_000;

if (!['mainnet', 'preprod', 'preview'].includes(process.env.NETWORK as string)) {
  throw 'Error NETWORK env variable can be only `mainnet, preview, preprod`';
}

export default defineConfig({
  test: {
    reporters: ['verbose'],
    testTimeout: 50_000,
    passWithNoTests: true,
    hookTimeout: 30_000,
    cache: false,
    include: [
      `./test/integration/tests/${process.env.NETWORK}/**/*.ts`,
      `./test/integration/tests/common/**/*.ts`,
    ],
  },
});
