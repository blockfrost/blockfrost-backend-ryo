WITH queried_epoch AS (
  SELECT no AS "epoch_no"
  FROM epoch e
  ORDER BY e.no DESC
  LIMIT 1
),
calculated_active AS (
  SELECT
    dh.id AS drep_hash_id,
    (
      CASE
        -- ACTIVE IF THE LATEST REGISTRATION IS AFTER THE LATEST DEREGISTRATION
        WHEN (
          SELECT MAX(dr.tx_id)
          FROM drep_registration dr
          WHERE dr.drep_hash_id = dh.id AND dr.deposit > 0
        ) > (
          SELECT COALESCE(MAX(dr.tx_id), -1)
          FROM drep_registration dr
          WHERE dr.drep_hash_id = dh.id AND dr.deposit < 0
        ) THEN true
        -- OTHERWISE INACTIVE
        ELSE false
      END
    ) AS active,
    (
      SELECT MAX(b.epoch_no)
      FROM drep_registration dr
      JOIN tx ON tx.id = dr.tx_id
      JOIN block b ON b.id = tx.block_id
      WHERE dr.drep_hash_id = dh.id AND dr.deposit > 0
    ) AS active_epoch
  FROM drep_hash dh
  WHERE (
    ($1::bytea IS NOT NULL AND dh.raw = $1) OR
    ($1 IS NULL AND dh.view = $2)
  ) AND dh.has_script = $3
)
SELECT dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  COALESCE(dd.amount, 0)::TEXT AS "amount",
  ca.active AS "active",
  CASE
    WHEN ca.active THEN ca.active_epoch
    ELSE NULL
  END AS "active_epoch",
  dh.has_script AS "has_script"
FROM drep_hash dh
  LEFT JOIN calculated_active ca ON dh.id = ca.drep_hash_id
  LEFT JOIN drep_distr dd ON (
    dh.id = dd.hash_id
    AND dd.epoch_no = (
      SELECT *
      FROM queried_epoch
    )
  )
WHERE (
    ($1::bytea IS NOT NULL AND dh.raw = $1) OR
    ($1 IS NULL AND dh.view = $2)
  ) AND dh.has_script = $3
LIMIT 1