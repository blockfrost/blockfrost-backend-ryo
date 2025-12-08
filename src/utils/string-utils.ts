import JSONStream from 'JSONStream';
import { pathToRegexp } from 'path-to-regexp';
import stream from 'stream';

export const getEndpointFromUrl = (url: string): string => {
  //remove queryparams
  const endpointWithoutQueryParameters = url.split('?')[0];
  //split using /, case with ' ' handles accessing root (without endpoint)
  const endpoint = endpointWithoutQueryParameters.slice(1).split('/', 1)[0] || '';

  return endpoint;
};

/**
 * Matches a given request URL against a list of allowed endpoint patterns.
 *
 * @param requestUrl - The URL of the incoming request to match.
 * @param allowedEndpointPatterns - An array of endpoint patterns to match the request URL against. Each pattern should be a string in the format accepted by `path-to-regexp`.
 * @returns `true` if the request URL matches any of the allowed endpoint patterns, otherwise `false`.
 *
 * @example
 * ```
 * const requestUrl = '/api/user/123';
 * const allowedPatterns = ['/api/user/:id', '/api/admin/:id'];
 * const isMatch = matchUrlToEndpoint(requestUrl, allowedPatterns);
 * console.log(isMatch); // true
 * ```
 */
export const matchUrlToEndpoint = (requestUrl: string, allowedEndpointPatterns: string[]) => {
  for (const allowedEndpointPattern of allowedEndpointPatterns) {
    const { regexp } = pathToRegexp(allowedEndpointPattern);
    const match = requestUrl.match(regexp);

    if (match) {
      return true;
    }
  }

  return false;
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
