SELECT encode(tx.hash, 'hex') AS "tx_hash",
  gap.index AS "cert_index",
  (
    LOWER(
      regexp_replace(type::TEXT, '(?<=.{1})([A-Z])', '_\1', 'g')
    )
  ) AS "governance_type" -- type HardForkInitiation, NewCommittee, NewConstitution, InfoAction, NoConfidence, ParameterChange, TreasuryWithdrawals
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN gap.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN gap.id
  END ASC