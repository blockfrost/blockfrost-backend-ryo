-- Params:
--   $1 = order ('asc' | 'desc')
--   $2 = order_by ('amount' | NULL — default ordering is by dh.id)
WITH queried_epoch AS (
  SELECT
    no AS "epoch_no",
    drep_activity
  FROM epoch e
  JOIN epoch_param ep ON (ep.epoch_no = e.no)
  ORDER BY e.no DESC
  LIMIT 1
),
dr_agg AS (
  SELECT
    dh.id AS drep_hash_id,
    MAX(CASE WHEN dr.deposit > 0 THEN dr.tx_id END) AS last_pos_tx_id,
    MAX(CASE WHEN dr.deposit < 0 THEN dr.tx_id END) AS last_neg_tx_id,
    MAX(dr.tx_id) AS last_reg_tx_id
  FROM drep_hash dh
    JOIN drep_registration dr ON dr.drep_hash_id = dh.id
  GROUP BY dh.id
),
vp_agg AS (
  SELECT
    vp.drep_voter AS drep_hash_id,
    MAX(vp.tx_id) AS last_vote_tx_id
  FROM voting_procedure vp
  WHERE vp.drep_voter IS NOT NULL
  GROUP BY vp.drep_voter
),
calculated AS (
  SELECT
    dh.id AS drep_hash_id,
    CASE
      WHEN COALESCE(da.last_pos_tx_id, 1) > COALESCE(da.last_neg_tx_id, -1) THEN TRUE
      ELSE FALSE
    END AS registered,
    GREATEST(da.last_reg_tx_id, va.last_vote_tx_id) AS last_active_tx_id
  FROM drep_hash dh
    LEFT JOIN dr_agg da ON da.drep_hash_id = dh.id
    LEFT JOIN vp_agg va ON va.drep_hash_id = dh.id
)
SELECT
  dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  dh.has_script AS "has_script",
  COALESCE(dd.amount, 0)::TEXT AS "amount",
  NOT c.registered AS "retired",
  CASE
    WHEN c.registered = TRUE AND (
      (SELECT epoch_no FROM queried_epoch) - b.epoch_no
    ) > (SELECT drep_activity FROM queried_epoch) THEN TRUE
    ELSE FALSE
  END AS "expired",
  b.epoch_no AS "last_active_epoch",
  va.url AS "metadata_url",
  encode(va.data_hash, 'hex') AS "metadata_hash",
  ocvd.json AS "metadata_json",
  ocvd.bytes::TEXT AS "metadata_bytes",
  CASE
    WHEN ocvd.id IS NULL THEN ocvfe.fetch_error
    ELSE NULL
  END AS "metadata_fetch_error"
FROM drep_hash dh
  LEFT JOIN calculated c ON c.drep_hash_id = dh.id
  LEFT JOIN tx ON tx.id = c.last_active_tx_id
  LEFT JOIN block b ON b.id = tx.block_id
  LEFT JOIN drep_distr dd ON (
    dd.hash_id = dh.id
    AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
  )
  LEFT JOIN LATERAL (
    SELECT dr.voting_anchor_id
    FROM drep_registration dr
    WHERE dr.drep_hash_id = dh.id
      AND dr.voting_anchor_id IS NOT NULL
    ORDER BY (dr.tx_id, dr.cert_index) DESC
    LIMIT 1
  ) latest_anchor ON TRUE
  LEFT JOIN voting_anchor va ON va.id = latest_anchor.voting_anchor_id
  LEFT JOIN off_chain_vote_data ocvd ON ocvd.voting_anchor_id = va.id
  LEFT JOIN LATERAL (
    SELECT fetch_error
    FROM off_chain_vote_fetch_error
    WHERE voting_anchor_id = va.id
    ORDER BY id DESC
    LIMIT 1
  ) AS ocvfe ON TRUE
ORDER BY
  CASE WHEN LOWER($2) = 'amount' AND LOWER($1) = 'desc' THEN COALESCE(dd.amount, 0) END DESC,
  CASE WHEN LOWER($2) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN COALESCE(dd.amount, 0) END ASC,
  CASE WHEN LOWER($2) <> 'amount' AND LOWER($1) = 'desc' THEN dh.id END DESC,
  CASE WHEN LOWER($2) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN dh.id END ASC,
  CASE WHEN $2 IS NULL AND LOWER($1) = 'desc' THEN dh.id END DESC,
  CASE WHEN $2 IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN dh.id END ASC,
  dh.id ASC
