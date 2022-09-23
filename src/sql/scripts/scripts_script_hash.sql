SELECT encode(s.hash, 'hex') AS "script_hash",
  s.type AS "type",
  s.serialised_size AS "serialised_size"
FROM script s
WHERE encode(s.hash, 'hex') = $1