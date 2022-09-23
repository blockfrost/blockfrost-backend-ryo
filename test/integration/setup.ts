import { jest } from '@jest/globals';
import axios from 'axios';

jest.setTimeout(120_000);

axios.interceptors.request.use(function (config) {
  config.timeout = 30_000;
  return config;
});

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

beforeEach(async () => {
  await sleep(500);
});

expect.extend({
  toBeTypeOrNull(received, classTypeOrNull) {
    try {
      expect(received).toEqual(expect.any(classTypeOrNull));
      return {
        message: () => `Ok`,
        pass: true,
      };
    } catch {
      return received === null
        ? {
            message: () => `Ok`,
            pass: true,
          }
        : {
            message: () => `expected ${received} to be ${classTypeOrNull} type or null`,
            pass: false,
          };
    }
  },
});

// danger this should be last in this code
import 'jest-extended';
