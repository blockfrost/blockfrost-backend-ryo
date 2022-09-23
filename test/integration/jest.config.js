const tsPreset = require('ts-jest/jest-preset');

module.exports = {
  rootDir: '.',
  testMatch: [
    `<rootDir>/tests-${process.env.IS_TESTNET ? 'testnet' : 'mainnet'}/**/*.ts`,
    `<rootDir>/tests-common/**/*.ts`,
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'test/integration/tsconfig.test.json',
    },
  },
  ...tsPreset,
  setupFilesAfterEnv: ['./setup.ts'],
};
