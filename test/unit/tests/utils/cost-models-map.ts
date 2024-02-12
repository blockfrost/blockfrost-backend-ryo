import { costModelsMapFixture } from '../../fixtures/cost-models-map-fixtures.js';
import * as costModelsMapUtils from '../../../../src/utils/cost-models-map.js';
import { describe, expect, test } from 'vitest';

describe('costModelsMap utils', () => {
  costModelsMapFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = costModelsMapUtils.costModelsMap(fixture.costModels);

      expect(result).toStrictEqual(fixture.result);
    });
  });
});
