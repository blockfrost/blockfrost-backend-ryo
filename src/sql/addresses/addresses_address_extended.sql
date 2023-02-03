WITH queried_address AS (
  SELECT CASE
      WHEN $2::BYTEA IS NOT NULL THEN (
        SELECT stake_address_id AS "stake_address_id"
        FROM tx_out txo
        WHERE txo.payment_cred = $2
        LIMIT 1
      )
      ELSE (
        SELECT stake_address_id AS "stake_address_id"
        FROM tx_out txo
        WHERE txo.address = $1
        LIMIT 1
      )
    END
), queried_amount AS (
  SELECT COALESCE(txo.value, 0) AS "amount",
    array_agg(mto.id) AS "assets_ids"
  FROM tx_out txo
    JOIN tx ON (txo.tx_id = tx.id)
    LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
    AND (txo.index = txi.tx_out_index)
    LEFT JOIN ma_tx_out mto ON (mto.tx_out_id = txo.id)
  WHERE txi IS NULL
    AND (
      CASE
        WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
        ELSE txo.address = $1
      END
    ) -- don't count utxos that are part of transaction that failed script validation at stage 2
    AND tx.valid_contract = 'true'
  GROUP BY txo.id
)
SELECT (
    SELECT CASE
        WHEN $2::BYTEA IS NOT NULL THEN encode($2, 'hex')
        ELSE (
          SELECT address
          FROM tx_out txo
          WHERE txo.address = $1
          LIMIT 1
        )
      END
  ) AS "address",
  (
    SELECT COALESCE(SUM(amount), 0)::TEXT -- cast to TEXT to avoid number overflow
    FROM queried_amount
  ) AS "amount_lovelace",
  (
    SELECT json_agg(
        json_build_object(
          'policy_id',
          token_policy,
          'asset_name',
          token_name,
          'quantity',
          token_quantity::TEXT,
          -- cast to TEXT to avoid number overflow
          'onchain_metadata',
          onchain_metadata_combined->'json',
          'onchain_metadata_cbor',
          onchain_metadata_combined->'cbor'
        )
      )
    FROM (
        SELECT encode(policy, 'hex') AS "token_policy",
          encode(name, 'hex') AS "token_name",
          SUM(quantity) AS "token_quantity",
          (
            -- retrieve the latest metadata for further CIP-25 v2 validation outside of SQL
            SELECT json_build_object(
                'json',
                txm.json,
                'cbor',
                encode(txm.bytes, 'hex')
              )
            FROM tx_metadata txm
            WHERE txm.tx_id = (
                SELECT MAX(txmmax.tx_id)
                FROM ma_tx_mint mtmmax
                  JOIN multi_asset mamax ON (mtmmax.ident = mamax.id)
                  JOIN tx_metadata txmmax ON (mtmmax.tx_id = txmmax.tx_id)
                WHERE txmmax.key = 721
                  AND quantity > 0
                  AND (
                    encode(mamax.policy, 'hex') || encode(mamax.name, 'hex')
                  ) = encode(ma.policy, 'hex') || encode(ma.name, 'hex')
              )
              AND txm.key = 721
          ) AS "onchain_metadata_combined"
        FROM ma_tx_out mto
          JOIN multi_asset ma ON (mto.ident = ma.id)
        WHERE mto.id IN (
            SELECT unnest(assets_ids)
            FROM queried_amount
          )
        GROUP BY ma.name,
          ma.policy
        ORDER BY (ma.policy, ma.name)
      ) AS "assets"
  ) AS "amount",
  (
    SELECT sa.view
    FROM stake_address sa
    WHERE sa.id = (
        SELECT *
        FROM queried_address
      )
  ) AS "stake_address",
  (
    SELECT CASE
        WHEN $2::BYTEA IS NOT NULL THEN (
          SELECT address_has_script AS "address_has_script"
          FROM tx_out txo
          WHERE txo.payment_cred = $2
          LIMIT 1
        )
        ELSE (
          SELECT address_has_script AS "address_has_script"
          FROM tx_out txo
          WHERE txo.address = $1
          LIMIT 1
        )
      END
  ) AS "script"