import sinon from 'sinon';
import {
  validateStakeAddressFixture,
  convertStakeAddressFixture,
  validateAndConvertPoolFixture,
  validateDerivationXpubFixture,
  validateInRangeUnsignedIntFixture,
  validatePositiveInRangeSignedIntFixture,
  validatePositiveInRangeSignedBigIntFixture,
  validateBlockHashFixture,
  validateHexFixture,
  isNumber,
} from '../../fixtures/validation-format-utils.fixtures';
import * as config from '../../../../src/config';
import * as validationUtils from '../../../../src/utils/validation';

describe('validation-format-utils', () => {
  validateStakeAddressFixture.map(fixture => {
    test(fixture.name, async () => {
      const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
        ...config.mainConfig,
        network: fixture.network,
      });
      const result = validationUtils.validateStakeAddress(fixture.input);

      sinonConfigStub.restore();
      expect(result).toBe(fixture.response);
    });
  });

  validateAndConvertPoolFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateAndConvertPool(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  validateDerivationXpubFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateDerivationXpub(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  validateInRangeUnsignedIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateInRangeUnsignedInt(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  validatePositiveInRangeSignedIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validatePositiveInRangeSignedInt(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  validatePositiveInRangeSignedBigIntFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validatePositiveInRangeSignedBigInt(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  validateBlockHashFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateBlockHash(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  isNumber.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.isNumber(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });

  convertStakeAddressFixture.map(fixture => {
    test(fixture.name, async () => {
      const sinonConfigStub = sinon.stub(config, 'getConfig').returns({
        ...config.mainConfig,
        network: fixture.network,
      });
      const result = validationUtils.convertStakeAddress(fixture.input);

      sinonConfigStub.restore();
      expect(result).toBe(fixture.response);
    });
  });

  validateHexFixture.map(fixture => {
    test(fixture.name, async () => {
      const result = validationUtils.validateHex(fixture.input);

      expect(result).toBe(fixture.response);
    });
  });
});
