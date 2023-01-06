import { expect } from 'expect';

export interface Matchers {
  toBeTypeOrNull(): void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    interface Assertion<T = any> extends Matchers {}
  }
}

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
