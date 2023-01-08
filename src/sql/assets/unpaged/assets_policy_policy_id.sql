SELECT asset AS "asset",
  quantity::TEXT AS "quantity" -- cast to TEXT to avoid number overflow
FROM (
    SELECT MIN(mtm.id),
      CONCAT(encode(ma.policy, 'hex'), encode(ma.name, 'hex')) AS "asset",
      SUM(quantity) AS "quantity"
    FROM ma_tx_mint mtm
      JOIN multi_asset ma ON (mtm.ident = ma.id)
    WHERE encode(policy, 'hex') = $2
    GROUP BY policy,
      name
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN MIN(mtm.id)
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN MIN(mtm.id)
      END ASC
  ) AS "ordered assets"