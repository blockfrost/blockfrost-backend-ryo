import { PoolClient } from 'pg';
import { FastifyInstance } from 'fastify';
import { dbsyncRequestCount } from './prometheus.js';

const instrumentedDbClients = new WeakSet<PoolClient>();

const isPromiseLike = (value: unknown): value is Promise<unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const promiseLikeValue = value as { catch?: unknown };

  return typeof promiseLikeValue.catch === 'function';
};

export const getDbSync = async (fastify: FastifyInstance): Promise<PoolClient> => {
  try {
    const clientDbSync = await fastify.pg.dbSync.connect();

    if (!instrumentedDbClients.has(clientDbSync)) {
      // Wrap queries to ensure every db query error/timeout is counted.
      const originalQuery = clientDbSync.query.bind(clientDbSync) as (
        ...queryArgs: unknown[]
      ) => unknown;

      clientDbSync.query = ((...queryArgs: unknown[]) => {
        const queryResult = originalQuery(...queryArgs);

        if (isPromiseLike(queryResult)) {
          return queryResult
            .then(result => {
              dbsyncRequestCount.inc({
                error_code: 'none',
                status_code: 'none',
              });
              return result;
            })
            .catch((error: unknown) => {
              const rawErrorCode = (error as { code?: string | number }).code;
              const rawStatusCode = (error as { statusCode?: number }).statusCode;

              dbsyncRequestCount.inc({
                error_code:
                  rawErrorCode !== undefined
                    ? String(rawErrorCode)
                    : rawStatusCode !== undefined
                      ? 'unknown'
                      : 'unknown',
                status_code:
                  rawStatusCode !== undefined
                    ? String(rawStatusCode)
                    : rawErrorCode !== undefined
                      ? 'unknown'
                      : 'unknown',
              });

              throw error;
            });
        }

        dbsyncRequestCount.inc({
          error_code: 'none',
          status_code: 'none',
        });

        return queryResult;
      }) as PoolClient['query'];

      instrumentedDbClients.add(clientDbSync);
    }

    dbsyncRequestCount.inc({
      error_code: 'none',
      status_code: 'none',
    });

    return clientDbSync;
  } catch (error) {
    const rawErrorCode = (error as { code?: string | number }).code;
    const rawStatusCode = (error as { statusCode?: number }).statusCode;

    dbsyncRequestCount.inc({
      error_code:
        rawErrorCode !== undefined
          ? String(rawErrorCode)
          : rawStatusCode !== undefined
            ? 'unknown'
            : 'unknown',
      status_code:
        rawStatusCode !== undefined
          ? String(rawStatusCode)
          : rawErrorCode !== undefined
            ? 'unknown'
            : 'unknown',
    });

    console.error(`Error while connecting to DB Sync.`, error);
    throw error;
  }
};

export const gracefulRelease = (clientDbSync: PoolClient) => {
  if (!clientDbSync) return;
  try {
    clientDbSync.release();
  } catch (error) {
    console.warn(error);
  }
};
