SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  es.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM stake_address sa
  JOIN epoch_stake es ON (es.addr_id = sa.id AND es.epoch_no = $1)
  JOIN pool_hash ph ON (ph.id = es.pool_id)
ORDER BY sa.hash_raw ASC
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
