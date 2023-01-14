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
});
