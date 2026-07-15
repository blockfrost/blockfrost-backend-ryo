WITH matched_outputs AS MATERIALIZED (
  SELECT txo.id,
    COALESCE(txo.value, 0) AS "value",
    txo.tx_id,
    txi.tx_in_id AS "spending_tx_id"
  FROM tx_out txo
    LEFT JOIN tx_in txi ON (
      txi.tx_out_id = txo.tx_id
      AND txi.tx_out_index = txo.index
    )
  WHERE (
      -- comparing against (SELECT $n) instead of $n keeps the planner on generic
      -- row estimates: very common addresses (MCV statistics) would otherwise
      -- flip asset aggregation to a seq scan over the whole ma_tx_out table
      CASE
        WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = (
          SELECT $2::BYTEA
        )
        ELSE txo.address = (
          SELECT $1
        )
      END
    )
),
-- one pass over ma_tx_out; multi_asset is joined later, only once per distinct asset.
-- GROUP BY ident is equivalent to GROUP BY (policy, name): unique_multi_asset (policy, name)
asset_sums AS MATERIALIZED (
  SELECT mto.ident,
    SUM(mto.quantity) AS "received_quantity",
    SUM(mto.quantity) FILTER (
      WHERE mo.spending_tx_id IS NOT NULL
    ) AS "sent_quantity"
  FROM matched_outputs mo
    JOIN ma_tx_out mto ON (mto.tx_out_id = mo.id)
  GROUP BY mto.ident
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
    SELECT COALESCE(SUM(value), 0)::TEXT -- cast to TEXT to avoid number overflow
    FROM matched_outputs
    WHERE spending_tx_id IS NOT NULL
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
          s.sent_quantity AS "token_quantity"
        FROM asset_sums s
          JOIN multi_asset ma ON (ma.id = s.ident)
        WHERE s.sent_quantity IS NOT NULL
        ORDER BY (ma.policy, ma.name)
      ) AS "assets"
  ) AS "sent_amount",
  (
    SELECT COALESCE(SUM(value), 0)::TEXT -- cast to TEXT to avoid number overflow
    FROM matched_outputs
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
          s.received_quantity AS "token_quantity"
        FROM asset_sums s
          JOIN multi_asset ma ON (ma.id = s.ident)
        ORDER BY (ma.policy, ma.name)
      ) AS "assets"
  ) AS "received_amount",
  (
    SELECT COUNT(*)
    FROM (
        SELECT tx_id
        FROM matched_outputs
        UNION
        SELECT spending_tx_id
        FROM matched_outputs
        WHERE spending_tx_id IS NOT NULL
      ) AS "unique_txs"
  ) AS "tx_count"
