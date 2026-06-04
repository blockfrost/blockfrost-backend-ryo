-- Params:
--   $1 = order ('asc' | 'desc')
--   $2 = count (page size, 1-100)
--   $3 = page (1-based page number)
--   $4 = order_by ('amount' | NULL — default ordering is by dh.id)
WITH queried_epoch AS (
  SELECT
    no AS "epoch_no",
    drep_activity
  FROM epoch e
  JOIN epoch_param ep ON (ep.epoch_no = e.no)
  ORDER BY e.no DESC
  LIMIT 1
),
-- Page selection happens here. When order_by='amount' we left-join drep_distr so the sort key
-- is available. Otherwise drep_distr stays unjoined and pagination is cheap (index scan on PK).
paged_dreps AS (
  SELECT
    dh.id,
    dh.view,
    dh.raw,
    dh.has_script
  FROM drep_hash dh
    LEFT JOIN drep_distr pd_dd ON (
      LOWER($4::text) = 'amount'
      AND pd_dd.hash_id = dh.id
      AND pd_dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
    )
  ORDER BY
    CASE WHEN LOWER($4::text) = 'amount' AND LOWER($1) = 'desc' THEN COALESCE(pd_dd.amount, 0) END DESC,
    CASE WHEN LOWER($4::text) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN COALESCE(pd_dd.amount, 0) END ASC,
    CASE WHEN LOWER($4::text) <> 'amount' AND LOWER($1) = 'desc' THEN dh.id END DESC,
    CASE WHEN LOWER($4::text) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN dh.id END ASC,
    CASE WHEN $4::text IS NULL AND LOWER($1) = 'desc' THEN dh.id END DESC,
    CASE WHEN $4::text IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN dh.id END ASC,
    -- Tie-breaker for stable pagination when sorting by amount (many dreps may share amount=0).
    dh.id ASC
  LIMIT CASE
      WHEN $2 >= 1 AND $2 <= 100 THEN $2
      ELSE 100
    END OFFSET CASE
      WHEN $3 > 1 AND $3 < 2147483647 THEN ($3 - 1) * (
        CASE
          WHEN $2 >= 1 AND $2 <= 100 THEN $2
          ELSE 100
        END
      )
      ELSE 0
    END
),
-- Aggregate drep_registration tx_ids per drep on the current page.
-- Deliberately avoids joining tx+block here: doing it per row cost ~300 lookups in the original plan.
dr_agg AS (
  SELECT
    pd.id AS drep_hash_id,
    MAX(CASE WHEN dr.deposit > 0 THEN dr.tx_id END) AS last_pos_tx_id,
    MAX(CASE WHEN dr.deposit < 0 THEN dr.tx_id END) AS last_neg_tx_id,
    MAX(dr.tx_id) AS last_reg_tx_id
  FROM paged_dreps pd
    JOIN drep_registration dr ON dr.drep_hash_id = pd.id
  GROUP BY pd.id
),
vp_agg AS (
  SELECT
    pd.id AS drep_hash_id,
    MAX(vp.tx_id) AS last_vote_tx_id
  FROM paged_dreps pd
    JOIN voting_procedure vp ON vp.drep_voter = pd.id
  GROUP BY pd.id
),
calculated AS (
  SELECT
    pd.id AS drep_hash_id,
    -- Matches the COALESCE(..., 1) / COALESCE(..., -1) semantics of governance_dreps_drep_id so
    -- that special dreps (no drep_registration rows at all) are still treated as registered.
    CASE
      WHEN COALESCE(da.last_pos_tx_id, 1) > COALESCE(da.last_neg_tx_id, -1) THEN TRUE
      ELSE FALSE
    END AS registered,
    -- tx_id is monotonically increasing with block_id, so MAX(tx_id) -> latest epoch.
    GREATEST(da.last_reg_tx_id, va.last_vote_tx_id) AS last_active_tx_id
  FROM paged_dreps pd
    LEFT JOIN dr_agg da ON da.drep_hash_id = pd.id
    LEFT JOIN vp_agg va ON va.drep_hash_id = pd.id
)
SELECT
  pd.view AS "drep_id",
  encode(pd.raw, 'hex') AS "hex",
  pd.has_script AS "has_script",
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
FROM paged_dreps pd
  LEFT JOIN calculated c ON c.drep_hash_id = pd.id
  -- Single tx + block lookup per page row to resolve last_active_tx_id -> last_active_epoch.
  LEFT JOIN tx ON tx.id = c.last_active_tx_id
  LEFT JOIN block b ON b.id = tx.block_id
  LEFT JOIN drep_distr dd ON (
    dd.hash_id = pd.id
    AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
  )
  -- Pick the most recent drep_registration that carries an anchor.
  LEFT JOIN LATERAL (
    SELECT dr.voting_anchor_id
    FROM drep_registration dr
    WHERE dr.drep_hash_id = pd.id
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
  CASE WHEN LOWER($4::text) = 'amount' AND LOWER($1) = 'desc' THEN COALESCE(dd.amount, 0) END DESC,
  CASE WHEN LOWER($4::text) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN COALESCE(dd.amount, 0) END ASC,
  CASE WHEN LOWER($4::text) <> 'amount' AND LOWER($1) = 'desc' THEN pd.id END DESC,
  CASE WHEN LOWER($4::text) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN pd.id END ASC,
  CASE WHEN $4::text IS NULL AND LOWER($1) = 'desc' THEN pd.id END DESC,
  CASE WHEN $4::text IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN pd.id END ASC,
  pd.id ASC
