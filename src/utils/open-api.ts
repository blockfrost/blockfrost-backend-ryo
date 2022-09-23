import fs from 'fs';
import YAML from 'yaml';
const schema = require.resolve('@blockfrost/openapi');
const file = fs.readFileSync(schema, 'utf8');
const spec = YAML.parse(file);

export const getSchemaForEndpoint = (endpointName: string) => {
  const responses: any = { response: {} };

  for (const response of Object.keys(spec.paths[endpointName].get.responses)) {
    // success 200
    if (response === '200') {
      const referenceOrValue =
        spec.paths[endpointName].get.responses['200'].content['application/json'].schema;

      // is reference -> resolve references
      if (referenceOrValue['$ref']) {
        const schemaName = referenceOrValue['$ref'].replace('#/components/schemas/', '');
        const schemaReferenceOrValue = spec.components.schemas[schemaName];

        // is nested reference
        if (schemaReferenceOrValue.items && schemaReferenceOrValue.items['$ref']) {
          const nestedSchemaName = schemaReferenceOrValue.items['$ref'].replace(
            '#/components/schemas/',
            '',
          );

          if (schemaReferenceOrValue.type) {
            responses.response[200] = {
              ...schemaReferenceOrValue,
              items: spec.components.schemas[nestedSchemaName],
            };
          } else {
            responses.response[200] = spec.components.schemas[nestedSchemaName];
          }
        } else {
          // is not nested reference
          responses.response[200] = spec.components.schemas[schemaName];
        }
      } else {
        // is not reference
        responses.response[200] = referenceOrValue;
      }

      // anyOf case
      if (referenceOrValue['anyOf']) {
        const anyOfResult: any = { anyOf: [] };

        for (const anyOfItem of referenceOrValue['anyOf']) {
          const schemaName = anyOfItem['$ref'].replace('#/components/schemas/', '');

          anyOfResult['anyOf'].push(spec.components.schemas[schemaName]);
        }

        responses.response[200] = anyOfResult;
      }

      // 1 bug -> edge case
      if (endpointName === '/txs/{hash}/metadata') {
        responses.response[200] = {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
              },
              json_metadata: {
                // possible bug FIXME https://github.com/fastify/fast-json-stringify/issues/246
                // oneOf: [
                //   {
                //     type: 'string',
                //   },
                //   {
                //     type: 'object',
                //   },
                // ],
              },
            },
            required: ['label', 'json_metadata'],
          },
        };
      }

      // 2 bug -> edge case
      if (endpointName === '/nutlink/{address}/tickers/{ticker}') {
        responses.response[200] = {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tx_hash: {
                type: 'string',
              },
              block_height: {
                type: 'integer',
              },
              tx_index: {
                type: 'integer',
              },
              payload: {
                // possible bug FIXME https://github.com/fastify/fast-json-stringify/issues/246
                // anyOf: [
                //   {
                //     type: 'string',
                //   },
                //   // {
                //   //   type: 'object',
                //   // },
                //   {
                //     type: 'array',
                //     //items: {},
                //     additionalProperties: true,
                //   },
                //   {
                //     type: 'integer',
                //   },
                //   {
                //     type: 'number',
                //   },
                //   {
                //     type: 'boolean',
                //   },
                // ],
                //additionalProperties: true,
              },
            },
            required: ['tx_hash', 'tx_index', 'block_height', 'payload'],
          },
        };
      }

      // 3 bug -> edge case
      if (endpointName === '/nutlink/tickers/{ticker}') {
        responses.response[200] = {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description: 'Address of a metadata oracle',
              },
              tx_hash: {
                type: 'string',
                description: 'Hash of the transaction',
              },
              block_height: {
                type: 'integer',
                description: 'Block height of the record',
              },
              tx_index: {
                type: 'integer',
                description: 'Transaction index within the block',
              },
              payload: {
                // possible bug FIXME https://github.com/fastify/fast-json-stringify/issues/246
                // anyOf: [
                //   {
                //     type: 'string',
                //   },
                //   // {
                //   //   type: 'object',
                //   // },
                //   {
                //     type: 'array',
                //     //items: {},
                //     additionalProperties: true,
                //   },
                //   {
                //     type: 'integer',
                //   },
                //   {
                //     type: 'number',
                //   },
                //   {
                //     type: 'boolean',
                //   },
                // ],
                //additionalProperties: true,
              },
            },
            required: ['address', 'tx_hash', 'block_height', 'tx_index', 'payload'],
          },
        };
      }
    }

    // errors and others
    else {
      responses.response[response] =
        spec.components.responses[response].content['application/json'].schema;
    }
  }

  // if (endpointName === '/metadata/txs/labels/{label}') {
  //   console.log(JSON.stringify(responses));
  // }

  return responses;
};
