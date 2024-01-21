SELECT encode(tx.hash, 'hex') AS "tx_hash",
  vp.index AS "cert_index",
  LOWER(vote::TEXT) AS "vote" -- Yes, No, Abstain -> yes,no,abstain
FROM voting_procedure vp
  JOIN pool_hash ph ON (vp.pool_voter = ph.id)
  JOIN tx ON (vp.tx_id = tx.id)
WHERE ph.view = $4
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