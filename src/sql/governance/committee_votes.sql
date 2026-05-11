SELECT encode(tx.hash, 'hex') AS "tx_hash",
  encode(ch.raw, 'hex') AS "voter_hot_hex",
  ch.has_script AS "voter_hot_has_script",
  encode(ptx.hash, 'hex') AS "proposal_tx_hash",
  gap.index AS "proposal_index",
  (
    LOWER(
      regexp_replace(gap.type::TEXT, '(?<=.{1})([A-Z])', '_\1', 'g')
    )
  ) AS "governance_type",
  LOWER(vp.vote::TEXT) AS "vote",
  va.url AS "metadata_url",
  encode(va.data_hash, 'hex') AS "metadata_hash",
  b.block_no AS "block_height",
  EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
FROM voting_procedure vp
  JOIN committee_hash ch ON (ch.id = vp.committee_voter)
  JOIN tx ON (tx.id = vp.tx_id)
  JOIN block b ON (b.id = tx.block_id)
  JOIN gov_action_proposal gap ON (gap.id = vp.gov_action_proposal_id)
  JOIN tx AS ptx ON (ptx.id = gap.tx_id)
  LEFT JOIN voting_anchor va ON (va.id = vp.voting_anchor_id)
WHERE vp.committee_voter IS NOT NULL
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN vp.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN vp.id
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
