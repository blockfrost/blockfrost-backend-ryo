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
      AND sa.view = $4
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
  ) AS "ordered_assets"