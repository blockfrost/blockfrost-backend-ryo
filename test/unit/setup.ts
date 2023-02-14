import path from 'path';
import toSatisfyApiSpecFunc from 'jest-openapi/dist/matchers/toSatisfyApiSpec.js';
import openapiValidator from 'openapi-validator';
import { expect } from 'vitest';
import { fileURLToPath } from 'url';

export interface OpenApiMatchers {
  toSatisfyApiSpec(): void;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    interface Assertion<T = any> extends OpenApiMatchers {}
  }
}

const openAPIMatcher = (filepathOrObject: string) => {
  const openApiSpec = openapiValidator.makeApiSpec(filepathOrObject);

  return {
    toSatisfyApiSpec(received: unknown) {
      // https://github.com/vitest-dev/vitest/issues/2120#issuecomment-1295122098
      // @ts-expect-error After ESM migration Vitest has a problem "TypeError: default is not a function", so .default() is needed
      return toSatisfyApiSpecFunc.default(received, openApiSpec);
    },
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load an OpenAPI file (YAML or JSON) into this plugin
const matchers = openAPIMatcher(
  path.join(__dirname, '../../node_modules/@blockfrost/openapi/openapi.yaml'),
);

expect.extend(matchers);
