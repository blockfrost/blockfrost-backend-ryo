import { FastifyInstance, FastifyRequest } from 'fastify';
import * as ResponseTypes from '../../types/responses/accounts';
import * as QueryTypes from '../../types/queries/accounts';
import { getSchemaForEndpoint } from '../../utils/open-api';
import { getDbSync } from '../../utils/database';
import { handle400Custom, handle404 } from '../../utils/error-handler';
import { validateStakeAddress } from '../../utils/validation';
import { SQLQuery } from '../../sql';

async function accounts(fastify: FastifyInstance) {
  fastify.route({
    url: '/accounts/:stake_address',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const { rows }: { rows: ResponseTypes.Account[] } =
          await clientDbSync.query<QueryTypes.Account>(SQLQuery.get('accounts_stake_address'), [
            request.params.stake_address,
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
    url: '/accounts/:stake_address/rewards',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/rewards'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountRewards } =
          await clientDbSync.query<QueryTypes.AccountRewards>(
            SQLQuery.get('accounts_stake_address_rewards'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/delegations',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/delegations'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountDelegations } =
          await clientDbSync.query<QueryTypes.AccountDelegations>(
            SQLQuery.get('accounts_stake_address_delegations'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/registrations',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/registrations'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountRegistrations } =
          await clientDbSync.query<QueryTypes.AccountRegistrations>(
            SQLQuery.get('accounts_stake_address_registrations'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/history',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/history'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountHistory } =
          await clientDbSync.query<QueryTypes.AccountHistory>(
            SQLQuery.get('accounts_stake_address_history'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/withdrawals',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/withdrawals'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountWithdrawalsAndMirs } =
          await clientDbSync.query<QueryTypes.AccountWithdrawalsAndMirs>(
            SQLQuery.get('accounts_stake_address_withdrawals'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/mirs',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/mirs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountWithdrawalsAndMirs } =
          await clientDbSync.query<QueryTypes.AccountWithdrawalsAndMirs>(
            SQLQuery.get('accounts_stake_address_mirs'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/addresses',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/addresses'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountAddresses[] } = await clientDbSync.query<
          QueryTypes.AccountAddresses[]
        >(SQLQuery.get('accounts_stake_address_addresses'), [
          request.query.order,
          request.query.count,
          request.query.page,
          request.params.stake_address,
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
    url: '/accounts/:stake_address/addresses/assets',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/addresses/assets'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.AccountAssets[] } =
          await clientDbSync.query<QueryTypes.AccountAssets>(
            SQLQuery.get('accounts_stake_address_addresses_assets'),
            [
              request.query.order,
              request.query.count,
              request.query.page,
              request.params.stake_address,
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
    url: '/accounts/:stake_address/addresses/total',
    method: 'GET',
    schema: getSchemaForEndpoint('/accounts/{stake_address}/addresses/total'),
    handler: async (request: FastifyRequest<QueryTypes.RequestAccountsQueryParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        // Check stake address format. Return 400 on non-valid stake address
        const isStakeAddressValid = validateStakeAddress(request.params.stake_address);

        if (!isStakeAddressValid) {
          clientDbSync.release();
          return handle400Custom(reply, 'Invalid or malformed stake address format.');
        }

        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(
          SQLQuery.get('accounts_404'),
          [request.params.stake_address],
        );

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows } = await clientDbSync.query<QueryTypes.AccountAddressesTotal>(
          SQLQuery.get('accounts_stake_address_addresses_total'),
          [request.params.stake_address],
        );

        clientDbSync.release();

        let result_outputs = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        result_outputs = rows[0].sent_amount
          ? [
              {
                unit: 'lovelace',
                quantity: rows[0].sent_amount_lovelace,
              },
              ...rows[0].sent_amount,
            ]
          : [
              {
                unit: 'lovelace',
                quantity: rows[0].sent_amount_lovelace,
              },
            ];

        let result_inputs = [];

        result_inputs = rows[0].received_amount
          ? [
              {
                unit: 'lovelace',
                quantity: rows[0].received_amount_lovelace,
              },
              ...rows[0].received_amount,
            ]
          : [
              {
                unit: 'lovelace',
                quantity: rows[0].received_amount_lovelace,
              },
            ];

        const result: ResponseTypes.AccountAddressesTotal = {
          stake_address: rows[0].stake_address,
          received_sum: result_inputs,
          sent_sum: result_outputs,
          tx_count: rows[0].tx_count,
        };

        return reply.send(result);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });
}

module.exports = accounts;
