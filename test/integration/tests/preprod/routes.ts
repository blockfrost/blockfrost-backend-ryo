import { describe } from 'vitest';
import { preprodFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils';

describe('Integration Tests - preprod', () => {
  generateTestSuite(preprodFixtures);
});
