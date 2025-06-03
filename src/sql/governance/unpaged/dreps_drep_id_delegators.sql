WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
),
-- This new CTE ensures that only active delegators are included by filtering out 
-- any addresses with a more recent stake_deregistration than stake_registration.
active_delegators AS (
  SELECT sa.view AS "address",
    dv.addr_id AS "address_id",
    dv.id AS "did"
  FROM delegation_vote dv
    JOIN drep_hash dh ON (dh.id = dv.drep_hash_id)
    JOIN stake_address sa ON (sa.id = dv.addr_id)
    JOIN stake_registration sr ON sr.addr_id = dv.addr_id
    LEFT JOIN stake_deregistration sd ON sd.addr_id = dv.addr_id
  WHERE (
      ($4::bytea IS NOT NULL AND dh.raw = $4) OR
      ($4 IS NULL AND dh.view = $5)
    )
        AND dh.has_script = $6
    AND dv.addr_id = sa.id
    AND NOT EXISTS (
      SELECT TRUE
      FROM delegation_vote AS dv1
      WHERE dv1.addr_id = dv.addr_id
        AND dv1.id > dv.id
      LIMIT 1
    )
    AND NOT EXISTS (
      SELECT TRUE
      FROM stake_deregistration
      WHERE stake_deregistration.addr_id = dv.addr_id
        AND stake_deregistration.tx_id > dv.tx_id
      LIMIT 1
    )
      -- while the drep is still registered (not retired)
    AND (
      COALESCE((
        SELECT ROW(dr.tx_id, dr.cert_index)
        FROM drep_registration dr
        WHERE dr.drep_hash_id = dv.drep_hash_id AND dr.deposit > 0
        ORDER BY dr.tx_id DESC, dr.cert_index DESC
        LIMIT 1
      ), ROW(1::bigint, 1::integer)) 
      > 
      COALESCE((
        SELECT ROW(dr.tx_id, dr.cert_index)
        FROM drep_registration dr
        WHERE dr.drep_hash_id = dv.drep_hash_id AND dr.deposit < 0
        ORDER BY dr.tx_id DESC, dr.cert_index DESC
        LIMIT 1
      ), ROW(-1::bigint, -1::integer))
    )
    -- delegation_vote must be after latest drep registration
    AND dv.tx_id >= (
      SELECT COALESCE(MAX(dr.tx_id), -1)
      FROM drep_registration dr
      WHERE 
        dr.drep_hash_id = dv.drep_hash_id AND dr.deposit > 0
    )
  GROUP BY sa.view, dv.drep_hash_id, dv.addr_id, dv.id
)
SELECT "address" AS "address",
  (
    (
      SELECT COALESCE(SUM(txo.value), 0)
      FROM tx_out txo
        WHERE txo.consumed_by_tx_id IS NULL
        AND txo.stake_address_id = address_id
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward r
      WHERE (r.addr_id = address_id)
        AND r.spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward_rest rr
      WHERE (rr.addr_id = address_id)
        AND rr.spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
    ) - (
      SELECT COALESCE(SUM(amount), 0)
      FROM withdrawal w
      WHERE (w.addr_id = address_id)
    )
  )::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM 
  active_delegators
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN did
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN did
  END ASC
