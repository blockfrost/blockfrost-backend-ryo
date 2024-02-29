SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  sorted_limited.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM(
    SELECT es.id,
      es.amount AS "amount",
      es.addr_id,
      es.pool_id
    FROM epoch_stake es
    WHERE es.epoch_no = $1
    ORDER BY es.id ASC
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
  ) AS "sorted_limited"
  JOIN pool_hash ph ON (ph.id = sorted_limited.pool_id)
  JOIN stake_address sa ON (sorted_limited.addr_id = sa.id)
ORDER BY sorted_limited.id ASC