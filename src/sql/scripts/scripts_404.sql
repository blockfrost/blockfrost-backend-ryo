SELECT 1 AS "result"
FROM script s
WHERE encode(s.hash, 'hex') = $1