SELECT 1 AS "result"
FROM tx_out txo
  JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
  JOIN tx ON (tx.id = txm.tx_id)
  JOIN block b ON (b.id = tx.block_id)
WHERE txm.key = 1968
  AND (txm.json->$1) IS NOT NULL
LIMIT 1