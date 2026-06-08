import { FastifyInstance, FastifyRequest } from 'fastify';
import { SQLQuery } from '../../../sql/index.js';
import * as QueryTypes from '../../../types/queries/governance.js';
import * as ResponseTypes from '../../../types/responses/governance.js';
import { getDbSync, gracefulRelease } from '../../../utils/database.js';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { isUnpaged } from '../../../utils/routes.js';
import {
  dbSyncDRepToCIP129 as databaseSyncDRepToCIP129,
  transformOffChainFetchError,
} from '../../../utils/governance.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/governance/dreps',
    method: 'GET',
    schema: getSchemaForEndpoint('/governance/dreps'),
    handler: async (request: FastifyRequest<QueryTypes.RequestParameters>, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const unpaged = isUnpaged(request);
        const isFiltered =
          request.query.retired !== undefined || request.query.expired !== undefined;

        const orderBy = request.query.order_by ?? null;
        const retired = request.query.retired ?? null;
        const expired = request.query.expired ?? null;

        // Each branch couples its SQL key with the exact param array that SQL expects.
        // Keeping them together prevents the two from drifting independently.
        const query: { key: Parameters<typeof SQLQuery.get>[0]; params: unknown[] } = isFiltered
          ? unpaged
            ? {
                key: 'governance_dreps_filtered_unpaged',
                params: [request.query.order, orderBy, retired, expired],
              }
            : {
                key: 'governance_dreps_filtered',
                params: [
                  request.query.order,
                  request.query.count,
                  request.query.page,
                  orderBy,
                  retired,
                  expired,
                ],
              }
          : unpaged
            ? {
                key: 'governance_dreps_unpaged',
                params: [request.query.order, orderBy],
              }
            : {
                key: 'governance_dreps',
                params: [request.query.order, request.query.count, request.query.page, orderBy],
              };

        const { rows } = await clientDbSync.query<QueryTypes.DReps>(
          SQLQuery.get(query.key),
          query.params,
        );

        gracefulRelease(clientDbSync);

        const result: ResponseTypes.DReps = rows.map(row => {
          const cip129DRep = databaseSyncDRepToCIP129(row);
          const error = transformOffChainFetchError(row.metadata_fetch_error);

          // metadata_url and metadata_hash both come from voting_anchor, where both columns are
          // NOT NULL in db-sync — so they're either both set (anchor exists) or both null (no
          // anchor). When there's no anchor, return null rather than an empty object, matching
          // the 404 behaviour of /dreps/:drep_id/metadata.
          const metadata =
            row.metadata_url === null
              ? null
              : {
                  url: row.metadata_url,
                  hash: row.metadata_hash as string,
                  json_metadata: row.metadata_json ?? null,
                  bytes: row.metadata_bytes,
                  ...(error ? { error } : {}),
                };

          return {
            drep_id: cip129DRep.id,
            hex: cip129DRep.hex ?? '',
            has_script: row.has_script,
            amount: row.amount,
            retired: row.retired,
            expired: row.expired,
            last_active_epoch: row.last_active_epoch,
            metadata,
          };
        });

        return reply.send(result);
      } catch (error) {
        gracefulRelease(clientDbSync);
        throw error;
      }
    },
  });
}

export default route;
