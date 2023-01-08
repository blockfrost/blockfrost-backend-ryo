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
WHERE sa.view = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN r.earned_epoch
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN r.earned_epoch
  END ASC,
  r.type ASC -- ORDER by type as well