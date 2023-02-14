import { transformTokenRegistryAssetFixture } from '../../fixtures/token-registry.fixtures.js';
import * as tokenRegistryUtils from '../../../../src/utils/token-registry.js';
import { describe, expect, test } from 'vitest';

describe('validation-format-utils', () => {
  transformTokenRegistryAssetFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = tokenRegistryUtils.transformTokenRegistryAsset(fixture.tokenRegistryAsset);

      expect(result).toStrictEqual(fixture.result);
    });
  });
});
