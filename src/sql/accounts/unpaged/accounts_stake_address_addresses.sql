SELECT txo.address
FROM (
    SELECT tx_out.address "address",
      min(tx_out.id) AS "id"
    FROM tx_out
      JOIN stake_address sa ON (tx_out.stake_address_id = sa.id)
    WHERE sa.view = $2
    GROUP BY tx_out.address
  ) AS txo_temp
  JOIN tx_out txo ON (
    txo.address = txo_temp.address
    AND txo.id = txo_temp.id
  )
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN txo.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN txo.id
  END ASC