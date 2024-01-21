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
  )::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM (
    SELECT sa.view AS "address",
      dv.addr_id AS "address_id",
      dv.id AS "did"
    FROM delegation_vote dv
      JOIN drep_hash dh ON (dh.id = dv.drep_hash_id)
      JOIN stake_address sa ON (sa.id = dv.addr_id)
    WHERE dh.view = $4
      AND dv.id = (
        SELECT MAX(id)
        FROM delegation_vote
        WHERE addr_id = dv.addr_id
      )
    GROUP BY sa.view,
      dv.drep_hash_id,
      dv.addr_id,
      dv.id
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN dv.id
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN dv.id
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