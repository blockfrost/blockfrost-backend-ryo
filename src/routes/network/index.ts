import { FastifyInstance, FastifyRequest } from 'fastify';
import * as QueryTypes from '../../types/queries/network';
import * as ResponseTypes from '../../types/responses/network';
import * as LedgerResponseTypes from '../../types/responses/ledger';
import { getSchemaForEndpoint } from '@blockfrost/openapi';
import { getConfig } from '../../config';
import { getDbSync } from '../../utils/database';
import { standardSafeZone } from '../../utils/routes';
import { handle500 } from '../../utils/error-handler';
import { SQLQuery } from '../../sql';
import { ByronEraParameters } from '../../types/common';
import { BYRON_GENESIS, GENESIS, PROTOCOL_VERSIONS } from '../../constants/genesis';

async function network(fastify: FastifyInstance) {
  fastify.route({
    url: '/network',
    method: 'GET',
    schema: getSchemaForEndpoint('/network'),
    handler: async (_request: FastifyRequest, reply) => {
      const clientDbSync = await getDbSync(fastify);

      try {
        const { rows }: { rows: ResponseTypes.Network[] } =
          await clientDbSync.query<QueryTypes.Network>(SQLQuery.get('network'));

        clientDbSync.release();
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
    url: '/network/eras',
    method: 'GET',
    schema: getSchemaForEndpoint('/network/eras'),
    handler: async (request: FastifyRequest, reply) => {
      const network = getConfig().network;
      const genesisData: LedgerResponseTypes.Ledger | undefined = GENESIS[network];
      const byronGenesisData: ByronEraParameters | undefined = BYRON_GENESIS[network];

      if (!genesisData && !byronGenesisData) {
        return handle500(reply, 'No genesis or Byron genesis data', request);
      }

      const clientDbSync = await getDbSync(fastify);

      try {
        const lastEpoch = await clientDbSync.query<QueryTypes.Epoch>(SQLQuery.get('network_epoch'));
        const protocols = await clientDbSync.query<QueryTypes.Protocols>(
          SQLQuery.get('network_protocols'),
        );

        clientDbSync.release();

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
        // or in another words the first update is to Babbage (protocol_major 7)
        if (protocols.rows.length > 0 && protocols.rows[0].protocol_major === 7) {
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

        for (const epochProto of protocols.rows) {
          if (PROTOCOL_VERSIONS[epochProto.protocol_major].is_era_hardfork) {
            const effectiveEpoch = epochProto.epoch + 1;
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

        // Last summary entry is ending at current epoch + 2
        const lastListedEpoch = lastEpoch.rows[0].epoch + 2;
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
            safe_zone: standardSafeZone(
              genesisData.security_param,
              genesisData.active_slots_coefficient,
            ),
          },
        };

        summary.push(last);

        return reply.send(summary);
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
