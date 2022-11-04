import path from 'path';
import toSatisfyApiSpecFunc from 'jest-openapi/dist/matchers/toSatisfyApiSpec.js';
import { makeApiSpec } from 'openapi-validator';
import { expect } from 'vitest';

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
  const openApiSpec = makeApiSpec(filepathOrObject);

  return {
    toSatisfyApiSpec(received: unknown) {
      return toSatisfyApiSpecFunc(received, openApiSpec);
    },
  };
};

// Load an OpenAPI file (YAML or JSON) into this plugin
const matchers = openAPIMatcher(
  path.join(__dirname, '../../node_modules/@blockfrost/openapi/openapi.yaml'),
);

expect.extend(matchers);
