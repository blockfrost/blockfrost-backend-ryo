SELECT encode(b.hash, 'hex') AS "hash"
FROM block b
WHERE b.epoch_no = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN b.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN b.id
  END ASC