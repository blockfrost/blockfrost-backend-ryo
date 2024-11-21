import { describe, expect, test } from 'vitest';
import { appendLocationToSnapshot } from '../../../../src/utils/mithril.js';

describe('mithril utils', () => {
  test('appendLocationToSnapshot', () => {
    expect(
      appendLocationToSnapshot(
        {
          digest: '726f5801f7749080ab27e184d6fbd7850d571952a6cf7a8e55e79ffc04b55a78',
          beacon: {
            network: 'mainnet',
            epoch: 522,
            immutable_file_number: 6492,
          },
          certificate_hash: '95306acc7c57b20f1fb451c4abf4acdb09345edf866cb28823dc1acf3f032349',
          size: 51_840_671_826,
          created_at: '2024-11-17T16:45:55.499648095Z',
          locations: [
            'https://storage.googleapis.com/cdn.aggregator.release-mainnet.api.mithril.network/mainnet-e522-i6492.726f5801f7749080ab27e184d6fbd7850d571952a6cf7a8e55e79ffc04b55a78.tar.zst',
          ],
          compression_algorithm: 'zstandard',
          cardano_node_version: '10.1.2',
        },
        [
          {
            originalUrl:
              'https://storage.googleapis.com/cdn.aggregator.release-mainnet.api.mithril.network',
            mirrorUrl: 'https://mirror.com',
          },
        ],
      ),
    ).toStrictEqual({
      digest: '726f5801f7749080ab27e184d6fbd7850d571952a6cf7a8e55e79ffc04b55a78',
      beacon: {
        network: 'mainnet',
        epoch: 522,
        immutable_file_number: 6492,
      },
      certificate_hash: '95306acc7c57b20f1fb451c4abf4acdb09345edf866cb28823dc1acf3f032349',
      size: 51_840_671_826,
      created_at: '2024-11-17T16:45:55.499648095Z',
      locations: [
        'https://storage.googleapis.com/cdn.aggregator.release-mainnet.api.mithril.network/mainnet-e522-i6492.726f5801f7749080ab27e184d6fbd7850d571952a6cf7a8e55e79ffc04b55a78.tar.zst',
        'https://mirror.com/mainnet-e522-i6492.726f5801f7749080ab27e184d6fbd7850d571952a6cf7a8e55e79ffc04b55a78.tar.zst',
      ],
      compression_algorithm: 'zstandard',
      cardano_node_version: '10.1.2',
    });
  });
});
