import { defineConfig, defaultInclude } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 20_000,
    root: '.',
    mockReset: true,
    setupFiles: ['test/unit/setup.ts'],
    include: [...defaultInclude, 'test/unit/tests/**/*.ts'],
  },
});
