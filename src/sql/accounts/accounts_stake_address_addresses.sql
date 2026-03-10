WITH sa AS (
  SELECT id
  FROM stake_address
  WHERE view = $4
),
picked AS (
  SELECT DISTINCT ON (payment_cred, address_has_script)
    id
  FROM tx_out
  WHERE stake_address_id = (SELECT id FROM sa)
  ORDER BY payment_cred, address_has_script, id
),
page_args AS (
  SELECT
    CASE
      WHEN $2 >= 1 AND $2 <= 100 THEN $2
      ELSE 100
    END AS lim,
    CASE
      WHEN $3 > 1 AND $3 < 2147483647 THEN ($3 - 1) * (
        CASE
          WHEN $2 >= 1 AND $2 <= 100 THEN $2
          ELSE 100
        END
      )
      ELSE 0
    END AS off
),
page_ids AS (
  SELECT p.id
  FROM picked p
  CROSS JOIN page_args a
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN p.id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN p.id
    END ASC
  LIMIT (SELECT lim FROM page_args)
  OFFSET (SELECT off FROM page_args)
)
SELECT txo.address
FROM page_ids p
JOIN tx_out txo ON txo.id = p.id
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN txo.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN txo.id
  END ASC;