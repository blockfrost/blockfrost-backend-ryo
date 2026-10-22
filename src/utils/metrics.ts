import { Registry } from '@prometheus-io/client';

interface MetricsChannel {
  connected?: boolean;
  send?: typeof process.send;
  on(event: 'message', listener: (packet: unknown) => void): unknown;
  off(event: 'message', listener: (packet: unknown) => void): unknown;
}

// Keep at most one registry collection or IPC send in flight per worker.
export const initMetrics = (
  registry: Pick<Registry, 'getMetricsAsJSON'>,
  channel: MetricsChannel = process,
): (() => void) => {
  let pending = false;
  let closed = false;

  const collect = async (packet: unknown) => {
    if (
      closed ||
      pending ||
      !channel.connected ||
      !channel.send ||
      typeof packet !== 'object' ||
      packet === null ||
      !('topic' in packet) ||
      packet.topic !== 'pm2-prom-module:collect' ||
      !('data' in packet) ||
      !packet.data
    ) {
      return;
    }

    pending = true;
    try {
      const metrics = await registry.getMetricsAsJSON();

      if (closed || !channel.connected || !channel.send) {
        pending = false;
        return;
      }

      channel.send(
        { topic: 'pm2-prom-module:metrics', data: { metrics } },
        undefined,
        undefined,
        error => {
          pending = false;
          if (error && !closed) console.error(error);
        },
      );
    } catch (error) {
      pending = false;
      if (!closed) console.error(error);
    }
  };

  channel.on('message', collect);

  return () => {
    closed = true;
    channel.off('message', collect);
  };
};
