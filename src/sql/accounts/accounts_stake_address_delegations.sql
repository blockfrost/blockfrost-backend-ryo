SELECT d.active_epoch_no::INTEGER AS "active_epoch",
  encode(tx.hash, 'hex') AS "tx_hash",
  tx.out_sum::TEXT AS "amount", -- cast to TEXT to avoid number overflow
  ph.view AS "pool_id"
FROM stake_address sa
  JOIN delegation d ON (sa.id = d.addr_id)
  JOIN tx ON (d.tx_id = tx.id)
  JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
WHERE sa.view = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.id
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