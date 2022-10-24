(
  SELECT 1 AS "result"
  FROM tx_out txo
  WHERE txo.address = $1
  LIMIT 1
)
UNION
(
  SELECT 1 AS "result"
  FROM tx_out txo
  WHERE txo.payment_cred = $2
  LIMIT 1
)