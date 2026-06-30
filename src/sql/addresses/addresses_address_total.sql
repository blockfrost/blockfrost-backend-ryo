WITH matched_received AS MATERIALIZED (
  SELECT txo.id AS "tx_out_id",
    COALESCE(txo.value, 0) AS "value",
    txo.tx_id AS "txid"
  FROM tx_out txo
  WHERE (
      ($2::BYTEA IS NOT NULL AND txo.payment_cred = $2)
      OR ($2::BYTEA IS NULL AND txo.address = $1)
    )
),
matched_sent AS MATERIALIZED (
  SELECT txo.id AS "tx_out_id",
    COALESCE(txo.value, 0) AS "value",
    txi.tx_in_id AS "txid"
  FROM tx_out txo
    JOIN tx_in txi ON (
      txi.tx_out_id = txo.tx_id
      AND txi.tx_out_index = txo.index
    )
  WHERE (
      ($2::BYTEA IS NOT NULL AND txo.payment_cred = $2)
      OR ($2::BYTEA IS NULL AND txo.address = $1)
    )
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
      SELECT COALESCE(SUM(value), 0)::TEXT -- cast to TEXT to avoid number overflow
      FROM matched_sent
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
          SUM(mto.quantity) AS "token_quantity"
        FROM matched_sent ms
          JOIN ma_tx_out mto ON (mto.tx_out_id = ms.tx_out_id)
          JOIN multi_asset ma ON (mto.ident = ma.id)
        GROUP BY ma.name,
          ma.policy
        ORDER BY ma.policy,
          ma.name
      ) AS "assets"
  ) AS "sent_amount",
  (
    (
      SELECT COALESCE(SUM(value), 0)::TEXT -- cast to TEXT to avoid number overflow
      FROM matched_received
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
          SUM(mto.quantity) AS "token_quantity"
        FROM matched_received mr
          JOIN ma_tx_out mto ON (mto.tx_out_id = mr.tx_out_id)
          JOIN multi_asset ma ON (mto.ident = ma.id)
        GROUP BY ma.name,
          ma.policy
        ORDER BY ma.policy,
          ma.name
      ) AS "assets"
  ) AS "received_amount",
  (
    SELECT COUNT(DISTINCT txid)
    FROM (
        SELECT txid
        FROM matched_received
        UNION ALL
        SELECT txid
        FROM matched_sent
      ) AS "txs"
  ) AS "tx_count"
