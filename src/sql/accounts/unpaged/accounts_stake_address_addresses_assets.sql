SELECT unit,
  quantity::TEXT -- cast to TEXT to avoid number overflow
FROM(
    SELECT CONCAT(encode(ma.policy, 'hex'), encode(ma.name, 'hex')) AS "unit",
      SUM(quantity) AS "quantity"
    FROM tx_out txo
      JOIN tx ON (tx.id = txo.tx_id)
      JOIN stake_address sa ON (sa.id = txo.stake_address_id)
      LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
      AND (txo.index = txi.tx_out_index)
      JOIN ma_tx_out mto ON (mto.tx_out_id = txo.id)
      JOIN multi_asset ma ON (mto.ident = ma.id)
    WHERE txi IS NULL
      AND sa.view = $2
      AND tx.valid_contract = 'true' -- don't count utxos that are part of transaction that failed script validation at stage 2
    GROUP BY ma.policy,
      ma.name
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN MAX(txo.id)
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN MIN(txo.id)
      END ASC,
      (ma.policy, ma.name) ASC
  ) AS "ordered_assets"