SELECT 1 AS "result"
FROM tx_out txo
  JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
WHERE (
    txo.address = $1
    OR txo.payment_cred = $2
  )
  AND txm.key = 1967
LIMIT 1