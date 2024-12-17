SELECT dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  dh.has_script AS "has_script"
FROM drep_hash dh
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN dh.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN dh.id
  END ASC