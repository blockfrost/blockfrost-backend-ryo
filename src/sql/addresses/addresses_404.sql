SELECT 1 AS "result"
FROM tx_out txo
WHERE txo.address = $1
  OR txo.payment_cred = $2
LIMIT 1