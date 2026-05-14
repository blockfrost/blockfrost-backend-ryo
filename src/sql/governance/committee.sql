WITH current_committee AS (
  -- The last-seated committee. db-sync inserts a `committee` row for every NewCommittee
  -- proposal (including expired/dropped ones), so we must filter to enacted actions; only
  -- the Conway-genesis committee row has `gov_action_proposal_id IS NULL`.
  SELECT c.id,
    c.quorum_numerator,
    c.quorum_denominator,
    c.gov_action_proposal_id
  FROM committee c
    LEFT JOIN gov_action_proposal gap ON (gap.id = c.gov_action_proposal_id)
  WHERE c.gov_action_proposal_id IS NULL
    OR gap.enacted_epoch IS NOT NULL
  ORDER BY COALESCE(gap.enacted_epoch, -1) DESC, c.id DESC
  LIMIT 1
),
proposal_info AS (
  -- The `NewCommittee` action that seated this committee. Empty for the Conway-genesis row.
  SELECT encode(tx.hash, 'hex') AS "proposal_tx_hash",
    gap.index::INTEGER AS "proposal_index"
  FROM gov_action_proposal gap
    JOIN tx ON (tx.id = gap.tx_id)
  WHERE gap.id = (SELECT gov_action_proposal_id FROM current_committee)
),
members AS (
  SELECT encode(ch.raw, 'hex') AS "cc_cold_hex",
    ch.has_script AS "cc_cold_has_script",
    cm.expiration_epoch AS "expiration_epoch",
    latest_reg.tx_id AS "latest_reg_tx_id",
    latest_reg.cert_index AS "latest_reg_cert_index",
    latest_reg.hot_raw AS "hot_raw",
    latest_reg.hot_has_script AS "hot_has_script",
    latest_dereg.tx_id AS "latest_dereg_tx_id",
    latest_dereg.cert_index AS "latest_dereg_cert_index"
  FROM committee_member cm
    JOIN committee_hash ch ON (ch.id = cm.committee_hash_id)
    LEFT JOIN LATERAL (
      SELECT cr.tx_id,
        cr.cert_index,
        ch_hot.raw AS "hot_raw",
        ch_hot.has_script AS "hot_has_script"
      FROM committee_registration cr
        JOIN committee_hash ch_hot ON (ch_hot.id = cr.hot_key_id)
      WHERE cr.cold_key_id = cm.committee_hash_id
      ORDER BY cr.tx_id DESC, cr.cert_index DESC
      LIMIT 1
    ) latest_reg ON TRUE
    LEFT JOIN LATERAL (
      SELECT cdr.tx_id, cdr.cert_index
      FROM committee_de_registration cdr
      WHERE cdr.cold_key_id = cm.committee_hash_id
      ORDER BY cdr.tx_id DESC, cdr.cert_index DESC
      LIMIT 1
    ) latest_dereg ON TRUE
  WHERE cm.committee_id = (SELECT id FROM current_committee)
)
SELECT (SELECT proposal_tx_hash FROM proposal_info) AS "proposal_tx_hash",
  (SELECT proposal_index FROM proposal_info) AS "proposal_index",
  -- db-sync nulls epoch_state.committee_id after a NoConfidence enactment.
  COALESCE(
    (
      SELECT es.committee_id IS NULL
      FROM epoch_state es
      ORDER BY es.epoch_no DESC
      LIMIT 1
    ),
    FALSE
  ) AS "is_dissolved",
  (
    SELECT jsonb_build_object(
      'numerator', cc.quorum_numerator::INTEGER,
      'denominator', cc.quorum_denominator::INTEGER
    )
    FROM current_committee cc
  ) AS "quorum",
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'cc_cold_hex', m.cc_cold_hex,
          'cc_cold_has_script', m.cc_cold_has_script,
          'cc_hot_hex',
            CASE
              WHEN m.latest_reg_tx_id IS NOT NULL
                AND (
                  m.latest_dereg_tx_id IS NULL
                  OR (m.latest_reg_tx_id, m.latest_reg_cert_index)
                     > (m.latest_dereg_tx_id, m.latest_dereg_cert_index)
                )
              THEN encode(m.hot_raw, 'hex')
              ELSE NULL
            END,
          'cc_hot_has_script',
            CASE
              WHEN m.latest_reg_tx_id IS NOT NULL
                AND (
                  m.latest_dereg_tx_id IS NULL
                  OR (m.latest_reg_tx_id, m.latest_reg_cert_index)
                     > (m.latest_dereg_tx_id, m.latest_dereg_cert_index)
                )
              THEN m.hot_has_script
              ELSE NULL
            END,
          'status',
            CASE
              WHEN m.latest_reg_tx_id IS NULL THEN 'not_authorized'
              WHEN m.latest_dereg_tx_id IS NULL THEN 'authorized'
              WHEN (m.latest_reg_tx_id, m.latest_reg_cert_index)
                   > (m.latest_dereg_tx_id, m.latest_dereg_cert_index)
                THEN 'authorized'
              ELSE 'resigned'
            END,
          'expiration_epoch', m.expiration_epoch
        )
        ORDER BY m.cc_cold_hex
      )
      FROM members m
    ),
    '[]'::jsonb
  ) AS "members"
