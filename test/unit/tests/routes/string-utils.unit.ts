import {
  getEndpointFromUrl,
  sortKeysInObject,
  toJSONStream,
} from '../../../../src/utils/string-utils.js';
import { describe, expect, test } from 'vitest';
import stream from 'stream';

describe('stringUtils', async () => {
  test('getRequestUrl', () => {
    expect(getEndpointFromUrl('/')).toStrictEqual('');
    expect(getEndpointFromUrl('')).toStrictEqual('');
    expect(getEndpointFromUrl('/blocks')).toStrictEqual('blocks');
    expect(getEndpointFromUrl('/blocks/5084955/next')).toStrictEqual('blocks');
    expect(
      getEndpointFromUrl(
        '/block/89d9b5a5b8ddc8d7e5a6795e9774d97faf1efea59b2caf7eaf9f8c5b32059df4/next',
      ),
    ).toStrictEqual('block');
    expect(
      getEndpointFromUrl(
        '/tx/addr1q85yx2w7ragn5sx6umgmtjpc3865s9sg59sz4rrh6f90kgwfwlzu3w8ttacqg89mkdgwshwnplj5c5n9f8dhp0h55q2q7qm63t',
      ),
    ).toStrictEqual('tx');
    expect(getEndpointFromUrl('/pools')).toStrictEqual('pools');
    expect(getEndpointFromUrl('/pools?order=desc')).toStrictEqual('pools');
    expect(getEndpointFromUrl('/pools?order=desc&count=5')).toStrictEqual('pools');
  });

  test('sortKeysInObject', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(sortKeysInObject(undefined)).toStrictEqual(undefined);
    expect(sortKeysInObject(null)).toStrictEqual(null);
    expect(sortKeysInObject('bla')).toStrictEqual('bla');

    expect(
      Object.keys(
        sortKeysInObject(
          JSON.parse(`{"a": "gonna","b": "you","1": "never","c": "up","abcd": "give"}`),
        ),
      ),
    ).toStrictEqual(['1', 'a', 'abcd', 'b', 'c']);

    expect(
      Object.keys(sortKeysInObject({ a: 'gonna', b: 'you', '1': 'never', c: 'up', abcd: 'give' })),
    ).toStrictEqual(['1', 'a', 'abcd', 'b', 'c']);

    const object: Record<string, string> = {};
    const kv = [
      ['b', 'you'],
      ['a', 'gonna'],
      ['1', 'never'],
      ['c', 'up'],
      ['abcd', 'give'],
    ] as const;

    for (const pair of kv) {
      object[pair[0]] = pair[1];
    }

    // number-like indexes are always first regardless of the order of the insertion
    expect(Object.keys(object)).toStrictEqual(['1', 'b', 'a', 'c', 'abcd']);
    expect(Object.keys(sortKeysInObject(object))).toStrictEqual(['1', 'a', 'abcd', 'b', 'c']);
    const nested = {
      PlutusV2: {
        b: 3,
        abcd: 2,
        a: 1,
        1: 0,
      },
      PlutusV1: {
        b: 3,
        abcd: 2,
        a: 1,
        1: 0,
      },
    };

    expect(Object.keys(sortKeysInObject(nested))).toStrictEqual(['PlutusV1', 'PlutusV2']);
    expect(Object.keys(sortKeysInObject(nested)['PlutusV1'])).toStrictEqual([
      '1',
      'a',
      'abcd',
      'b',
    ]);
    expect(Object.keys(sortKeysInObject(nested)['PlutusV2'])).toStrictEqual([
      '1',
      'a',
      'abcd',
      'b',
    ]);
  });

  test('toJSONStream', async () => {
    let data = '';
    const w = new stream.Writable();

    w._write = (chunk, _encoding, done) => {
      data += Buffer.from(chunk);
      done();
    };

    await toJSONStream([{ a: 'a', b: 2, c: undefined, d: null }, { a: 10.2 }], w);

    // we need to wait till stream calls 'finish' event to have all chunks processed
    await new Promise((resolve, reject) => {
      w.on('error', error => {
        reject(error);
      });
      w.on('finish', () => {
        expect(data).toStrictEqual(`[{"a":"a","b":2,"d":null},{"a":10.2}]`);
        resolve(true);
      });
    });
  });
});
