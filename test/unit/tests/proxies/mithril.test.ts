import nock from 'nock';
import { expect, test, describe, afterEach, vi } from 'vitest';
import * as config from '../../../../src/config.js';
import buildFastify from '../../../../src/app.js';
const mithrilAggregatorURL = config.loadConfig().mithril.aggregator;

describe('mithril proxy text', () => {
  afterEach(() => {
    // restoring date after each test run
    vi.restoreAllMocks();
  });

  test('forwards 200 response', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/')
      .reply(
        200,
        {
          open_api_version: '0.1.21',
          documentation_url: 'https://mithril.network',
          capabilities: {
            signed_entity_types: ['MithrilStakeDistribution', 'CardanoImmutableFilesFull'],
          },
        },
        { 'content-type': 'application/json' },
      );

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      open_api_version: '0.1.21',
      documentation_url: 'https://mithril.network',
      capabilities: {
        signed_entity_types: ['MithrilStakeDistribution', 'CardanoImmutableFilesFull'],
      },
    });
  });

  test('forbids GET endpoint outside of allowlist', async () => {
    vi.spyOn(config, 'getConfig').mockReturnValue({
      ...config.mainConfig,
      network: 'mainnet',
      mithril: {
        ...config.mainConfig.mithril,
        allowedEndpoints: ['/artifact/snapshots'], // root endpoint not allowed
      },
    });

    const app = buildFastify();

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual({
      error: 'Bad Request',
      message: 'Invalid path. Please check https://docs.blockfrost.io/',
      status_code: 400,
    });
  });

  test('forbids POST endpoint outside of allowlist', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL).post('/register-signer').reply(
      200,
      {
        dummy: 'mock for POST endpoint that should not be allowed',
      },
      { 'content-type': 'application/json' },
    );

    const response = await app.inject({
      method: 'POST',
      url: '/mithril/register-signer',
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual({
      error: 'Bad Request',
      message: 'Invalid path. Please check https://docs.blockfrost.io/',
      status_code: 400,
    });
  });

  test('modifies response /artifact/snapshots with added snapshot location link', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/artifact/snapshots')
      .reply(
        200,
        [
          {
            digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
            beacon: {
              network: 'preview',
              epoch: 575,
              immutable_file_number: 11_509,
            },
            certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
            size: 2_443_491_129,
            created_at: '2024-05-22T15:17:47.601798793Z',
            locations: [
              'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
            ],
            compression_algorithm: 'zstandard',
            cardano_node_version: '8.9.0',
          },
          {
            digest: 'dc55f5508a3beedf990a362037ddc21a8d39e3ed81ab81eb5fa62c0a2835c0f6',
            beacon: {
              network: 'preview',
              epoch: 575,
              immutable_file_number: 11_508,
            },
            certificate_hash: '639a323c27baef3991df86ed7db6dedb6e58e0544c23f299afb3c9458a744718',
            size: 2_443_728_916,
            created_at: '2024-05-22T14:02:55.976983297Z',
            locations: [
              'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11508.dc55f5508a3beedf990a362037ddc21a8d39e3ed81ab81eb5fa62c0a2835c0f6.tar.zst',
            ],
            compression_algorithm: 'zstandard',
            cardano_node_version: '8.9.0',
          },
        ],
        { 'content-type': 'application/json' },
      );

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/artifact/snapshots',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual([
      {
        digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
        beacon: {
          network: 'preview',
          epoch: 575,
          immutable_file_number: 11_509,
        },
        certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
        size: 2_443_491_129,
        created_at: '2024-05-22T15:17:47.601798793Z',
        locations: [
          'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
          'https://dummy-mithril-snapshot-cdn.com/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
        ],
        compression_algorithm: 'zstandard',
        cardano_node_version: '8.9.0',
      },
      {
        digest: 'dc55f5508a3beedf990a362037ddc21a8d39e3ed81ab81eb5fa62c0a2835c0f6',
        beacon: {
          network: 'preview',
          epoch: 575,
          immutable_file_number: 11_508,
        },
        certificate_hash: '639a323c27baef3991df86ed7db6dedb6e58e0544c23f299afb3c9458a744718',
        size: 2_443_728_916,
        created_at: '2024-05-22T14:02:55.976983297Z',
        locations: [
          'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11508.dc55f5508a3beedf990a362037ddc21a8d39e3ed81ab81eb5fa62c0a2835c0f6.tar.zst',
          'https://dummy-mithril-snapshot-cdn.com/preview-e575-i11508.dc55f5508a3beedf990a362037ddc21a8d39e3ed81ab81eb5fa62c0a2835c0f6.tar.zst',
        ],
        compression_algorithm: 'zstandard',
        cardano_node_version: '8.9.0',
      },
    ]);
  });

  test('modifies response /artifact/snapshot/:digest with added snapshot location link', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/artifact/snapshot/3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba')
      .reply(
        200,

        {
          digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
          beacon: {
            network: 'preview',
            epoch: 575,
            immutable_file_number: 11_509,
          },
          certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
          size: 2_443_491_129,
          created_at: '2024-05-22T15:17:47.601798793Z',
          locations: [
            'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
          ],
          compression_algorithm: 'zstandard',
          cardano_node_version: '8.9.0',
        },

        { 'content-type': 'application/json' },
      );

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/artifact/snapshot/3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
      beacon: {
        network: 'preview',
        epoch: 575,
        immutable_file_number: 11_509,
      },
      certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
      size: 2_443_491_129,
      created_at: '2024-05-22T15:17:47.601798793Z',
      locations: [
        'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
        'https://dummy-mithril-snapshot-cdn.com/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
      ],
      compression_algorithm: 'zstandard',
      cardano_node_version: '8.9.0',
    });
  });

  test('DOES NOT modifies response /artifact/snapshot/:digest when mithril.snapshotMirrors is not set', async () => {
    vi.spyOn(config, 'getConfig').mockReturnValue({
      ...config.mainConfig,
      network: 'mainnet',
      mithril: {
        ...config.mainConfig.mithril,
        snapshotMirrors: undefined,
      },
    });

    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/artifact/snapshot/3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba')
      .reply(
        200,

        {
          digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
          beacon: {
            network: 'preview',
            epoch: 575,
            immutable_file_number: 11_509,
          },
          certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
          size: 2_443_491_129,
          created_at: '2024-05-22T15:17:47.601798793Z',
          locations: [
            'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
          ],
          compression_algorithm: 'zstandard',
          cardano_node_version: '8.9.0',
        },

        { 'content-type': 'application/json' },
      );

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/artifact/snapshot/3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      digest: '3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba',
      beacon: {
        network: 'preview',
        epoch: 575,
        immutable_file_number: 11_509,
      },
      certificate_hash: '8edd5fb9e81fb2dbea22332c9cd1ae91e3b11f1dc90e862297c75615daabc43f',
      size: 2_443_491_129,
      created_at: '2024-05-22T15:17:47.601798793Z',
      locations: [
        'https://storage.googleapis.com/cdn.aggregator.pre-release-preview.api.mithril.network/preview-e575-i11509.3de0e6d3fd837ae1035688623cb4de8318f6205ea02da6df2592dabecdd631ba.tar.zst',
      ],
      compression_algorithm: 'zstandard',
      cardano_node_version: '8.9.0',
    });
  });

  test('error handling - 3rd party html errors (eg. varnish)', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/')
      .reply(500, 'nice html error from varnish', { 'content-type': 'text/html' });

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(
      '{"error":"Internal Server Error","message":"An unexpected response was received from the backend.","status_code":500}',
    );
  });

  test('error handling - 3rd party errors without content-type', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL).get('/').reply(500, 'nice html error from varnish');

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(
      '{"error":"Internal Server Error","message":"An unexpected response was received from the backend.","status_code":500}',
    );
  });

  test('error handling 400 - 3rd party html errors', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/')
      .reply(400, 'nice html error from varnish', { 'content-type': 'text/html' });

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(
      '{"error":"Internal Server Error","message":"An unexpected response was received from the backend.","status_code":500}',
    );
  });

  test('error handling - mithril aggregator error (404) should be forwarded', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL).get('/').reply(404, undefined, { 'mithril-api-version': '0.1.21' });

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('');
  });

  test('error handling - mithril aggregator error (412) should be forwarded', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL).get('/').reply(412, undefined, { 'mithril-api-version': '0.1.21' });

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(412);
    expect(response.body).toBe('');
  });
  test('error handling - unknown mithril aggregator error (400) forwarded', async () => {
    const app = buildFastify();

    nock(mithrilAggregatorURL)
      .get('/')
      .reply(400, 'unexpected body', { 'mithril-api-version': '0.1.21' });

    const response = await app.inject({
      method: 'GET',
      url: '/mithril/',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('unexpected body');
  });
});
