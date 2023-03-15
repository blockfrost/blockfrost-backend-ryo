import supertest from 'supertest';
import { describe, expect, test, vi } from 'vitest';

import buildFastify from '../../../../src/app.js';
import * as config from '../../../../src/config.js';
import fixtures from '../../fixtures/utils.fixtures.js';

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

      // expect(response).toMatchSnapshot();
      expect(response.body).toEqual(fixture.response);
    });
  });
});
