SELECT es.epoch_no AS "active_epoch",
  (
    SELECT view
    FROM pool_hash ph
    WHERE ph.id = es.pool_id
  ) AS "pool_id",
  es.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM epoch_stake es
  JOIN stake_address sa ON (es.addr_id = sa.id)
WHERE sa.view = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN es.epoch_no
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN es.epoch_no
  END ASC