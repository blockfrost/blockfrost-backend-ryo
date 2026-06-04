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

// ajv coerces query strings to booleans; pass them on to SQL as 'true' / 'false' / NULL.
const boolToSqlParam = (value: boolean | undefined): string | null => {
  if (value === undefined) return null;
  return value ? 'true' : 'false';
};

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
        const retiredParam = boolToSqlParam(request.query.retired);
        const expiredParam = boolToSqlParam(request.query.expired);

        let rows: QueryTypes.DReps[];

        if (isFiltered) {
          const sqlKey = unpaged
            ? 'governance_dreps_filtered_unpaged'
            : 'governance_dreps_filtered';
          const params = unpaged
            ? [request.query.order, orderBy, retiredParam, expiredParam]
            : [
                request.query.order,
                request.query.count,
                request.query.page,
                orderBy,
                retiredParam,
                expiredParam,
              ];

          ({ rows } = await clientDbSync.query<QueryTypes.DReps>(SQLQuery.get(sqlKey), params));
        } else {
          const sqlKey = unpaged ? 'governance_dreps_unpaged' : 'governance_dreps';
          const params = unpaged
            ? [request.query.order, orderBy]
            : [request.query.order, request.query.count, request.query.page, orderBy];

          ({ rows } = await clientDbSync.query<QueryTypes.DReps>(SQLQuery.get(sqlKey), params));
        }

        gracefulRelease(clientDbSync);

        const result: ResponseTypes.DReps = rows.map(row => {
          const cip129DRep = databaseSyncDRepToCIP129(row);
          const error = transformOffChainFetchError(row.metadata_fetch_error);

          // metadata_url is non-null iff there's a voting_anchor row (anchor URL is NOT NULL in
          // db-sync). Absence of an anchor == no metadata at all, mirroring how /dreps/:drep_id/metadata
          // 404s in the single-DRep equivalent. When the anchor exists, voting_anchor.data_hash
          // is also NOT NULL, so metadata_hash is correlated with metadata_url (asserted below).
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
