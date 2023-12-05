SELECT sa.view AS "stake_address",
  tw.amount::TEXT AS "amount"
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
  JOIN treasury_withdrawal tw ON (gap.id = tw.gov_action_proposal_id)
  JOIN stake_address sa ON (tw.stake_address_id = sa.id)
WHERE encode(tx.hash, 'hex') = $2
  AND gap.index = $3
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tw.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tw.id
  END ASC