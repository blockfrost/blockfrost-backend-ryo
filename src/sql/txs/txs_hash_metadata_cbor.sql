SELECT key AS "label",
  bytes::TEXT AS "cbor_metadata",
  encode(bytes, 'hex') AS "metadata"
FROM tx_metadata txm
  JOIN tx ON (tx.id = txm.tx_id)
WHERE encode(tx.hash, 'hex') = $1