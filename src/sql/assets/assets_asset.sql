WITH queried_metadata AS (
  SELECT txm.json AS "onchain_metadata",
    encode(txm.bytes, 'hex') AS "onchain_metadata_cbor"
  FROM tx_metadata txm
  WHERE txm.tx_id = (
      SELECT MAX(txmmax.tx_id)
      FROM ma_tx_mint mtmmax
        JOIN multi_asset ma ON (mtmmax.ident = ma.id)
        JOIN tx_metadata txmmax ON (mtmmax.tx_id = txmmax.tx_id)
      WHERE txmmax.key = 721
        AND quantity > 0
        AND (
          encode(ma.policy, 'hex') || encode(ma.name, 'hex')
        ) = $1
    )
    AND txm.key = 721
)
SELECT (
    encode(ma.policy, 'hex') || encode(ma.name, 'hex')
  ) AS "asset",
  encode(ma.policy, 'hex') AS "policy_id",
  CASE
    WHEN encode(ma.name, 'hex') <> '' THEN encode(ma.name, 'hex')
    ELSE null
  END AS "asset_name",
  SUM(mtm.quantity)::TEXT AS "quantity", -- cast to TEXT to avoid number overflow
  (
    SELECT encode(tx.hash, 'hex')
    FROM tx
    WHERE tx.id = MIN(mtm.tx_id)
  ) AS "initial_mint_tx_hash",
  COUNT(*) AS "mint_or_burn_count",
  (
    SELECT onchain_metadata
    FROM queried_metadata
  ) AS "onchain_metadata",
  (
    SELECT onchain_metadata_cbor
    FROM queried_metadata
  ) AS "onchain_metadata_cbor",
  null AS "metadata"
FROM ma_tx_mint mtm
  JOIN multi_asset ma ON (mtm.ident = ma.id)
WHERE (
    encode(ma.policy, 'hex') || encode(ma.name, 'hex')
  ) = $1
GROUP BY policy,
  name