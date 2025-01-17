WITH queried_epoch AS (
  SELECT 
    no AS "epoch_no",
    drep_activity
  FROM epoch e
  JOIN epoch_param ep on (ep.epoch_no = e.no)
  ORDER BY e.no DESC
  LIMIT 1
),
calculated_active AS (
  SELECT
    dh.id AS drep_hash_id,
    (
      CASE
        -- REGISTERED IF THE LATEST REGISTRATION IS AFTER THE LATEST DEREGISTRATION
        WHEN (
          -- Special dreps have no drep_registration records, fallback to TRUE for these
          SELECT COALESCE(MAX(dr.tx_id), 1)
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
    ) AS registered,
    (
      SELECT MAX(b.epoch_no)
      FROM drep_registration dr
      JOIN tx ON tx.id = dr.tx_id
      JOIN block b ON b.id = tx.block_id
      WHERE dr.drep_hash_id = dh.id AND dr.deposit > 0
    ) AS last_registration_epoch,
    -- last_active_epoch combines all activity (registration, update, deregistration and voting)
    (
      SELECT MAX(combined_epochs.epoch_no)
      FROM (
        -- From drep_registration
        SELECT b.epoch_no
        FROM drep_registration dr
        JOIN tx ON tx.id = dr.tx_id
        JOIN block b ON b.id = tx.block_id
        WHERE dr.drep_hash_id = dh.id
        
        UNION

        -- From voting_procedure
        SELECT b.epoch_no
        FROM voting_procedure vp
        JOIN tx ON vp.tx_id = tx.id
        JOIN block b ON b.id = tx.block_id
        WHERE vp.drep_voter = dh.id
      ) combined_epochs
    ) AS last_active_epoch 
  FROM drep_hash dh
  WHERE (
    ($1::bytea IS NOT NULL AND dh.raw = $1) OR
    ($1 IS NULL AND dh.view = $2)
  ) AND dh.has_script = $3
),
-- DRep is expired if age(last_epoch, last_activity_epoch) > drep_activity param (currently 20) taken from latest epoch
calculated_expired AS (
  SELECT
    ca.drep_hash_id,
    (
      CASE
        WHEN ca.registered = TRUE AND (
          (SELECT epoch_no FROM queried_epoch) - ca.last_active_epoch
        ) > (SELECT drep_activity FROM queried_epoch) THEN true
        ELSE false
      END
    ) AS expired
  FROM calculated_active ca
)
SELECT dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  COALESCE(dd.amount, 0)::TEXT AS "amount",
  -- DEPRECATED
  ca.registered AS "active",
  -- DEPRECATED
  CASE
    -- TODO: fix this by showing active_epoch same as last_active_epoch independently on state of registration
    WHEN ca.registered THEN ca.last_registration_epoch
    ELSE NULL
  END AS "active_epoch",
  dh.has_script AS "has_script",
  ca.last_active_epoch as "last_active_epoch",
  NOT ca.registered AS "retired",
  ce.expired as "expired"
FROM drep_hash dh
  LEFT JOIN calculated_active ca ON dh.id = ca.drep_hash_id
  LEFT JOIN calculated_expired ce ON dh.id = ce.drep_hash_id
  LEFT JOIN drep_distr dd ON (
    dh.id = dd.hash_id
    AND dd.epoch_no = (
      SELECT epoch_no
      FROM queried_epoch
    )
  )
WHERE (
    ($1::bytea IS NOT NULL AND dh.raw = $1) OR
    ($1 IS NULL AND dh.view = $2)
  ) AND dh.has_script = $3
LIMIT 1