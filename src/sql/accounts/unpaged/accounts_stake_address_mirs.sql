SELECT encode(tx_hash, 'hex') AS "tx_hash",
  amount::TEXT AS "amount", -- cast to TEXT to avoid number overflow
  tx_slot AS "tx_slot",
  block_time AS "block_time"
FROM(
    SELECT tx.id AS "id",
      tx.hash AS "tx_hash",
      r.amount AS "amount",
      b.slot_no::INTEGER AS "tx_slot",
      EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
    FROM tx
      JOIN reserve r ON (tx.id = r.tx_id)
      JOIN stake_address sa ON (sa.id = r.addr_id)
      JOIN block b ON (b.id = tx.block_id)
    WHERE sa.view = $2
    UNION ALL
    SELECT tx.id AS "id",
      tx.hash AS "tx_hash",
      t.amount AS "amount",
      b.slot_no::INTEGER AS "tx_slot",
      EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
    FROM tx
      JOIN treasury t ON (tx.id = t.tx_id)
      JOIN stake_address sa ON (sa.id = t.addr_id)
      JOIN block b ON (b.id = tx.block_id)
    WHERE sa.view = $2
  ) AS "unordered_txs"
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN id
  END ASC