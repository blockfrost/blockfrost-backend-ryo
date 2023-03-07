import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/tx.js';
import * as ResponseTypes from '../../../types/responses/tx.js';
import { getDbSync } from '../../../utils/database.js';
import { handle404, handle500 } from '../../../utils/error-handler.js';
import { convertStakeAddress } from '../../../utils/validation.js';

async function route(fastify: FastifyInstance) {
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
                  poolMetadataTextChecked.name === undefined ? null : poolMetadataTextChecked.name,
                description:
                  poolMetadataTextChecked.description === undefined
                    ? null
                    : poolMetadataTextChecked.description,
                homepage:
                  poolMetadataTextChecked.homepage === undefined
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
}

export default route;
