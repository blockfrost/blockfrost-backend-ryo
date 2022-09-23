SELECT encode(s.hash, 'hex') AS "script_hash"
FROM script s
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN s.tx_id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN s.tx_id
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