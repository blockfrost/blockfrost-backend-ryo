SELECT encode(tx.hash, 'hex') AS "hash"
FROM tx
WHERE CASE
    WHEN $1 ~ '^[0-9]+$' THEN block_id = (
      SELECT id
      FROM block
      WHERE block_no = $1::INTEGER
    )
    ELSE block_id = (
      SELECT id
      FROM block
      WHERE encode(hash, 'hex') = $1
    )
  END
ORDER BY CASE
    WHEN LOWER($2) = 'desc' THEN tx.block_index
  END DESC,
  CASE
    WHEN LOWER($2) <> 'desc'
    OR $2 IS NULL THEN tx.block_index
  END ASC