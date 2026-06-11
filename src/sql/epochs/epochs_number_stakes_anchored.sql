-- Variant of epochs_number_stakes.sql used when bf_tbl_epoch_stake_anchor
-- exists (maintained upstream by a db-sync trigger, see README). The anchor
-- table stores stake_address.hash_raw at every 1000th position of the epoch's
-- snapshot in hash_raw order; jumping to the nearest anchor at or below the
-- requested offset makes deep pages O(1000 + count) instead of O(offset).
-- Epochs without anchors (e.g. the one currently being synced) fall back to
-- a plain offset scan via the COALESCE defaults.
WITH anchor AS (
  SELECT a.hash_raw,
    a.rank
  FROM bf_tbl_epoch_stake_anchor a
  WHERE a.epoch_no = $1
    AND a.rank <= CASE
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
  ORDER BY a.rank DESC
  LIMIT 1
)
SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  es.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM stake_address sa
  JOIN epoch_stake es ON (es.addr_id = sa.id AND es.epoch_no = $1)
  JOIN pool_hash ph ON (ph.id = es.pool_id)
WHERE sa.hash_raw >= COALESCE(
    (
      SELECT hash_raw
      FROM anchor
    ),
    '\x'::bytea
  )
ORDER BY sa.hash_raw ASC
LIMIT CASE
    WHEN $2 >= 1
    AND $2 <= 100 THEN $2
    ELSE 100
  END OFFSET (
    CASE
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
  ) - COALESCE(
    (
      SELECT rank
      FROM anchor
    ),
    0
  )
