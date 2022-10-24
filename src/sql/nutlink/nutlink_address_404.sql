SELECT 1 AS "result"
FROM tx_out txo
  JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
WHERE (
    CASE
      WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
      ELSE txo.address = $1
    END
  )
  AND txm.key = 1967
LIMIT 1