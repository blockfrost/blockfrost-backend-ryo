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
)
SELECT txo.address
FROM tx_out txo
JOIN picked p ON p.id = txo.id
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN txo.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN txo.id
  END ASC