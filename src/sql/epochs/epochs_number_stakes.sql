SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  sorted_limited.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM(
    SELECT es.amount AS "amount",
      es.addr_id,
      es.pool_id,
      (
        -- slot_no of the earliest delegation by this addr to this pool that is
        -- effective by this epoch. Chain-derived, stable across replicas.
        -- A long-time delegator stays at the top regardless of re-delegation churn.
        SELECT MIN(d.slot_no)
        FROM delegation d
        WHERE d.addr_id = es.addr_id
          AND d.pool_hash_id = es.pool_id
          AND d.active_epoch_no <= es.epoch_no
      ) AS "first_slot"
    FROM epoch_stake es
    WHERE es.epoch_no = $1
    ORDER BY first_slot ASC NULLS LAST,
      es.addr_id ASC
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
ORDER BY sorted_limited.first_slot ASC NULLS LAST,
  sorted_limited.addr_id ASC
