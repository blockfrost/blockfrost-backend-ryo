import { describe } from 'vitest';
import { mainnetFixtures } from '@blockfrost/blockfrost-tests';
import { generateTestSuite } from '../../utils';

describe('Integration Tests - mainnet', () => {
  generateTestSuite(mainnetFixtures);
});
