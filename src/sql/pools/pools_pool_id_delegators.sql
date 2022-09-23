WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
)
SELECT "address" AS "address",
  (
    (
      SELECT COALESCE(SUM(txo.value), 0)
      FROM tx_out txo
        LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
        AND (txo.index = txi.tx_out_index)
      WHERE txi IS NULL
        AND txo.stake_address_id = address_id
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward r
      WHERE (r.addr_id = address_id)
        AND r.spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
    ) - (
      SELECT COALESCE(SUM(amount), 0)
      FROM withdrawal w
      WHERE (w.addr_id = address_id)
    )
  )::TEXT AS "live_stake" -- cast to TEXT to avoid number overflow
FROM (
    SELECT sa.view AS "address",
      d.addr_id AS "address_id",
      d.id AS "did"
    FROM delegation d
      JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
      JOIN stake_address sa ON (sa.id = d.addr_id)
      JOIN stake_registration sr ON (sr.addr_id = d.addr_id)
      LEFT JOIN (
        SELECT addr_id,
          MAX(tx_id) AS tempmax
        FROM stake_deregistration
        GROUP BY addr_id
      ) deregmax ON (deregmax.addr_id = d.addr_id)
    WHERE ph.view = $4
      AND d.id = (
        SELECT MAX(id)
        FROM delegation
        WHERE addr_id = d.addr_id
      )
      AND sr.tx_id = (
        SELECT MAX(tx_id)
        FROM stake_registration
        WHERE addr_id = d.addr_id
      )
      AND (
        (
          deregmax.tempmax IS NOT NULL
          AND sr.tx_id > deregmax.tempmax
        )
        OR (deregmax.tempmax IS NULL)
      )
    GROUP BY sa.view,
      d.pool_hash_id,
      d.addr_id,
      d.id,
      sr.tx_id
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN d.id
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN d.id
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
  ) "sorted_limited"
GROUP BY address,
  address_id,
  did
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN did
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN did
  END ASC