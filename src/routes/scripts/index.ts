import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/scripts';
import * as ResponseTypes from '../../types/responses/scripts';
import { getDbSync } from '../../utils/database';
import { handle404 } from '../../utils/error-handler';
import { SQLQuery } from '../../sql';
import { getSchemaForEndpoint } from '../../utils/open-api';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/scripts',
    method: 'GET',
    schema: getSchemaForEndpoint('/scripts'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.Scripts } =
          await clientDbSync.query<QueryTypes.Scripts>(SQLQuery.get('scripts'), [
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
    url: '/scripts/:script_hash',
    schema: getSchemaForEndpoint('/scripts/{script_hash}'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersScriptHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.ScriptHash[] } =
          await clientDbSync.query<QueryTypes.ScriptHash>(SQLQuery.get('scripts_script_hash'), [
            request.params.script_hash,
          ]);

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
    url: '/scripts/:script_hash/json',
    method: 'GET',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/json'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersScriptHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.ScriptHashJson[] } =
          await clientDbSync.query<QueryTypes.ScriptHashJson>(
            SQLQuery.get('scripts_script_hash_json'),
            [request.params.script_hash],
          );

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
    url: '/scripts/:script_hash/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersScriptHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.ScriptHashCbor[] } =
          await clientDbSync.query<QueryTypes.ScriptHashCbor>(
            SQLQuery.get('scripts_script_hash_cbor'),
            [request.params.script_hash],
          );

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
    url: '/scripts/:script_hash/redeemers',
    schema: getSchemaForEndpoint('/scripts/{script_hash}/redeemers'),
    method: 'GET',
    handler: async (
      request: FastifyRequest<QueryTypes.RequestParametersScriptHashRedeemers>,
      reply,
    ) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('scripts_404'),
          [request.params.script_hash],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.ScriptHashRedeemers } =
          await clientDbSync.query<QueryTypes.ScriptHashRedeemers>(
            SQLQuery.get('scripts_script_hash_redeemers'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.script_hash,
            ],
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
    url: '/scripts/datum/:datum_hash',
    schema: getSchemaForEndpoint('/scripts/datum/{datum_hash}'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDatumHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.DatumHash[] } =
          await clientDbSync.query<QueryTypes.DatumHash>(SQLQuery.get('scripts_datum_datum_hash'), [
            request.params.datum_hash,
          ]);

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
    url: '/scripts/datum/:datum_hash/cbor',
    schema: getSchemaForEndpoint('/scripts/datum/{datum_hash}/cbor'),
    method: 'GET',
    handler: async (request: FastifyRequest<QueryTypes.RequestParametersDatumHash>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.DatumHashCbor[] } =
          await clientDbSync.query<QueryTypes.DatumHashCbor>(
            SQLQuery.get('scripts_datum_datum_hash_cbor'),
            [request.params.datum_hash],
          );

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
}

module.exports = network;
