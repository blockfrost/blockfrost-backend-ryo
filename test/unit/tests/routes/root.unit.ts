import buildFastify from '../../../../src/app.js';
import supertest from 'supertest';
import { describe, expect, test } from 'vitest';

describe('GET /example/endpoint', () => {
  test('responds with success on request /root', async () => {
    const fastify = buildFastify();

    await fastify.ready();
    const response = await supertest(fastify.server).get('/');

    expect(response.body).toEqual({ url: 'https://blockfrost.io/', version: expect.any(String) });
    // expect(response).toMatchSnapshot();

    fastify.close();
  });
});
