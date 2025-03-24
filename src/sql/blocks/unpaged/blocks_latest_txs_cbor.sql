SELECT 
    encode(tx.hash, 'hex') AS tx_hash,
    encode(tx_cbor.bytes, 'hex') AS cbor
FROM tx
JOIN tx_cbor ON tx.id = tx_cbor.tx_id
WHERE tx.block_id = (
    SELECT id
    FROM block
    ORDER BY id DESC
    LIMIT 1
)
ORDER BY 
    CASE WHEN LOWER($1) = 'desc' THEN tx.block_index END DESC,
    CASE WHEN LOWER($1) <> 'desc' OR $1 IS NULL THEN tx.block_index END ASC;