import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/pools';
import * as ResponseTypes from '../../types/responses/pools';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../utils/database';
import { handle400Custom, handle404 } from '../../utils/error-handler';
import { validateAndConvertPool } from '../../utils/validation';
import { SQLQuery } from '../../sql';

async function pools(fastify: FastifyInstance) {
  fastify.route({
    url: '/pools',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Pools>(SQLQuery.get('pools'), [
          request.query.order,
          request.query.count,
          request.query.page,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.pool_id);
        }

        return reply.send(list);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/extended',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/extended'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.PoolsExtended } =
          await clientDbSync.query<QueryTypes.PoolsExtended>(SQLQuery.get('pools_extended'), [
            request.query.order,
            request.query.count,
            request.query.page,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/retired',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/retired'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.PoolRetire } =
          await clientDbSync.query<QueryTypes.PoolsRetire>(SQLQuery.get('pools_retired'), [
            request.query.order,
            request.query.count,
            request.query.page,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/retiring',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/retiring'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.PoolRetire } =
          await clientDbSync.query<QueryTypes.PoolsRetire>(SQLQuery.get('pools_retiring'), [
            request.query.order,
            request.query.count,
            request.query.page,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const { rows }: { rows: ResponseTypes.PoolID[] } =
          await clientDbSync.query<QueryTypes.PoolID>(SQLQuery.get('pools_pool_id'), [pool_id]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        return reply.send(rows[0]);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/history',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/history'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.PoolHistory } =
          await clientDbSync.query<QueryTypes.PoolHistory>(SQLQuery.get('pools_pool_id_history'), [
            request.query.order,
            request.query.count,
            request.query.page,
            pool_id,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/metadata'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.PoolMetadata>(
          SQLQuery.get('pools_pool_id_metadata'),
          [pool_id],
        );

        if (rows.length === 0) {
          clientDbSync.release();
          return reply.send({});
        }

        clientDbSync.release();

        const poolMetadataText = rows[0].metadata_text;
        const poolMetadataTextChecked =
          poolMetadataText !== null
            ? poolMetadataText
            : {
                name: null,
                description: null,
                homepage: null,
              };

        const response: ResponseTypes.PoolMetadata = {
          pool_id: rows[0].pool_id,
          hex: rows[0].hex,
          url: rows[0].url,
          hash: rows[0].hash,
          ticker: rows[0].ticker,
          name:
            typeof poolMetadataTextChecked.name === 'undefined'
              ? null
              : poolMetadataTextChecked.name,
          description:
            typeof poolMetadataTextChecked.description === 'undefined'
              ? null
              : poolMetadataTextChecked.description,
          homepage:
            typeof poolMetadataTextChecked.homepage === 'undefined'
              ? null
              : poolMetadataTextChecked.homepage,
        };

        return reply.send(response);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/relays',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/relays'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.PoolRelays } =
          await clientDbSync.query<QueryTypes.PoolRelays>(SQLQuery.get('pools_pool_id_relays'), [
            pool_id,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/delegators',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/delegators'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.PoolDelegators } =
          await clientDbSync.query<QueryTypes.PoolDelegators>(
            SQLQuery.get('pools_pool_id_delegators'),
            [request.query.order, request.query.count, request.query.page, pool_id],
          );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/blocks',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/blocks'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.PoolBlocks>(
          SQLQuery.get('pools_pool_id_blocks'),
          [request.query.order, request.query.count, request.query.page, pool_id],
        );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: ResponseTypes.PoolBlocks = [];

        for (const row of rows) {
          list.push(row.block);
        }

        return reply.send(list);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/pools/:pool_id/updates',
    method: 'GET',
    schema: getSchemaForEndpoint('/pools/{pool_id}/updates'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // validate (and convert hex->bech32 if needed) pool ID
        const pool_id = validateAndConvertPool(request.params.pool_id);

        if (!pool_id) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed pool id format.');
        }

        const query404_pool = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('pools_404'),
          [pool_id],
        );

        if (query404_pool.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.PoolUpdates } =
          await clientDbSync.query<QueryTypes.PoolUpdates>(SQLQuery.get('pools_pool_id_updates'), [
            request.query.order,
            request.query.count,
            request.query.page,
            pool_id,
          ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        return reply.send(rows);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

module.exports = pools;
