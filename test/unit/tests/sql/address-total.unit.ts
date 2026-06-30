import fs from 'fs';
import { describe, expect, test } from 'vitest';

import { SQLQuery } from '../../../../src/sql/index.js';

const totalQueryKeys = [
  'addresses_address_total',
  'accounts_stake_address_addresses_total',
] as const;

describe('address total SQL', () => {
  test.each(totalQueryKeys)('%s joins matched outputs directly to ma_tx_out', queryKey => {
    const sql = SQLQuery.get(queryKey);

    expect(sql).toContain('matched_received AS MATERIALIZED');
    expect(sql).toContain('matched_sent AS MATERIALIZED');
    expect(sql).toContain('JOIN ma_tx_out mto ON (mto.tx_out_id = ms.tx_out_id)');
    expect(sql).toContain('JOIN ma_tx_out mto ON (mto.tx_out_id = mr.tx_out_id)');

    expect(sql).not.toContain('array_agg(mto.id)');
    expect(sql).not.toContain('unnest(assets_ids)');
    expect(sql).not.toContain('mto.id IN');
  });

  test.each(totalQueryKeys)('%s counts distinct scalar transaction ids', queryKey => {
    const sql = SQLQuery.get(queryKey);

    expect(sql).toContain('COUNT(DISTINCT txid)');
    expect(sql).toContain('UNION ALL');
    expect(sql).not.toContain('SELECT txids');
    expect(sql).not.toContain('array_agg(DISTINCT tx.id)');
    expect(sql).not.toMatch(/\bJOIN\s+tx\s/);
  });

  test('recommended indexes include ma_tx_out lookup by tx_out_id', () => {
    const readme = fs.readFileSync('README.md', 'utf8');

    expect(readme).toContain(
      'CREATE INDEX IF NOT EXISTS bf_idx_ma_tx_out_tx_out_id_covering ON ma_tx_out (tx_out_id) INCLUDE (ident, quantity);',
    );
  });
});
