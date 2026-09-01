WITH proposal_votes AS (
  SELECT vp.id,
    vp.tx_id,
    vp.index,
    vp.voter_role,
    vp.drep_voter,
    vp.pool_voter,
    vp.committee_voter,
    vp.vote,
    -- The ledger keeps only the latest vote per voter and proposal (upsert semantics)
    ROW_NUMBER() OVER (
      PARTITION BY vp.voter_role,
      vp.drep_voter,
      vp.pool_voter,
      vp.committee_voter
      ORDER BY vp.tx_id DESC,
        vp.id DESC
    ) AS recency_rank
  FROM gov_action_proposal gap
    JOIN tx gap_tx ON (gap_tx.id = gap.tx_id)
    JOIN voting_procedure vp ON (vp.gov_action_proposal_id = gap.id)
  WHERE encode(gap_tx.hash, 'hex') = $2
    AND gap.index = $3
)
SELECT encode(vp_tx.hash, 'hex') AS "tx_hash",
  p.index AS "cert_index",
  (
    CASE
      WHEN p.voter_role::TEXT = 'ConstitutionalCommittee' THEN 'constitutional_committee'
      ELSE LOWER(p.voter_role::TEXT)
    END
  ) AS "voter_role",
  -- ConstitutionalCommittee, DRep, SPO -> constitutional_committee, drep, spo
  (
    COALESCE(encode(ch.raw, 'hex'), dh.view, ph.view)
  ) AS "voter",
  dh.has_script AS "voter_has_script",
  ch.has_script AS "cc_voter_has_script",
  LOWER(p.vote::TEXT) AS "vote",
  -- Yes, No, Abstain -> yes,no,abstain
  (
    p.recency_rank = 1
    AND (
      p.drep_voter IS NULL
      -- deregistration drops the DRep's votes from the ledger;
      -- re-registering does not restore them
      OR NOT EXISTS (
        SELECT 1
        FROM drep_registration dr
        WHERE dr.drep_hash_id = p.drep_voter
          AND dr.deposit < 0
          AND dr.tx_id > p.tx_id
      )
    )
  ) AS "counted"
FROM proposal_votes p
  JOIN tx vp_tx ON (vp_tx.id = p.tx_id)
  LEFT JOIN drep_hash dh ON (p.drep_voter = dh.id)
  LEFT JOIN pool_hash ph ON (p.pool_voter = ph.id)
  LEFT JOIN committee_hash ch ON (p.committee_voter = ch.id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN p.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN p.id
  END ASC
