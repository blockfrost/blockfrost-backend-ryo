import { FastifyInstance } from 'fastify';

interface CounterLike {
  inc(labels: Record<string, string>): void;
}

interface CounterConstructor {
  new (config: {
    name: string;
    help: string;
    labelNames?: string[];
    registers?: unknown[];
  }): CounterLike;
}

interface MetricsRegistryLike {
  getSingleMetric(name: string): CounterLike | undefined;
}

interface MetricsClientLike {
  Counter: CounterConstructor;
  register: MetricsRegistryLike;
}

const NOOP_COUNTER: CounterLike = {
  inc: () => undefined,
};

export let mithrilRequestCount: CounterLike = NOOP_COUNTER;
export let tokenRegiestryRequestCount: CounterLike = NOOP_COUNTER;
export let nutlinkMetadataRequestCount: CounterLike = NOOP_COUNTER;
export let dbsyncRequestCount: CounterLike = NOOP_COUNTER;

const getMetricsClient = (fastify: FastifyInstance): MetricsClientLike | null => {
  const instanceWithMetrics = fastify as FastifyInstance & {
    metrics?: { client?: unknown };
  };

  if (!instanceWithMetrics.metrics?.client) {
    return null;
  }

  return instanceWithMetrics.metrics.client as MetricsClientLike;
};

const getOrCreateCounter = (
  client: MetricsClientLike,
  name: string,
  help: string,
  labelNames: string[],
) => {
  const existing = client.register.getSingleMetric(name);

  if (existing) {
    return existing;
  }

  return new client.Counter({
    name,
    help,
    labelNames,
    registers: [client.register],
  });
};

export const initPrometheusMetrics = (fastify: FastifyInstance) => {
  const client = getMetricsClient(fastify);

  if (!client) {
    return;
  }

  mithrilRequestCount = getOrCreateCounter(
    client,
    'blockfrost_target_target_mithril_request_count',
    'Total Mithril request count with error/status labels.',
    ['error_code', 'status_code'],
  );

  tokenRegiestryRequestCount = getOrCreateCounter(
    client,
    'blockfrost_ryo_target_token_regiestry_request_count',
    'Total token registry request count with error/status labels.',
    ['error_code', 'status_code'],
  );

  nutlinkMetadataRequestCount = getOrCreateCounter(
    client,
    'blockfrost_ryo_target_nutlink_metadata_request_count',
    'Total Nutlink metadata request count with error/status labels.',
    ['error_code', 'status_code'],
  );

  dbsyncRequestCount = getOrCreateCounter(
    client,
    'blockfrost_ryo_target_dbsync_request_count',
    'Total dbsync connect/query count with error/status labels.',
    ['error_code', 'status_code'],
  );
};
