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