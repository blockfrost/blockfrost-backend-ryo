import { describe } from 'vitest';
import { previewFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils';

describe('Integration Tests - preview', () => {
  console.log('omg');
  generateTestSuite(previewFixtures);
});
