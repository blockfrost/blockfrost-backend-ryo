SELECT asset AS "asset",
  quantity::TEXT AS "quantity" -- cast to TEXT to avoid number overflow
FROM (
    SELECT MIN(mtm.id),
      CONCAT(encode(ma.policy, 'hex'), encode(ma.name, 'hex')) AS "asset",
      SUM(quantity) AS "quantity"
    FROM ma_tx_mint mtm
      JOIN multi_asset ma ON (mtm.ident = ma.id)
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