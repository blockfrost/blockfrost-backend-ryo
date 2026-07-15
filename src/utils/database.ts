import { PoolClient } from 'pg';
import { FastifyInstance } from 'fastify';
import { SQLQuery } from '../sql/index.js';

export const getDbSync = async (fastify: FastifyInstance): Promise<PoolClient> => {
  try {
    const clientDbSync = await fastify.pg.dbSync.connect();

    return clientDbSync;
  } catch (error) {
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

// Bounded pre-check for the totals endpoints. Runs one of the *_total_over_limit
// queries (which append the limit as their last parameter) and returns whether
// the address/account has more tx outputs than the configured limit.
export const isOverTxOutLimit = async (
  clientDbSync: PoolClient,
  query: 'accounts_stake_address_addresses_total_over_limit' | 'addresses_address_total_over_limit',
  parameters: unknown[],
  limit: number,
): Promise<boolean> => {
  const { rows } = await clientDbSync.query<{ over_limit: boolean }>(SQLQuery.get(query), [
    ...parameters,
    limit,
  ]);

  return rows[0].over_limit;
};
