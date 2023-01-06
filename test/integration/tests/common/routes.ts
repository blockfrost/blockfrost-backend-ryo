import { describe } from 'vitest';
import { commonFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils';

describe('Integration Tests - common', () => {
  generateTestSuite(commonFixtures);
});
