SELECT encode(unique_txs.hash, 'hex') AS "hash"
FROM (
    (
      SELECT tx.id,
        tx.hash
      FROM tx
        JOIN tx_in txi ON (txi.tx_in_id = tx.id)
        JOIN tx_out txo ON (
          txo.tx_id = txi.tx_out_id
          AND txo.index = txi.tx_out_index
        )
      WHERE (
          CASE
            WHEN $3::BYTEA IS NOT NULL THEN txo.payment_cred = $3
            ELSE txo.address = $2
          END
        )
    )
    UNION
    -- remove duplicates from self txs via UNION
    (
      SELECT tx.id,
        tx.hash
      FROM tx
        JOIN tx_out txo ON (txo.tx_id = tx.id)
      WHERE (
          CASE
            WHEN $3::BYTEA IS NOT NULL THEN txo.payment_cred = $3
            ELSE txo.address = $2
          END
        )
    )
  ) AS "unique_txs"
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN unique_txs.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN unique_txs.id
  END ASC