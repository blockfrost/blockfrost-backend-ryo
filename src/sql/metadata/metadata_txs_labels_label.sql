WITH queried_key AS (
  SELECT CASE
      WHEN $4 ~ '^[0-9]+$' THEN $4::BIGINT
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
LIMIT CASE
    WHEN $2 >= 1
    AND $2 <= 100 THEN $2
    ELSE 100
  END OFFSET CASE
    WHEN $3 > 1
    AND $3 < 2147483647 THEN ($3 - 1) * (
      CASE
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END
    )
    ELSE 0
  END