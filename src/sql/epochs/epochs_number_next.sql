WITH queried_epochs AS (
  SELECT no AS "epoch_no"
  FROM epoch e
  WHERE (
      e.no > $1 + (
        CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3 - 1
          ELSE 0
        END
      )
      AND e.no <= $1 + (
        CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3
          ELSE 1
        END
      )
    )
),
queried_stakes AS (
  SELECT epoch_no AS "epoch_no",
    SUM(amount) AS "amount"
  FROM epoch_stake
  WHERE epoch_no IN (
      SELECT epoch_no
      FROM queried_epochs
    )
  GROUP BY epoch_no
)
SELECT e.no AS "epoch",
  (
    extract(
      epoch
      FROM (
          SELECT e.no * ($4 || 'SECONDS')::INTERVAL + (
              SELECT start_time
              FROM meta
              ORDER BY id
              LIMIT 1
            )
        )
    )
  )::INTEGER AS "start_time",
  (
    extract(
      epoch
      FROM (
          SELECT (e.no + 1) * ($4 || 'SECONDS')::INTERVAL + (
              SELECT start_time
              FROM meta
              ORDER BY id
              LIMIT 1
            )
        )
    )
  )::INTEGER AS "end_time",
  extract(
    epoch
    FROM e.start_time
  )::INTEGER AS "first_block_time",
  extract(
    epoch
    FROM e.end_time
  )::INTEGER AS "last_block_time",
  e.blk_count AS "block_count",
  e.tx_count AS "tx_count",
  e.out_sum::TEXT AS "output", -- cast to TEXT to avoid number overflow
  e.fees::TEXT AS "fees", -- cast to TEXT to avoid number overflow
  q.amount::TEXT AS "active_stake" -- cast to TEXT to avoid number overflow
FROM epoch e
  LEFT JOIN queried_stakes q ON (e.no = q.epoch_no)
WHERE (
    e.no > $1 + (
      CASE
        -- query.count
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END * CASE
        -- query.page
        WHEN $3 > 1
        AND $3 < 2147483647 THEN $3 - 1
        ELSE 0
      END
    )
    AND e.no <= $1 + (
      CASE
        -- query.count
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END * CASE
        -- query.page
        WHEN $3 > 1
        AND $3 < 2147483647 THEN $3
        ELSE 1
      END
    )
  )
ORDER BY e.no ASC