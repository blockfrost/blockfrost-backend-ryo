SELECT r.earned_epoch AS "epoch",
  r.amount::TEXT AS "amount", -- cast to TEXT to avoid number overflow
  ph.view AS "pool_id",
  CASE
    WHEN r.type = 'refund' THEN 'pool_deposit_refund'
    ELSE r.type::TEXT
  END AS "type"
FROM stake_address sa
  JOIN reward r ON (sa.id = r.addr_id)
  JOIN pool_hash ph ON (ph.id = r.pool_id)
WHERE sa.view = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN r.earned_epoch
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN r.earned_epoch
  END ASC,
  r.type ASC -- ORDER by type as well
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