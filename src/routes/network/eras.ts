import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { getConfig } from '../../config.js';
import { PROTOCOL_VERSIONS } from '../../constants/genesis.js';
import { SQLQuery } from '../../sql/index.js';
import { ByronEraParameters } from '../../types/common.js';
import { Block } from '../../types/queries/blocks.js';
import * as QueryTypes from '../../types/queries/network.js';
import * as LedgerResponseTypes from '../../types/responses/ledger.js';
import { getDbSync } from '../../utils/database.js';
import { handle500 } from '../../utils/error-handler.js';
import { standardSafeZone } from '../../utils/routes.js';

async function route(fastify: FastifyInstance) {
  fastify.route({
    url: '/network/eras',
    method: 'GET',
    schema: getSchemaForEndpoint('/network/eras'),
    handler: async (request: FastifyRequest, reply) => {
      const genesisData: LedgerResponseTypes.Ledger = getConfig().genesis;
      const byronGenesisData: ByronEraParameters = getConfig().byronGenesis;

      if (!genesisData && !byronGenesisData) {
        return handle500(reply, 'No genesis or Byron genesis data', request);
      }

      const db = getDbSync(fastify);

        const lastBlock = await db.any<Block>(SQLQuery.get('blocks_latest'));
        const protocols = await db.any<QueryTypes.Protocols>(
          SQLQuery.get('network_protocols'),
        );

        // First summary item is Byron era parameters
        const first = {
          start: {
            time: 0,
            slot: 0,
            epoch: 0,
          },
          end: {
            time:
              byronGenesisData.end_epoch *
              byronGenesisData.epoch_length *
              byronGenesisData.slot_length,
            slot: byronGenesisData.end_epoch * byronGenesisData.epoch_length,
            epoch: byronGenesisData.end_epoch,
          },
          parameters: {
            epoch_length: byronGenesisData.epoch_length,
            slot_length: byronGenesisData.slot_length,
            safe_zone: byronGenesisData.safe_zone,
          },
        };

        const summary = [first];

        // Add first three implicit entries if Instafork
        // or in another words the first update is to Babbage (protocol_major 6)
        if (protocols.length > 0 && protocols[0].protocol_major === 6) {
          const firstLike = { ...first };

          firstLike.parameters = {
            epoch_length: genesisData.epoch_length,
            slot_length: genesisData.slot_length,
            safe_zone: standardSafeZone(
              genesisData.security_param,
              genesisData.active_slots_coefficient,
            ),
          };
          for (let index = 0; index < 3; index++) summary.push(firstLike);
        }

        // Intermediate summary items separated by protocol major change
        // excluding inter-era hard forks
        let previous = first;

        for (const epochProto of protocols) {
          if (PROTOCOL_VERSIONS[epochProto.protocol_major].is_era_hardfork) {
            const effectiveEpoch = epochProto.epoch;
            const duration = effectiveEpoch - previous.end.epoch;
            const next = {
              start: {
                time: previous.end.time,
                slot: previous.end.slot,
                epoch: previous.end.epoch,
              },
              end: {
                time:
                  previous.end.time + duration * genesisData.epoch_length * genesisData.slot_length,
                slot: previous.end.slot + duration * genesisData.epoch_length,
                epoch: effectiveEpoch,
              },
              parameters: {
                epoch_length: genesisData.epoch_length,
                slot_length: genesisData.slot_length,
                safe_zone: standardSafeZone(
                  genesisData.security_param,
                  genesisData.active_slots_coefficient,
                ),
              },
            };

            summary.push(next);
            previous = next;
          }
        }

        // Last summary entry is ending at current epoch + 1
        // except for a case when current slot in epoch
        // is past epochLength - safeZone when we're sure hardfork cannot occur
        // in this epoch so we can extend this era duration to current epoch + 2
        const safeZone = standardSafeZone(
          genesisData.security_param,
          genesisData.active_slots_coefficient,
        );
        const lastListedEpoch =
          lastBlock[0].epoch +
          (lastBlock[0].epoch_slot >= genesisData.epoch_length - safeZone ? 2 : 1);
        const lastDuration = lastListedEpoch - previous.end.epoch;
        const last = {
          start: {
            time: previous.end.time,
            slot: previous.end.slot,
            epoch: previous.end.epoch,
          },
          end: {
            time:
              previous.end.time + lastDuration * genesisData.epoch_length * genesisData.slot_length,
            slot: previous.end.slot + lastDuration * genesisData.epoch_length,
            epoch: lastListedEpoch,
          },
          parameters: {
            epoch_length: genesisData.epoch_length,
            slot_length: genesisData.slot_length,
            safe_zone: safeZone,
          },
        };

        summary.push(last);

        return reply.send(summary);

    },
  });
}

export default route;
