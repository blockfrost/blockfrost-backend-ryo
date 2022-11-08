import * as databaseUtils from '../../../../src/utils/database';
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures from '../../fixtures/addresses.fixtures';
import buildFastify from '../../../../src/app';
import { describe, expect, test, vi } from 'vitest';

import * as config from '../../../../src/config';

describe('address service', () => {
  fixtures.map(fixture => {
    test(fixture.name, async () => {
      const fastify = buildFastify({ maxParamLength: 32_768 });
      const queryMock = sinon.stub();

      vi.spyOn(databaseUtils, 'getDbSync').mockReturnValue({
        // @ts-expect-error test
        release: () => null,
        query: queryMock,
      });

      await fastify.ready();

      vi.spyOn(config, 'getConfig').mockReturnValue({
        ...config.mainConfig,
        network: fixture.network === 'testnet' ? 'testnet' : 'mainnet',
      });

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMock.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = await supertest(fastify.server).get(fixture.endpoint);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toEqual(fixture.response);

      fastify.close();
    });
  });
});
