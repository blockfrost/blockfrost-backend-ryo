SELECT encode(s.hash, 'hex') AS "script_hash"
FROM script s
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN s.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN s.id
  END ASC