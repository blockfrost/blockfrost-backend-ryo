WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
),
-- Resolve drep_hash_id once
drep AS (
  SELECT dh.id AS hash_id
  FROM drep_hash dh
  WHERE (
      ($4::bytea IS NOT NULL AND dh.raw = $4) OR
      ($4 IS NULL AND dh.view = $5)
    )
    AND dh.has_script = $6
  LIMIT 1
),
-- Compute drep registration status once (not per-row)
drep_is_active AS (
  SELECT
    COALESCE(
      (SELECT ROW(dr.tx_id, dr.cert_index)
       FROM drep_registration dr
       WHERE dr.drep_hash_id = (SELECT hash_id FROM drep) AND dr.deposit > 0
       ORDER BY dr.tx_id DESC, dr.cert_index DESC
       LIMIT 1),
      ROW(1::bigint, 1::integer)
    )
    >
    COALESCE(
      (SELECT ROW(dr.tx_id, dr.cert_index)
       FROM drep_registration dr
       WHERE dr.drep_hash_id = (SELECT hash_id FROM drep) AND dr.deposit < 0
       ORDER BY dr.tx_id DESC, dr.cert_index DESC
       LIMIT 1),
      ROW(-1::bigint, -1::integer)
    ) AS active
),
-- Compute latest registration tx_id once (not per-row)
latest_reg_tx AS (
  SELECT COALESCE(MAX(dr.tx_id), -1) AS tx_id
  FROM drep_registration dr
  WHERE dr.drep_hash_id = (SELECT hash_id FROM drep)
    AND dr.deposit > 0
),
-- Find qualifying delegators and apply pagination BEFORE computing balances
-- and joining stake_address. This avoids materializing all 176k+ delegators.
filtered_delegators AS (
  SELECT dv.addr_id, dv.id AS did
  FROM delegation_vote dv
  WHERE dv.drep_hash_id = (SELECT hash_id FROM drep)
    AND (SELECT active FROM drep_is_active)
    AND dv.tx_id >= (SELECT tx_id FROM latest_reg_tx)
    AND EXISTS (
      SELECT 1
      FROM stake_registration sr
      WHERE sr.addr_id = dv.addr_id
    )
    AND NOT EXISTS (
      SELECT 1
      FROM delegation_vote AS dv1
      WHERE dv1.addr_id = dv.addr_id
        AND dv1.id > dv.id
      LIMIT 1
    )
    AND NOT EXISTS (
      SELECT 1
      FROM stake_deregistration
      WHERE stake_deregistration.addr_id = dv.addr_id
        AND stake_deregistration.tx_id > dv.tx_id
      LIMIT 1
    )
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
)
SELECT sa.view AS "address",
  (
    (
      SELECT COALESCE(SUM(txo.value), 0)
      FROM tx_out txo
      WHERE txo.consumed_by_tx_id IS NULL
        AND txo.stake_address_id = fd.addr_id
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward r
      WHERE r.addr_id = fd.addr_id
        AND r.spendable_epoch <= (
          SELECT epoch_no
          FROM current_epoch
        )
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward_rest rr
      WHERE rr.addr_id = fd.addr_id
        AND rr.spendable_epoch <= (
          SELECT epoch_no
          FROM current_epoch
        )
    ) - (
      SELECT COALESCE(SUM(amount), 0)
      FROM withdrawal w
      WHERE w.addr_id = fd.addr_id
    )
  )::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM
  filtered_delegators fd
  JOIN stake_address sa ON sa.id = fd.addr_id
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN fd.did
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN fd.did
  END ASC
