WITH paged_delegations AS (
  -- Pagination is pushed before the joins to tx / block / pool_hash, so they fire
  -- only for the page we return, not for every delegation made by this stake key.
  SELECT d.id, d.active_epoch_no, d.tx_id, d.pool_hash_id
  FROM stake_address sa
    JOIN delegation d ON (sa.id = d.addr_id)
  WHERE sa.view = $4
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN d.tx_id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN d.tx_id
    END ASC
  LIMIT CASE
      WHEN $2 >= 1
      AND $2 <= 100 THEN $2
      ELSE 100
    END OFFSET CASE
      WHEN $3 > 1
      AND $3 < 2147483647 THEN ($3 - 1) * (
        CASE
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END
      )
      ELSE 0
    END
)
SELECT p.active_epoch_no::INTEGER AS "active_epoch",
  encode(tx.hash, 'hex') AS "tx_hash",
  tx.out_sum::TEXT AS "amount",
  ph.view AS "pool_id",
  b.slot_no::INTEGER AS "tx_slot",
  b.block_no AS "block_height",
  EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
FROM paged_delegations p
  JOIN tx ON (p.tx_id = tx.id)
  JOIN block b ON (b.id = tx.block_id)
  JOIN pool_hash ph ON (ph.id = p.pool_hash_id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.id
  END ASC
