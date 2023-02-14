import { describe } from 'vitest';
import { previewFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils.js';

describe('Integration Tests - preview', () => {
  generateTestSuite(previewFixtures);
});
