import { transformTokenRegistryAssetFixture } from '../../fixtures/token-registry.fixtures';
import * as tokenRegistryUtils from '../../../../src/utils/token-registry';

describe('validation-format-utils', () => {
  transformTokenRegistryAssetFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = tokenRegistryUtils.transformTokenRegistryAsset(fixture.tokenRegistryAsset);

      expect(result).toStrictEqual(fixture.result);
    });
  });
});
