import { PoolClient } from 'pg';
import { FastifyInstance } from 'fastify';

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

// Verifies that the bf_tbl_epoch_stake_anchor table (see README) exists when
// dbSync.epochStakeAnchors is enabled. Called once during server startup.
export const verifyEpochStakeAnchors = async (fastify: FastifyInstance): Promise<void> => {
  const clientDbSync = await getDbSync(fastify);

  try {
    const result = await clientDbSync.query<{ exists: boolean }>(
      "SELECT to_regclass('public.bf_tbl_epoch_stake_anchor') IS NOT NULL AS exists",
    );

    if (!result.rows[0].exists) {
      throw new Error(
        'dbSync.epochStakeAnchors is enabled, but table bf_tbl_epoch_stake_anchor is missing in the db-sync database. ' +
          'Create the table and its trigger (see README, "Epoch stake pagination anchors") or disable the option.',
      );
    }
  } finally {
    gracefulRelease(clientDbSync);
  }
};
