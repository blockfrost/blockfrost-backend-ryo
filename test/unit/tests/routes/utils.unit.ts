import supertest from 'supertest';
import { describe, expect, test, vi } from 'vitest';

import buildFastify from '../../../../src/app';
import * as config from '../../../../src/config';
import fixtures from '../../fixtures/utils.fixtures';

describe('utils', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const fastify = buildFastify({ maxParamLength: 32_768 });

      await fastify.ready();

      vi.spyOn(config, 'getConfig').mockReturnValue({
        ...config.mainConfig,
        network: fixture.network,
      });

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);
    });
  });
});
