-- Filtered + paged variant of /governance/dreps.
-- Used when ?retired or ?expired query params are present.
-- Performs full-table aggregation (required to evaluate the filter for every DRep before
-- pagination) but uses Option B: compute the tx_id "expiry threshold" once and compare against it,
-- avoiding per-row tx -> block lookups.
--
-- Params:
--   $1 = order ('asc' | 'desc')
--   $2 = count (1-100)
--   $3 = page (1-based)
--   $4 = order_by ('amount' | NULL)
--   $5 = retired filter ('true' | 'false' | NULL)
--   $6 = expired filter ('true' | 'false' | NULL)
WITH queried_epoch AS (
  SELECT
    no AS "epoch_no",
    drep_activity
  FROM epoch e
  JOIN epoch_param ep ON (ep.epoch_no = e.no)
  ORDER BY e.no DESC
  LIMIT 1
),
-- Highest tx_id known to belong to a block in the (current_epoch - drep_activity) epoch.
-- A DRep is "expired" when its latest activity tx_id <= this threshold.
--
-- This must be expressed as a JOIN, NOT as a nested `MAX(b.id) WHERE epoch_no = ...`.
-- With the nested-aggregate form, Postgres applies a MAX-to-LIMIT rewrite and walks
-- block_pkey backward filtering on epoch_no — on mainnet that scans 400k+ blocks (~700ms).
-- The JOIN form prevents that rewrite, forcing the planner to use idx_block_epoch_no to
-- locate the ~21k blocks of the target epoch, then aggregate tx.id over them.
--
-- Edge case: if the boundary epoch has zero blocks (only possible in degenerate test
-- environments — mainnet has blocks in every epoch), MAX(tx.id) returns NULL. We COALESCE
-- to 0 because `tx.id <= NULL` is NULL (three-valued logic), which would propagate to the
-- `expired` predicate and make BOTH `expired=true` and `expired=false` filters drop every
-- row. With threshold = 0, no real tx_id can satisfy `<= 0`, so `expired` is FALSE for
-- everyone — the "fails open" semantics we actually want.
expiry_threshold AS (
  SELECT COALESCE(MAX(tx.id), 0) AS threshold_tx_id
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
-- Apply filters before pagination so each page returns up to $2 *matching* rows.
filtered AS (
  SELECT
    dh.id,
    dh.view,
    dh.raw,
    dh.has_script,
    c.registered,
    c.last_active_tx_id,
    -- expired is registered AND last_active_tx_id <= expiry_threshold.threshold_tx_id
    (
      c.registered = TRUE
      AND c.last_active_tx_id IS NOT NULL
      AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
    ) AS expired,
    COALESCE(dd.amount, 0) AS amount_sort_key
  FROM drep_hash dh
    LEFT JOIN calculated c ON c.drep_hash_id = dh.id
    LEFT JOIN drep_distr dd ON (
      LOWER($4) = 'amount'
      AND dd.hash_id = dh.id
      AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
    )
  WHERE
    -- retired filter ('true' -> NOT registered; 'false' -> registered; NULL -> no filter)
    (
      $5 IS NULL
      OR (LOWER($5) = 'true' AND c.registered = FALSE)
      OR (LOWER($5) = 'false' AND c.registered = TRUE)
    )
    AND
    -- expired filter
    (
      $6 IS NULL
      OR (
        LOWER($6) = 'true'
        AND c.registered = TRUE
        AND c.last_active_tx_id IS NOT NULL
        AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
      )
      OR (
        LOWER($6) = 'false'
        AND NOT (
          c.registered = TRUE
          AND c.last_active_tx_id IS NOT NULL
          AND c.last_active_tx_id <= (SELECT threshold_tx_id FROM expiry_threshold)
        )
      )
    )
),
paged AS (
  SELECT *
  FROM filtered f
  ORDER BY
    CASE WHEN LOWER($4) = 'amount' AND LOWER($1) = 'desc' THEN f.amount_sort_key END DESC,
    CASE WHEN LOWER($4) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.amount_sort_key END ASC,
    CASE WHEN LOWER($4) <> 'amount' AND LOWER($1) = 'desc' THEN f.id END DESC,
    CASE WHEN LOWER($4) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.id END ASC,
    CASE WHEN $4 IS NULL AND LOWER($1) = 'desc' THEN f.id END DESC,
    CASE WHEN $4 IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN f.id END ASC,
    f.id ASC
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
)
SELECT
  p.view AS "drep_id",
  encode(p.raw, 'hex') AS "hex",
  p.has_script AS "has_script",
  COALESCE(dd.amount, 0)::TEXT AS "amount",
  NOT p.registered AS "retired",
  p.expired AS "expired",
  -- Resolve precise last_active_epoch (block.epoch_no) only for surviving page rows.
  b.epoch_no AS "last_active_epoch",
  va.url AS "metadata_url",
  encode(va.data_hash, 'hex') AS "metadata_hash",
  ocvd.json AS "metadata_json",
  ocvd.bytes::TEXT AS "metadata_bytes",
  CASE
    WHEN ocvd.id IS NULL THEN ocvfe.fetch_error
    ELSE NULL
  END AS "metadata_fetch_error"
FROM paged p
  LEFT JOIN tx ON tx.id = p.last_active_tx_id
  LEFT JOIN block b ON b.id = tx.block_id
  LEFT JOIN drep_distr dd ON (
    dd.hash_id = p.id
    AND dd.epoch_no = (SELECT epoch_no FROM queried_epoch)
  )
  LEFT JOIN LATERAL (
    SELECT dr.voting_anchor_id
    FROM drep_registration dr
    WHERE dr.drep_hash_id = p.id
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
  CASE WHEN LOWER($4) = 'amount' AND LOWER($1) = 'desc' THEN p.amount_sort_key END DESC,
  CASE WHEN LOWER($4) = 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN p.amount_sort_key END ASC,
  CASE WHEN LOWER($4) <> 'amount' AND LOWER($1) = 'desc' THEN p.id END DESC,
  CASE WHEN LOWER($4) <> 'amount' AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN p.id END ASC,
  CASE WHEN $4 IS NULL AND LOWER($1) = 'desc' THEN p.id END DESC,
  CASE WHEN $4 IS NULL AND (LOWER($1) <> 'desc' OR $1 IS NULL) THEN p.id END ASC,
  p.id ASC
