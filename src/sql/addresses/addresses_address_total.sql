WITH queried_outputs AS (
  SELECT COALESCE(txo.value, 0) AS "amount",
    array_agg(mto.id) AS "assets_ids",
    array_agg(DISTINCT tx.id) AS "txids"
  FROM tx
    JOIN tx_in txi ON (txi.tx_in_id = tx.id)
    JOIN tx_out txo ON (
      txo.tx_id = txi.tx_out_id
      AND txo.index = txi.tx_out_index
    )
    LEFT JOIN ma_tx_out mto ON (mto.tx_out_id = txo.id)
  WHERE (
      CASE
        WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
        ELSE txo.address = $1
      END
    )
  GROUP BY txo.id
),
queried_inputs AS (
  SELECT COALESCE(txo.value, 0) AS "amount",
    array_agg(mto.id) AS "assets_ids",
    array_agg(DISTINCT tx.id) AS "txids"
  FROM tx
    JOIN tx_out txo ON (txo.tx_id = tx.id)
    LEFT JOIN ma_tx_out mto ON (mto.tx_out_id = txo.id)
  WHERE (
      CASE
        WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
        ELSE txo.address = $1
      END
    )
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
    (
      SELECT COALESCE(SUM(amount), 0)::TEXT -- cast to TEXT to avoid number overflow
      FROM queried_outputs
    )
  ) AS "sent_amount_lovelace",
  (
    SELECT json_agg(
        json_build_object(
          'unit',
          token_name,
          'quantity',
          token_quantity::TEXT -- cast to TEXT to avoid number overflow
        )
      )
    FROM (
        SELECT CONCAT(encode(ma.policy, 'hex'), encode(ma.name, 'hex')) AS "token_name",
          SUM(quantity) AS "token_quantity"
        FROM ma_tx_out mto
          JOIN multi_asset ma ON (mto.ident = ma.id)
        WHERE mto.id IN (
            SELECT unnest(assets_ids)
            FROM queried_outputs
          )
        GROUP BY ma.name,
          ma.policy
        ORDER BY (ma.policy, ma.name)
      ) AS "assets"
  ) AS "sent_amount",
  (
    (
      SELECT COALESCE(SUM(amount), 0)::TEXT -- cast to TEXT to avoid number overflow
      FROM queried_inputs
    )
  ) AS "received_amount_lovelace",
  (
    SELECT json_agg(
        json_build_object(
          'unit',
          token_name,
          'quantity',
          token_quantity::TEXT -- cast to TEXT to avoid number overflow
        )
      )
    FROM (
        SELECT CONCAT(encode(ma.policy, 'hex'), encode(ma.name, 'hex')) AS "token_name",
          SUM(quantity) AS "token_quantity"
        FROM ma_tx_out mto
          JOIN multi_asset ma ON (mto.ident = ma.id)
        WHERE mto.id IN (
            SELECT unnest(assets_ids)
            FROM queried_inputs
          )
        GROUP BY ma.name,
          ma.policy
        ORDER BY (ma.policy, ma.name)
      ) AS "assets"
  ) AS "received_amount",
  (
    SELECT COUNT(*)
    FROM (
        (
          SELECT txids
          FROM queried_inputs
        )
        UNION
        (
          SELECT txids
          FROM queried_outputs
        )
      ) AS "unique_txs"
  ) AS "tx_count"