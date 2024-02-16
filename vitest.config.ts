// eslint-disable-next-line import/extensions
import { defineConfig, defaultInclude } from 'vitest/config';

export default defineConfig({
  test: {
    // https://vitest.dev/guide/common-errors.html#failed-to-terminate-worker
    pool: 'forks',
    reporters: ['verbose'],
    testTimeout: 20_000,
    root: '.',
    mockReset: true,
    include: [...defaultInclude, 'test/unit/tests/**/*.ts'],
  },
});
