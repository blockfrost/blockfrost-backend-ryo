WITH proposal_votes AS (
  SELECT vp.id,
    vp.tx_id,
    vp.index,
    vp.voter_role,
    vp.drep_voter,
    vp.pool_voter,
    vp.committee_voter,
    vp.vote,
    -- Epoch in which the proposal left the active set; its vote tally is frozen
    -- from that point on
    LEAST(
      gap.ratified_epoch,
      gap.enacted_epoch,
      gap.dropped_epoch,
      gap.expired_epoch
    ) AS closed_epoch,
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
  WHERE encode(gap_tx.hash, 'hex') = $4
    AND gap.index = $5
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
      -- deregistration drops the DRep's votes from the ledger and re-registering
      -- does not restore them, but only while the proposal is still live:
      -- once it closes the tally is frozen and later deregistrations have no effect
      OR NOT EXISTS (
        SELECT 1
        FROM drep_registration dr
          JOIN tx dr_tx ON (dr_tx.id = dr.tx_id)
          JOIN block dr_b ON (dr_b.id = dr_tx.block_id)
        WHERE dr.drep_hash_id = p.drep_voter
          AND dr.deposit < 0
          AND dr.tx_id > p.tx_id
          AND (
            p.closed_epoch IS NULL
            OR dr_b.epoch_no < p.closed_epoch
          )
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
