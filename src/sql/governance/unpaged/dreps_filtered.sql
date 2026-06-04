-- Filtered + unpaged variant of /governance/dreps.
-- Params:
--   $1 = order ('asc' | 'desc')
--   $2 = order_by ('amount' | NULL)
--   $3 = retired filter ('true' | 'false' | NULL)
--   $4 = expired filter ('true' | 'false' | NULL)
WITH queried_epoch AS (
  SELECT
    no AS "epoch_no",
    drep_activity
  FROM epoch e
  JOIN epoch_param ep ON (ep.epoch_no = e.no)
  ORDER BY e.no DESC
  LIMIT 1
),
-- See dreps_filtered.sql for the explanation of why this MUST be a JOIN, not a nested MAX.
expiry_threshold AS (
  SELECT MAX(tx.id) AS threshold_tx_id
  FROM tx
  JOIN block b ON b.id = tx.block_id
  WHERE (b.epoch_no)::integer = (
    SELECT (epoch_no)::integer - (drep_activity)::integer
    FROM queried_epoch
  )
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
),
filtered AS (
  SELECT
    dh.id,
    dh.view,
    dh.raw,
    dh.has_script,
    c.registered,
    c.last_active_tx_id,
    (
      c.registered = TRUE
      AND c.last_active_tx_id IS NOT NULL
      AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
    ) AS expired,
    COALESCE(dd.amount, 0) AS amount_sort_key
  FROM drep_hash dh
    LEFT JOIN calculated c ON c.drep_hash_id = dh.id
    LEFT JOIN drep_distr dd ON (
      LOWER($2) = 'amount'
      AND dd.hash_id = dh.id
      AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
    )
  WHERE
    (
      $3 IS NULL
      OR (LOWER($3) = 'true' AND c.registered = FALSE)
      OR (LOWER($3) = 'false' AND c.registered = TRUE)
    )
    AND
    (
      $4 IS NULL
      OR (
        LOWER($4) = 'true'
        AND c.registered = TRUE
        AND c.last_active_tx_id IS NOT NULL
        AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
      )
      OR (
        LOWER($4) = 'false'
        AND NOT (
          c.registered = TRUE
          AND c.last_active_tx_id IS NOT NULL
          AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
        )
      )
    )
)
SELECT
  f.view AS "drep_id",
  encode(f.raw, 'hex') AS "hex",
  f.has_script AS "has_script",
  COALESCE(dd.amount, 0)::TEXT AS "amount",
  NOT f.registered AS "retired",
  f.expired AS "expired",
  b.epoch_no AS "last_active_epoch",
  va.url AS "metadata_url",
  encode(va.data_hash, 'hex') AS "metadata_hash",
  ocvd.json AS "metadata_json",
  ocvd.bytes::TEXT AS "metadata_bytes",
  CASE
    WHEN ocvd.id IS NULL THEN ocvfe.fetch_error
    ELSE NULL
  END AS "metadata_fetch_error"
FROM filtered f
  LEFT JOIN tx ON tx.id = f.last_active_tx_id
  LEFT JOIN block b ON b.id = tx.block_id
  LEFT JOIN drep_distr dd ON (
    dd.hash_id = f.id
    AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
  )
  LEFT JOIN LATERAL (
    SELECT dr.voting_anchor_id
    FROM drep_registration dr
    WHERE dr.drep_hash_id = f.id
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
  CASE WHEN LOWER($2) = 'amount' AND LOWER($1) = 'desc' THEN f.amount_sort_key END DESC,
  CASE WHEN LOWER($2) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.amount_sort_key END ASC,
  CASE WHEN LOWER($2) <> 'amount' AND LOWER($1) = 'desc' THEN f.id END DESC,
  CASE WHEN LOWER($2) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.id END ASC,
  CASE WHEN $2 IS NULL AND LOWER($1) = 'desc' THEN f.id END DESC,
  CASE WHEN $2 IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.id END ASC,
  f.id ASC
