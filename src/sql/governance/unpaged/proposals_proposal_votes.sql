SELECT encode(vp_tx.hash, 'hex') AS "tx_hash",
  vp.index AS "cert_index",
  (
    CASE
      WHEN vp.voter_role::TEXT = 'ConstitutionalCommittee' THEN 'constitutional_committee'
      ELSE LOWER(vp.voter_role::TEXT)
    END
  ) AS "voter_role",
  -- ConstitutionalCommittee, DRep, SPO -> constitutional_committee, drep, spo
  (
    COALESCE(encode(ch.raw, 'hex'), dh.view, ph.view)
  ) AS "voter",
  dh.has_script AS "voter_has_script",
  LOWER(vote::TEXT) AS "vote" -- Yes, No, Abstain -> yes,no,abstain
FROM gov_action_proposal gap
  JOIN tx gap_tx ON (gap_tx.id = gap.tx_id)
  JOIN voting_procedure vp ON (vp.gov_action_proposal_id = gap.id)
  JOIN tx vp_tx ON (vp_tx.id = vp.tx_id)
  LEFT JOIN drep_hash dh ON (vp.drep_voter = dh.id)
  LEFT JOIN pool_hash ph ON (vp.pool_voter = ph.id)
  LEFT JOIN committee_hash ch ON (vp.committee_voter = ch.id)
WHERE encode(gap_tx.hash, 'hex') = $2
  AND gap.index = $3
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN vp.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN vp.id
  END ASC
