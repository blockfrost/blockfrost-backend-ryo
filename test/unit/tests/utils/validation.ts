import { describe, expect, test, vi } from 'vitest';
import * as config from '../../../../src/config.js';
import * as validationUtils from '../../../../src/utils/validation.js';
import {
  convertStakeAddressFixture,
  isNumber,
  validateAndConvertPoolFixture,
  validateBlockHashFixture,
  validateDerivationXpubFixture,
  validateHexFixture,
  validateInRangeUnsignedIntFixture,
  validatePositiveInRangeSignedBigIntFixture,
  validatePositiveInRangeSignedIntFixture,
  validateStakeAddressFixture,
} from '../../fixtures/validation.fixtures.js';

describe('validation-format-utils', () => {
  validateStakeAddressFixture.map(fixture => {
    test(fixture.name, async () => {
      vi.spyOn(config, 'getConfig').mockReturnValue({
        ...config.mainConfig,
        network: fixture.network,
      });

      const result = validationUtils.validateStakeAddress(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validateAndConvertPoolFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateAndConvertPool(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validateDerivationXpubFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateDerivationXpub(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validateInRangeUnsignedIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateInRangeUnsignedInt(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validatePositiveInRangeSignedIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validatePositiveInRangeSignedInt(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validatePositiveInRangeSignedBigIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validatePositiveInRangeSignedBigInt(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validateBlockHashFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateBlockHash(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  isNumber.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.isNumber(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  convertStakeAddressFixture.map(fixture => {
    test(fixture.name, async () => {
      vi.spyOn(config, 'getConfig').mockReturnValue({
        ...config.mainConfig,
        network: fixture.network,
      });

      const result = validationUtils.convertStakeAddress(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  validateHexFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateHex(fixture.input);

      expect(result).toStrictEqual(fixture.response);
    });
  });

  test('validationUtils.validateDRepId', () => {
    expect(validationUtils.validateDRepId('drep_always_abstain')).toStrictEqual({
      id: 'drep_always_abstain',
      raw: null,
      hasScript: false,
    });

    expect(validationUtils.validateDRepId('drep_always_no_confidence')).toStrictEqual({
      id: 'drep_always_no_confidence',
      raw: null,
      hasScript: false,
    });

    expect(
      validationUtils.validateDRepId('drep1y3wylkrkyt3q6u078ajh8f2henflpsq5hrcqhfa3yfmlqx7z66n'),
    ).toStrictEqual({
      id: 'drep1y3wylkrkyt3q6u078ajh8f2henflpsq5hrcqhfa3yfmlqx7z66n',
      raw: '\\x245c4fd87622e20d71fe3f6573a557ccd3f0c014b8f00ba7b12277f0',
      hasScript: false,
    });

    expect(
      validationUtils.validateDRepId('drep1edu7a90eszdus0hguck2w3lxr5r0juvc9frrxv3d2e6fcnqte0e'),
    ).toStrictEqual({
      id: 'drep1edu7a90eszdus0hguck2w3lxr5r0juvc9frrxv3d2e6fcnqte0e',
      raw: '\\xcb79ee95f9809bc83ee8e62ca747e61d06f971982a4633322d56749c',
      hasScript: false,
    });

    expect(
      validationUtils.validateDRepId(
        'drep_script1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vadhlap',
      ),
    ).toStrictEqual({
      id: 'drep_script1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vadhlap',
      raw: '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
      hasScript: true,
    });

    expect(
      validationUtils.validateDRepId('drep1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vj02hpq'),
    ).toStrictEqual({
      id: 'drep1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vj02hpq',
      raw: '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
      hasScript: false,
    });
    expect(
      validationUtils.validateDRepId(
        'drep_script16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5sh6f6d',
      ),
    ).toStrictEqual({
      id: 'drep_script16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5sh6f6d',
      raw: '\\xd04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
      hasScript: true,
    });
  });
});
