import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/tx';
import * as ResponseTypes from '../../types/responses/tx';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getDbSync } from '../../utils/database';
import { handle404, handle500 } from '../../utils/error-handler';
import { convertStakeAddress } from '../../utils/validation';
import { SQLQuery } from '../../sql';

async function txs(fastify: FastifyInstance) {
  fastify.route({
    url: '/txs/:hash',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows } = await clientDbSync.query<QueryTypes.Tx>(SQLQuery.get('txs_hash'), [
          request.params.hash,
        ]);

        clientDbSync.release();

        if (rows.length === 0) {
          return handle404(reply);
        }

        // all possible bigints are returned as string from database so they won't overflow JS number
        const result: ResponseTypes.Tx = rows[0].amount
          ? {
              hash: rows[0].hash,
              block: rows[0].block,
              block_height: rows[0].block_height,
              block_time: rows[0].block_time,
              slot: rows[0].slot,
              index: rows[0].index,
              output_amount: [
                { unit: 'lovelace', quantity: rows[0].amount_lovelace },
                ...rows[0].amount,
              ],
              fees: rows[0].fees,
              deposit: rows[0].deposit,
              size: rows[0].size,
              invalid_before: rows[0].invalid_before,
              invalid_hereafter: rows[0].invalid_hereafter,
              utxo_count: rows[0].utxo_count,
              withdrawal_count: rows[0].withdrawal_count,
              mir_cert_count: rows[0].mir_cert_count,
              delegation_count: rows[0].delegation_count,
              stake_cert_count: rows[0].stake_cert_count,
              pool_update_count: rows[0].pool_update_count,
              pool_retire_count: rows[0].pool_retire_count,
              asset_mint_or_burn_count: rows[0].asset_mint_or_burn_count,
              redeemer_count: rows[0].redeemer_count,
              valid_contract: rows[0].valid_contract,
            }
          : {
              hash: rows[0].hash,
              block: rows[0].block,
              block_height: rows[0].block_height,
              block_time: rows[0].block_time,
              slot: rows[0].slot,
              index: rows[0].index,
              output_amount: [{ unit: 'lovelace', quantity: rows[0].amount_lovelace }],
              fees: rows[0].fees,
              deposit: rows[0].deposit,
              size: rows[0].size,
              invalid_before: rows[0].invalid_before,
              invalid_hereafter: rows[0].invalid_hereafter,
              utxo_count: rows[0].utxo_count,
              withdrawal_count: rows[0].withdrawal_count,
              mir_cert_count: rows[0].mir_cert_count,
              delegation_count: rows[0].delegation_count,
              stake_cert_count: rows[0].stake_cert_count,
              pool_update_count: rows[0].pool_update_count,
              pool_retire_count: rows[0].pool_retire_count,
              asset_mint_or_burn_count: rows[0].asset_mint_or_burn_count,
              redeemer_count: rows[0].redeemer_count,
              valid_contract: rows[0].valid_contract,
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

  fastify.route({
    url: '/txs/:hash/utxos',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/utxos'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);
      /*
        This is a special query since address is just a list of inputs and outputs.
        Moreover, inputs are just previous outputs
        (hence txi.tx_out_id which point to the previously unspent txo, which is now being consumed).
        It's important to use tx_out_index as well, otherwise, all previous outputs (all their indexes) would be matched and returned.
      */

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const inputs = await clientDbSync.query<QueryTypes.TxUtxoInputs>(
          SQLQuery.get('txs_hash_utxos_1'),
          [request.params.hash],
        );

        const outputs = await clientDbSync.query<QueryTypes.TxUtxoOutputs>(
          SQLQuery.get('txs_hash_utxos_2'),
          [request.params.hash],
        );

        clientDbSync.release();

        const responseInputs: ResponseTypes.TxUtxoInputs = [];
        const responseOutputs: ResponseTypes.TxUtxoOutputs = [];

        // quantities/amounts are returned as string from database so they won't overflow JS number
        for (const row of inputs.rows) {
          if (row.amount) {
            responseInputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }, ...row.amount],
              tx_hash: row.tx_hash,
              output_index: row.output_index,
              collateral: row.collateral,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
              reference: row.reference,
            });
          } else {
            responseInputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }],
              tx_hash: row.tx_hash,
              output_index: row.output_index,
              collateral: row.collateral,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
              reference: row.reference,
            });
          }
        }
        for (const row of outputs.rows) {
          if (row.amount) {
            responseOutputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }, ...row.amount],
              collateral: row.collateral,
              output_index: row.output_index,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
            });
          } else {
            responseOutputs.push({
              address: row.address,
              amount: [{ unit: 'lovelace', quantity: row.amount_lovelace }],
              collateral: row.collateral,
              output_index: row.output_index,
              data_hash: row.data_hash,
              inline_datum: row.inline_datum,
              reference_script_hash: row.reference_script_hash,
            });
          }
        }

        const response: {
          hash: string;
          inputs: ResponseTypes.TxUtxoInputs;
          outputs: ResponseTypes.TxUtxoOutputs;
        } = {
          hash: request.params.hash,
          inputs: responseInputs,
          outputs: responseOutputs,
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
    url: '/txs/:hash/stakes',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/stakes'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxStakes } =
          await clientDbSync.query<QueryTypes.TxStakes>(SQLQuery.get('txs_hash_stakes'), [
            request.params.hash,
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
    url: '/txs/:hash/delegations',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/delegations'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxDelegations } =
          await clientDbSync.query<QueryTypes.TxDelegations>(SQLQuery.get('txs_hash_delegations'), [
            request.params.hash,
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
    url: '/txs/:hash/withdrawals',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/withdrawals'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxWithdrawals } =
          await clientDbSync.query<QueryTypes.TxWithdrawals>(SQLQuery.get('txs_hash_withdrawals'), [
            request.params.hash,
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
    url: '/txs/:hash/mirs',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/mirs'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxMirs } = await clientDbSync.query<QueryTypes.TxMir>(
          SQLQuery.get('txs_hash_mirs'),
          [request.params.hash],
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
    url: '/txs/:hash/pool_updates',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/pool_updates'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }
        const { rows } = await clientDbSync.query<QueryTypes.TxPoolUpdates>(
          SQLQuery.get('txs_hash_pool_updates'),
          [request.params.hash],
        );

        if (rows.length === 0) {
          clientDbSync.release();
          return reply.send([]);
        }

        const results: ResponseTypes.TxPoolCert = await Promise.all(
          rows.map(async row => {
            const relayRows = await clientDbSync.query<QueryTypes.Relay>(
              SQLQuery.get('txs_hash_pool_updates_relays'),
              [row.pu_id],
            );

            const relays: QueryTypes.Relay[] = relayRows.rows.length > 0 ? relayRows.rows : [];

            let poolMetadataTextChecked: QueryTypes.MetadataTextJSON = {
              name: null,
              description: null,
              homepage: null,
            };

            const poolMetadataText = row.metadata_text;

            if (poolMetadataText) {
              poolMetadataTextChecked = poolMetadataText;
            }

            let reward_account = row.reward_account;

            // if reward account is not onchain, attempt conversion to bech32
            if (!row.reward_account) {
              // can be undefined which is handled below, casting to string to keep ts happy
              reward_account = convertStakeAddress(row.reward_account_raw) as string;
            }

            if (!reward_account) {
              clientDbSync.release();
              return handle500(reply, 'Reward account conversion failed', request);
            }

            // quantities/amounts are returned as string from database so they won't overflow JS number
            const result = {
              cert_index: row.cert_index,
              pool_id: row.pool_id,
              vrf_key: row.vrf_key,
              pledge: row.pledge,
              margin_cost: row.margin_cost,
              fixed_cost: row.fixed_cost,
              reward_account: reward_account,
              owners: row.owners,
              metadata: {
                url: row.metadata_url,
                hash: row.metadata_hash,
                ticker: row.ticker,
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
              },
              relays: relays,
              active_epoch: row.active_epoch,
            };

            return result;
          }),
        );

        clientDbSync.release();
        return reply.send(results);
      } catch (error) {
        if (clientDbSync) {
          clientDbSync.release();
        }
        throw error;
      }
    },
  });

  fastify.route({
    url: '/txs/:hash/pool_retires',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/pool_retires'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxPoolRetires } =
          await clientDbSync.query<QueryTypes.TxPoolRetires>(
            SQLQuery.get('txs_hash_pool_retires'),
            [request.params.hash],
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
    url: '/txs/:hash/metadata',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/metadata'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxMetadata } =
          await clientDbSync.query<QueryTypes.TxMetadata>(SQLQuery.get('txs_hash_metadata'), [
            request.params.hash,
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
    url: '/txs/:hash/metadata/cbor',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/metadata/cbor'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxMetadataCbor } =
          await clientDbSync.query<QueryTypes.TxMetadataCbor>(
            SQLQuery.get('txs_hash_metadata_cbor'),
            [request.params.hash],
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
    url: '/txs/:hash/redeemers',
    method: 'GET',
    schema: getSchemaForEndpoint('/txs/{hash}/redeemers'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const query404 = await clientDbSync.query<QueryTypes.ResultFound>(SQLQuery.get('txs_404'), [
          request.params.hash,
        ]);

        if (query404.rows.length === 0) {
          clientDbSync.release();
          return handle404(reply);
        }

        const { rows }: { rows: ResponseTypes.TxRedeemers } =
          await clientDbSync.query<QueryTypes.TxRedeemers>(SQLQuery.get('txs_hash_redeemers'), [
            request.params.hash,
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

module.exports = txs;
