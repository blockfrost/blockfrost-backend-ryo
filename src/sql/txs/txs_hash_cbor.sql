SELECT encode(tx_cbor.bytes, 'hex') as "cbor"
FROM tx_cbor
  JOIN tx ON tx_cbor.tx_id = tx.id
WHERE encode(tx.hash, 'hex') = $1

