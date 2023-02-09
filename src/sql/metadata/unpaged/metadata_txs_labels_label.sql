WITH queried_key AS (
  SELECT CASE
      WHEN $2 ~ '^[0-9]+$' THEN $2::BIGINT
      ELSE null
    END AS "key"
)
SELECT encode(tx.hash, 'hex') AS "tx_hash",
  json AS "json_metadata"
FROM tx_metadata txm
  JOIN tx ON (tx.id = txm.tx_id)
WHERE KEY = (
    SELECT key
    from queried_key
  )
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.id
  END ASC