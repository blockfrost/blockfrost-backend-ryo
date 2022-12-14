import { describe, expect, test, vi } from 'vitest';
import * as cip68Utils from '../../../../src/utils/cip68';
import * as fixtures from '../../fixtures/cip68.fixtures';

describe('cip68 utils', () => {
  fixtures.fromLabel.map(fixture => {
    test(`fromLabel: ${fixture.description}`, async () => {
      expect(cip68Utils.fromLabel(fixture.payload)).toStrictEqual(fixture.result);
    });
  });

  fixtures.toLabel.map(fixture => {
    test(`toLabel: ${fixture.description}`, async () => {
      if (typeof fixture.result !== 'string') {
        expect(() => cip68Utils.toLabel(fixture.payload)).toThrow();
      } else {
        expect(cip68Utils.toLabel(fixture.payload)).toStrictEqual(fixture.result);
      }
    });
  });

  fixtures.toUTF8OrHex.map(fixture => {
    test(`toUTF8OrHex: ${fixture.description}`, async () => {
      expect(cip68Utils.toUTF8OrHex(fixture.payload)).toStrictEqual(fixture.result);
    });
  });

  fixtures.toCip68Assets.map(fixture => {
    test(`toCip68Assets: ${fixture.description}`, async () => {
      expect(cip68Utils.toCip68Assets(fixture.payload)).toStrictEqual(fixture.result);
    });
  });

  fixtures.getMetadataFromOutputDatum.map(fixture => {
    test(`getMetadataFromOutputDatum: ${fixture.description}`, async () => {
      expect(cip68Utils.getMetadataFromOutputDatum(fixture.payload)).toStrictEqual(fixture.result);
    });
  });
});
