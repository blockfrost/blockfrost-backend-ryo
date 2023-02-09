SELECT encode(b.hash, 'hex') AS "block"
FROM block b
  JOIN slot_leader sl ON (b.slot_leader_id = sl.id)
  JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
WHERE ph.view = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN b.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN b.id
  END ASC