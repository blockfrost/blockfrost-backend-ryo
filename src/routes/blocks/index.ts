import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/blocks';
import * as ResponseTypes from '../../types/responses/blocks';
import { getDbSync } from '../../utils/database';
import { getSchemaForEndpoint } from '../../utils/open-api';
import { handle400Custom, handle404 } from '../../utils/error-handler';
import {
  validatePositiveInRangeSignedInt,
  validateBlockHash,
  isNumber,
} from '../../utils/validation';
import { SQLQuery } from '../../sql';

async function blocks(fastify: FastifyInstance) {
  fastify.route({
    url: '/blocks/latest',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest'),
    handler: async (_request, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_latest'));

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }

        const response: ResponseTypes.Block = {
          ...row,
          // there is never next block for the latest block
          next_block: null,
          // there are always zero confirmations for the latest block
          confirmations: 0,
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
    url: '/blocks/:hash_or_number',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_hash_or_number'), [
            request.params.hash_or_number,
          ]);

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/blocks/slot/:slot_number',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/slot/{slot_number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersSlot>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.slot_number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed slot_number.');
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_slot_slot_number'), [
            request.params.slot_number,
          ]);

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/blocks/epoch/:epoch_number/slot/:slot_number',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/epoch/{epoch_number}/slot/{slot_number}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersEpochSlot>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (!validatePositiveInRangeSignedInt(request.params.epoch_number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed epoch_number.');
        }

        if (!validatePositiveInRangeSignedInt(request.params.slot_number)) {
          clientDbSync.release();
          return handle400Custom(reply, 'Missing, out of range or malformed slot_number.');
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<ResponseTypes.Block>(
            SQLQuery.get('blocks_epoch_number_slot_slot_number'),
            [request.params.epoch_number, request.params.slot_number],
          );

        clientDbSync.release();

        const row = rows[0];

        if (!row) {
          return handle404(reply);
        }
        return reply.send(row);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/blocks/:hash_or_number/next',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/next'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<QueryTypes.Block>(SQLQuery.get('blocks_hash_or_number_next'), [
            request.params.hash_or_number,
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
    url: '/blocks/:hash_or_number/previous',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/previous'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.Block[] } =
          await clientDbSync.query<QueryTypes.Block>(
            SQLQuery.get('blocks_hash_or_number_previous'),
            [request.params.hash_or_number, request.query.count, request.query.page],
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
    url: '/blocks/:hash_or_number/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.BlockTxs>(
          SQLQuery.get('blocks_hash_or_number_txs'),
          [
            request.params.hash_or_number,
            request.query.count,
            request.query.page,
            request.query.order,
          ],
        );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
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
    url: '/blocks/latest/txs',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/latest/txs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersLatest>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.BlockTxs>(
          SQLQuery.get('blocks_latest_txs'),
          [request.query.order, request.query.count, request.query.page],
        );

        clientDbSync.release();

        if (rows.length === 0) {
          return reply.send([]);
        }

        const list: string[] = [];

        for (const row of rows) {
          list.push(row.hash);
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
    url: '/blocks/:hash_or_number/addresses',
    method: 'GET',
    schema: getSchemaForEndpoint('/blocks/{hash_or_number}/addresses'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        if (isNumber(request.params.hash_or_number)) {
          if (!validatePositiveInRangeSignedInt(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing, out of range or malformed block number.');
          }
        } else {
          if (!validateBlockHash(request.params.hash_or_number)) {
            clientDbSync.release();
            return handle400Custom(reply, 'Missing or malformed block hash.');
          }
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('blocks_404'),
          [request.params.hash_or_number],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.Block>(
          SQLQuery.get('blocks_hash_or_number_addresses'),
          [request.params.hash_or_number, request.query.count, request.query.page],
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
}

module.exports = blocks;
