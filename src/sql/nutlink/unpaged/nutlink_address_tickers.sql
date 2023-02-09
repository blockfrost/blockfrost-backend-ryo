SELECT name AS "name",
  count AS "count",
  (
    SELECT b.block_no AS "latest_block"
    FROM tx
      JOIN block b ON (b.id = tx.block_id)
    WHERE tx.id = latest
  ) AS "latest_block"
FROM (
    SELECT jsonb_object_keys(txm.json) AS "name",
      COUNT(*) AS "count",
      MIN(txm.id::integer) AS "id",
      MAX(txm.tx_id) AS "latest"
    FROM tx_out txo
      JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
    WHERE (
        CASE
          WHEN $3::BYTEA IS NOT NULL THEN txo.payment_cred = $3
          ELSE txo.address = $2
        END
      )
      AND txm.key = 1968
    GROUP BY name
  ) AS "keys"
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN id
  END DESC,
  -- we need to order by both min(txm.id) and name, but we want to keep the order by name always ASC
  name ASC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN (id, name)
  END ASC