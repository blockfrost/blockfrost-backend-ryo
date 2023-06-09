/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import sinon from 'sinon';
import supertest from 'supertest';
import fixtures, { response_nutlink_address_regular_1 } from '../../fixtures/nutlink.fixtures.js';
import buildFastify from '../../../../src/app.js';
import * as databaseUtils from '../../../../src/utils/database.js';
import * as config from '../../../../src/config.js';
import { describe, expect, test, vi } from 'vitest';

describe('nutlink service', () => {
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

      await fastify.ready();

      // mock metadata fetch
      axios.get = vi.fn(
        async () =>
          new Promise(resolve => {
            // @ts-expect-error partial mock of axios response
            resolve({ data: response_nutlink_address_regular_1.metadata });
          }),
      );

      queryMock.onCall(0).resolves(fixture.sqlQueryMock);
      queryMock.onCall(1).resolves(fixture.sqlQueryMock2);
      queryMock.onCall(2).resolves(fixture.sqlQueryMock3);

      const response = fixture.unpaged
        ? await supertest(fastify.server)
            .get(fixture.endpoint)
            .set('unpaged', 'arbitraryStringValue')
        : await supertest(fastify.server).get(fixture.endpoint);

      // expect(response).toMatchSnapshot();
      expect(response.body).toEqual(fixture.response);

      fastify.close();
    });
  });
});
