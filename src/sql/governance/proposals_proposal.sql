SELECT encode(tx.hash, 'hex') AS "tx_hash",
  gap.index AS "cert_index",
  (
    LOWER(
      regexp_replace(gap.type::TEXT, '(?<=.{1})([A-Z])', '_\1', 'g')
    )
  ) AS "governance_type",
  -- type HardForkInitiation, NewCommittee, NewConstitution, InfoAction, NoConfidence, ParameterChange, TreasuryWithdrawals
  gap.description AS "governance_description",
  gap.deposit::TEXT AS "deposit",
  sa.view AS "return_address",
  gap.ratified_epoch AS "ratified_epoch",
  gap.enacted_epoch AS "enacted_epoch",
  gap.dropped_epoch AS "dropped_epoch",
  gap.expired_epoch AS "expired_epoch",
  gap.expiration AS "expiration"
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
  JOIN stake_address sa ON (gap.return_address = sa.id)
  LEFT JOIN voting_anchor va ON (va.id = gap.voting_anchor_id)
WHERE encode(tx.hash, 'hex') = $1
  AND gap.index = $2