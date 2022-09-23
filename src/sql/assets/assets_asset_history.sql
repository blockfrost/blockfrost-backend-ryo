SELECT encode(tx.hash, 'hex') AS "tx_hash",
  quantity::TEXT AS "amount", -- cast to TEXT to avoid number overflow
  CASE
    WHEN quantity < 0 THEN 'burned'
    ELSE 'minted'
  END AS "action"
FROM ma_tx_mint mtm
  JOIN multi_asset ma ON (mtm.ident = ma.id)
  JOIN tx ON (tx.id = mtm.tx_id)
WHERE (encode(policy, 'hex') || encode(name, 'hex')) = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.id
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