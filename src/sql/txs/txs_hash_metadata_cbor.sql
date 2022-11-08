SELECT txm.key AS "label",
  txm.bytes::TEXT AS "cbor_metadata",
  encode(txm.bytes, 'hex') AS "metadata"
FROM tx_metadata txm
  JOIN tx ON (tx.id = txm.tx_id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY txm.key ASC