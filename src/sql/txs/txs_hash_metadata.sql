SELECT txm.key AS "label",
  txm.json AS "json_metadata"
FROM tx_metadata txm
  JOIN tx ON (tx.id = txm.tx_id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY txm.key ASC