SELECT txo.address AS "address",
  SUM(quantity)::TEXT AS "quantity" -- cast to TEXT to avoid number overflow
FROM ma_tx_out mto
  JOIN multi_asset ma ON (mto.ident = ma.id)
  JOIN tx_out txo ON (txo.id = mto.tx_out_id)
  JOIN tx ON (tx.id = txo.tx_id)
  LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
  AND (txo.index = txi.tx_out_index)
WHERE txi IS NULL
  AND (encode(policy, 'hex') || encode(name, 'hex')) = $4 -- don't count utxos that are part of transaction that failed script validation at stage 2
  AND tx.valid_contract = 'true'
GROUP BY txo.address
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN MIN(tx.id)
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN MIN(tx.id)
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