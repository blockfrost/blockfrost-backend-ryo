import * as routesUtils from '../../../../src/utils/routes.js';
import { describe, expect, test } from 'vitest';

describe('routes utils', () => {
  test('standardSafeZone', async () => {
    expect(routesUtils.standardSafeZone(1, 2)).toStrictEqual(1.5);
    expect(routesUtils.standardSafeZone(0, 1)).toStrictEqual(0);
  });
});
