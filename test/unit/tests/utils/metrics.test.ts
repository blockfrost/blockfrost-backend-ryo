import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { initMetrics } from '../../../../src/utils/metrics.js';

const collectPacket = { topic: 'pm2-prom-module:collect', data: {} };
let stop: (() => void) | undefined;

afterEach(() => {
  stop?.();
  stop = undefined;
  vi.restoreAllMocks();
});

const channel = () => Object.assign(new EventEmitter(), { connected: true, send: vi.fn() });

const deferred = () => {
  let resolve!: (value: []) => void;
  const promise = new Promise<[]>(done => {
    resolve = done;
  });

  return { promise, resolve };
};

describe('PM2 metrics transport', () => {
  test('coalesces collection bursts and waits for IPC completion even under backpressure', async () => {
    const ipc = channel();
    const send = ipc.send.mockReturnValue(false);
    const collected = deferred();
    const registry = { getMetricsAsJSON: vi.fn(() => collected.promise) };

    stop = initMetrics(registry, ipc);
    for (let i = 0; i < 100; i++) ipc.emit('message', collectPacket);
    expect(registry.getMetricsAsJSON).toHaveBeenCalledTimes(1);

    collected.resolve([]);
    await new Promise(setImmediate);
    expect(send).toHaveBeenCalledExactlyOnceWith(
      { topic: 'pm2-prom-module:metrics', data: { metrics: [] } },
      undefined,
      undefined,
      expect.any(Function),
    );

    for (let i = 0; i < 100; i++) ipc.emit('message', collectPacket);
    expect(registry.getMetricsAsJSON).toHaveBeenCalledTimes(1);

    send.mock.calls[0][3](null);
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    expect(registry.getMetricsAsJSON).toHaveBeenCalledTimes(2);
    expect(send).toHaveBeenCalledTimes(2);
  });

  test('removes the listener and suppresses a collection that finishes after close', async () => {
    const ipc = channel();
    const send = ipc.send;
    const collected = deferred();
    const registry = { getMetricsAsJSON: vi.fn(() => collected.promise) };
    const listeners = ipc.listenerCount('message');

    stop = initMetrics(registry, ipc);
    ipc.emit('message', collectPacket);
    stop();
    expect(ipc.listenerCount('message')).toBe(listeners);
    collected.resolve([]);
    await new Promise(setImmediate);
    ipc.emit('message', collectPacket);
    expect(send).not.toHaveBeenCalled();
    expect(registry.getMetricsAsJSON).toHaveBeenCalledTimes(1);
  });

  test('recovers after registry collection fails', async () => {
    const ipc = channel();
    const send = ipc.send;
    const error = new Error('collection failed');
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const registry = {
      getMetricsAsJSON: vi.fn().mockRejectedValueOnce(error).mockResolvedValue([]),
    };

    stop = initMetrics(registry, ipc);
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    expect(log).toHaveBeenCalledWith(error);
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    expect(send).toHaveBeenCalledTimes(1);
  });

  test.each(['throw', 'callback'])('recovers after an IPC %s error', async mode => {
    const ipc = channel();
    const send = ipc.send;
    const error = new Error('IPC failed');
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const registry = { getMetricsAsJSON: vi.fn().mockResolvedValue([]) };

    if (mode === 'throw')
      send.mockImplementationOnce(() => {
        throw error;
      });
    stop = initMetrics(registry, ipc);
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    if (mode === 'callback') send.mock.calls[0][3](error);
    expect(log).toHaveBeenCalledWith(error);
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    expect(send).toHaveBeenCalledTimes(2);
  });

  test('ignores unrelated messages and disconnected channels', async () => {
    const ipc = channel();
    const send = ipc.send;
    const registry = { getMetricsAsJSON: vi.fn().mockResolvedValue([]) };

    stop = initMetrics(registry, ipc);
    for (const packet of [null, 'ready', {}, { topic: 'other', data: {} }]) {
      ipc.emit('message', packet);
    }
    ipc.connected = false;
    ipc.emit('message', collectPacket);
    await new Promise(setImmediate);
    expect(registry.getMetricsAsJSON).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
