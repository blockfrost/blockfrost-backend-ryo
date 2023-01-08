SELECT encode(tx.hash, 'hex') AS "hash"
FROM tx
WHERE block_id = (
    SELECT id
    FROM block
    ORDER BY id DESC
    LIMIT 1
  )
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.block_index
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.block_index
  END ASC