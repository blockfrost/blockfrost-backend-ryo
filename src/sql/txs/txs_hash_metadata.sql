SELECT key AS "label",
  json AS "json_metadata"
FROM tx_metadata txm
  JOIN tx ON (tx.id = txm.tx_id)
WHERE encode(tx.hash, 'hex') = $1