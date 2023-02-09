SELECT txo.address AS "address",
  SUM(quantity)::TEXT AS "quantity" -- cast to TEXT to avoid number overflow
FROM ma_tx_out mto
  JOIN multi_asset ma ON (mto.ident = ma.id)
  JOIN tx_out txo ON (txo.id = mto.tx_out_id)
  JOIN tx ON (tx.id = txo.tx_id)
  LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
  AND (txo.index = txi.tx_out_index)
WHERE txi IS NULL
  AND (encode(policy, 'hex') || encode(name, 'hex')) = $2 -- don't count utxos that are part of transaction that failed script validation at stage 2
  AND tx.valid_contract = 'true'
GROUP BY txo.address
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN MIN(tx.id)
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN MIN(tx.id)
  END ASC