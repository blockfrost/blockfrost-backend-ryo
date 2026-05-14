WITH ordered_delegations AS (
  SELECT d.id, d.active_epoch_no, d.tx_id, d.pool_hash_id
  FROM stake_address sa
    JOIN delegation d ON (sa.id = d.addr_id)
  WHERE sa.view = $2
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN d.tx_id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN d.tx_id
    END ASC
)
SELECT o.active_epoch_no::INTEGER AS "active_epoch",
  encode(tx.hash, 'hex') AS "tx_hash",
  tx.out_sum::TEXT AS "amount",
  ph.view AS "pool_id",
  b.slot_no::INTEGER AS "tx_slot",
  b.block_no AS "block_height",
  EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
FROM ordered_delegations o
  JOIN tx ON (o.tx_id = tx.id)
  JOIN block b ON (b.id = tx.block_id)
  JOIN pool_hash ph ON (ph.id = o.pool_hash_id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.id
  END ASC
