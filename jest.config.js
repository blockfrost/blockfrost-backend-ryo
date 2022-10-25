const { triggerAsyncId } = require('async_hooks');
const config = require('config');
const { rules } = require('eslint-config-prettier');

let collectCoveragePaths = [];

collectCoveragePaths = [
  '<rootDir>/src/routes/**/*.ts',
  '<rootDir>/src/utils/**/*.ts',
  '!**/node_modules/**',
];

module.exports = {
  rootDir: '.',
  bail: true,
  resetMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
  testMatch: ['<rootDir>/test/unit/tests/**/*.ts'],
  coverageReporters: ['json-summary', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: collectCoveragePaths,
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  preset: 'ts-jest',
};
