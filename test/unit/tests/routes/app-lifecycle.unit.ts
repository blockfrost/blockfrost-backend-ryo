import { expect, test, vi } from 'vitest';
import http from 'http';
import buildFastify from '../../../../src/app.js';
import { mainConfig } from '../../../../src/config.js';

test('releases the shutdown listener when an app closes', async () => {
  const listeners = process.listenerCount('SIGINT');
  const app = buildFastify();

  await app.ready();
  expect(process.listenerCount('SIGINT')).toBe(listeners + 1);
  await app.close();
  expect(process.listenerCount('SIGINT')).toBe(listeners);
});

test('clears the slow-request timer when a client disconnects before the handler finishes', async () => {
  const originalThreshold = mainConfig.server.slowRequestThresholdMs;

  mainConfig.server.slowRequestThresholdMs = 60000;
  const app = buildFastify();
  const clearTimer = vi.spyOn(globalThis, 'clearTimeout');
  let observedRequest: { slowTimer: ReturnType<typeof setTimeout> | undefined } | undefined;
  let handlerEntered!: () => void;
  let releaseHandler!: () => void;
  const entered = new Promise<void>(resolve => {
    handlerEntered = resolve;
  });
  const pending = new Promise<string>(resolve => {
    releaseHandler = () => resolve('done');
  });
  const closed = new Promise<void>(resolve => {
    app.addHook('onRequest', (request, reply, done) => {
      observedRequest = request;
      reply.raw.once('close', resolve);
      done();
    });
  });

  app.get('/lifecycle-probe', async () => {
    handlerEntered();
    return pending;
  });

  try {
    await app.listen({ host: '127.0.0.1', port: 0 });
    const address = app.server.address();

    if (!address || typeof address === 'string') throw new Error('Expected a TCP address');
    const client = http.get(`http://127.0.0.1:${address.port}/lifecycle-probe`);

    client.on('error', () => {});
    await entered;
    const timer = observedRequest?.slowTimer;

    expect(timer).toBeDefined();
    client.destroy();
    await closed;
    expect(clearTimer).toHaveBeenCalledWith(timer);
    expect(observedRequest?.slowTimer).toBeUndefined();
  } finally {
    releaseHandler();
    await app.close();
    vi.restoreAllMocks();
    mainConfig.server.slowRequestThresholdMs = originalThreshold;
  }
});
