import { getInstance } from '../../utils';
import fixtures from '../../fixtures/mainnet/addresses';
import { describe, test, expect } from 'vitest';

describe('addresses endpoint', () => {
  fixtures.map(fixture => {
    fixture.endpoints.map(async endpoint => {
      test(fixture.testName, async () => {
        const client = getInstance();
        const response = await client.get(endpoint).json();

        expect(response).toMatchObject(fixture.response);
      });
    });
  });

  test('/addresses/:address/utxos', async () => {
    const client = getInstance();
    const response = await client
      .get(
        'addresses/addr1qxxfwz7n3lnduxxgff6smhwlxkcw3gcax3q39363cpq4axnntgjccmteyrsldd67rxv2yq6ew2a7t48q34p9j7nf0kjq4rdx3w/utxos',
      )
      .json();

    expect(response).toStrictEqual(
      expect.arrayContaining([
        {
          tx_hash: expect.any(String),
          tx_index: expect.any(Number),
          output_index: expect.any(Number),
          amount: expect.arrayContaining([
            { unit: expect.any(String), quantity: expect.any(String) },
          ]),
          block: expect.any(String),
          // @ts-expect-error test
          inline_datum: expect.toBeTypeOrNull(String),
          // @ts-expect-error test
          reference_script_hash: expect.toBeTypeOrNull(String),
        },
      ]),
    );
  });
});
