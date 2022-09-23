SELECT es.epoch_no AS "active_epoch",
  (
    SELECT view
    FROM pool_hash ph
    WHERE ph.id = es.pool_id
  ) AS "pool_id",
  es.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM epoch_stake es
  JOIN stake_address sa ON (es.addr_id = sa.id)
WHERE sa.view = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN es.epoch_no
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN es.epoch_no
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