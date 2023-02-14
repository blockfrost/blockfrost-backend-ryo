import { describe } from 'vitest';
import { preprodFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils.js';

describe('Integration Tests - preprod', () => {
  generateTestSuite(preprodFixtures);
});
