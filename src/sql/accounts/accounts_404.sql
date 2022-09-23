SELECT 1 AS "result"
FROM stake_address
WHERE view = $1
LIMIT 1