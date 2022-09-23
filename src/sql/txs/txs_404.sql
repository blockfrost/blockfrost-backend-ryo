SELECT 1 AS "result"
FROM tx
WHERE encode(tx.hash, 'hex') = $1