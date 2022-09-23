SELECT 1 AS "result"
FROM ma_tx_mint mtm
  JOIN multi_asset ma ON (mtm.ident = ma.id)
WHERE encode(policy, 'hex') = $1
LIMIT 1