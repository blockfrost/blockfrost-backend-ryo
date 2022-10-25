SELECT encode(tx.hash, 'hex') AS "tx_hash",
  b.block_no AS "block_height",
  tx.block_index AS "tx_index",
  (txm.json->$6) AS "payload"
FROM tx_out txo
  JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
  JOIN tx ON (tx.id = txm.tx_id)
  JOIN block b ON (b.id = tx.block_id)
WHERE (
    CASE
      WHEN $5::BYTEA IS NOT NULL THEN txo.payment_cred = $5
      ELSE txo.address = $4
    END
  )
  AND txm.key = 1968
  AND (txm.json->$6) IS NOT NULL
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN txm.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN txm.id
  END ASC
LIMIT CASE
    WHEN $2 >= 1
    AND $2 <= 100 THEN $2
    ELSE 100
  END OFFSET CASE
    WHEN $3 > 1
    AND $3 < 2147483647 THEN ($3 - 1) * (
      CASE
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END
    )
    ELSE 0
  END