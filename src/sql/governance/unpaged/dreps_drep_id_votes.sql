SELECT encode(tx.hash, 'hex') AS "tx_hash",
  vp.index AS "cert_index",
  LOWER(vote::TEXT) AS "vote" -- Yes, No, Abstain -> yes,no,abstain
FROM voting_procedure vp
  JOIN drep_hash dh ON (vp.drep_voter = dh.id)
  JOIN tx ON (vp.tx_id = tx.id)
WHERE dh.view = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN vp.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN vp.id
  END ASC