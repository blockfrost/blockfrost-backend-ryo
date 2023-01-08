SELECT encode(b.hash, 'hex') AS "hash"
FROM block b
  JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
  JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
WHERE b.epoch_no = $2
  AND ph.view = $3
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN b.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN b.id
  END ASC