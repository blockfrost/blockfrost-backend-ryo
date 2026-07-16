-- requires db-sync consumed-tx-out tracking (tx_out.consumed_by_tx_id),
-- the tx_out insert option set to 'consumed' or 'prune'
WITH matched_outputs AS MATERIALIZED (
  SELECT txo.id,
    COALESCE(txo.value, 0) AS "value",
    txo.tx_id,
    txo.consumed_by_tx_id AS "spending_tx_id"
  FROM tx_out txo
    JOIN stake_address sa ON (txo.stake_address_id = sa.id)
  WHERE sa.view = $1
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
    SELECT sa.view
    FROM tx_out txo
      JOIN stake_address sa ON (txo.stake_address_id = sa.id)
    WHERE sa.view = $1
    LIMIT 1
  ) AS "stake_address",
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
