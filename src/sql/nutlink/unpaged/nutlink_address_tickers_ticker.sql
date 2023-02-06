SELECT encode(tx.hash, 'hex') AS "tx_hash",
  b.block_no AS "block_height",
  tx.block_index AS "tx_index",
  (txm.json->$4) AS "payload"
FROM tx_out txo
  JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
  JOIN tx ON (tx.id = txm.tx_id)
  JOIN block b ON (b.id = tx.block_id)
WHERE (
    CASE
      WHEN $3::BYTEA IS NOT NULL THEN txo.payment_cred = $3
      ELSE txo.address = $2
    END
  )
  AND txm.key = 1968
  AND (txm.json->$4) IS NOT NULL
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN txm.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN txm.id
  END ASC