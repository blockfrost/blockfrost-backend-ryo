WITH drep AS (
  SELECT id
  FROM drep_hash dh
  WHERE (
      ($4::bytea IS NOT NULL AND dh.raw = $4) OR
      ($4 IS NULL AND dh.view = $5)
    )
    AND dh.has_script = $6
  LIMIT 1
),
paged_votes AS (
  -- Pagination is pushed before the joins to tx / gov_action_proposal / proposal_tx,
  -- so they fire only for the page we return, not for every vote by this DRep.
  SELECT vp.id, vp.tx_id, vp.gov_action_proposal_id, vp.index AS cert_index, vp.vote
  FROM voting_procedure vp
  WHERE vp.drep_voter = (SELECT id FROM drep)
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
)
SELECT encode(tx.hash, 'hex') AS "tx_hash",
  p.cert_index AS "cert_index",
  encode(proposal_tx.hash, 'hex') AS "proposal_tx_hash",
  gap.index AS "proposal_cert_index",
  LOWER(p.vote::TEXT) AS "vote"
FROM paged_votes p
  JOIN tx ON (p.tx_id = tx.id)
  JOIN gov_action_proposal gap ON (p.gov_action_proposal_id = gap.id)
  JOIN tx AS proposal_tx ON (gap.tx_id = proposal_tx.id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN p.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN p.id
  END ASC
