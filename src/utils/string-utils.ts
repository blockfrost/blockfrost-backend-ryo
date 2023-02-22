import JSONStream from 'JSONStream';
import stream from 'stream';

export const getEndpointFromUrl = (url: string): string => {
  //remove queryparams
  const endpointWithoutQueryParameters = url.split('?')[0];
  //split using /, case with ' ' handles accessing root (without endpoint)
  const endpoint = endpointWithoutQueryParameters.slice(1).split('/', 1)[0] || '';

  return endpoint;
};

export const getAdditionalParametersFromRequest = (
  from?: string,
  to?: string,
): unknown[] | 'outOfRangeOrMalformedErr' => {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const parameterArray: unknown[] = Array.from({ length: 4 }).fill(undefined);

  try {
    const minInt = 0;
    const maxInt = 2_147_483_647;

    if (from !== undefined) {
      const fromTokens = from.split(':');
      const requestParameterIsOK = fromTokens.length <= 2;

      if (requestParameterIsOK) {
        const [heightString, indexString] = fromTokens;
        const height = Number.parseInt(heightString, 10);
        const index = Number.parseInt(indexString, 10); // NaN in case of missing index

        if (
          height >= minInt &&
          height <= maxInt &&
          (indexString === undefined || (index >= minInt && index <= maxInt))
        ) {
          parameterArray[0] = heightString;
          parameterArray[1] = indexString;
        } else {
          return 'outOfRangeOrMalformedErr';
        }
      }
    }

    if (to !== undefined) {
      const toTokens = to.split(':');
      const requestParameterIsOK = toTokens.length <= 2;

      if (requestParameterIsOK) {
        const [heightString, indexString] = toTokens;
        const height = Number.parseInt(heightString, 10);
        const index = Number.parseInt(indexString, 10); // NaN in case of missing index

        if (
          height >= minInt &&
          height <= maxInt &&
          (indexString === undefined || (index >= minInt && index <= maxInt))
        ) {
          parameterArray[2] = heightString;
          parameterArray[3] = indexString;
        } else {
          return 'outOfRangeOrMalformedErr';
        }
      }
    }
  } catch (error) {
    console.error(error);
    return 'outOfRangeOrMalformedErr';
  }
  return parameterArray;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortKeysInObject = (object: any) => {
  if (object === null || typeof object !== 'object') return object;

  const sortedKeys = Object.keys(object).sort((a, b) => a.localeCompare(b));
  const newObject: Record<string, unknown> = {};

  for (const k of sortedKeys) {
    // if the value is an object then sort also its key
    newObject[k] = typeof object[k] === 'object' ? sortKeysInObject(object[k]) : object[k];
  }
  return newObject;
};

export const toJSONStream = async (data: unknown[], serverResponse: stream.Writable) => {
  // Converts array of JS objects to JSON using JSONStream because
  // JSON.stringify-ing large objects can result in out of memory errors.
  // Example usage:
  // reply.raw.writeHead(200, { 'Content-Type': 'application/json' });
  // toJSONStream(data, reply.raw);

  // push data to readable stream
  const dataStream = stream.Readable.from(data);
  // initialize transformer that will convert the data to JSON string
  const transformStream = JSONStream.stringify('[', ',', ']');
  // push data from dataStream through transformStream to serverResponse
  // which writable stream from fastify reply

  return dataStream.pipe(transformStream).pipe(serverResponse);
  // Usage of pipeline below throws ERR_STREAM_PREMATURE_CLOSE after multiple calls.
  // return pipeline(dataStream, transformStream, serverResponse);
};
