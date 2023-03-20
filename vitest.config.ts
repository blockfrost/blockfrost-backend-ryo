// eslint-disable-next-line import/extensions
import { defineConfig, defaultInclude } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose'],
    globalSetup: ['./test/unit/server-token-registry.ts'],
    testTimeout: 20_000,
    root: '.',
    mockReset: true,
    include: [...defaultInclude, 'test/unit/tests/**/*.ts'],
  },
});
