SELECT encode(unique_txs.hash, 'hex') AS "tx_hash",
  unique_txs.block_index AS "tx_index",
  unique_txs.block_no AS "block_height",
  extract(
    epoch
    FROM unique_txs.time
  )::INTEGER AS "block_time"
FROM (
    (
      SELECT tx.id,
        tx.hash,
        tx.block_index,
        b.block_no,
        b.time
      FROM tx
        JOIN tx_in txi ON (txi.tx_in_id = tx.id)
        JOIN tx_out txo ON (
          txo.tx_id = txi.tx_out_id
          AND txo.index = txi.tx_out_index
        )
        JOIN block b ON (b.id = tx.block_id)
      WHERE (
          CASE
            WHEN $5::BYTEA IS NOT NULL THEN txo.payment_cred = $5
            ELSE txo.address = $4
          END
        )
        AND (
          (
            -- :: cast of parameters is necessary for PG in order to validate against NULL
            $6::INTEGER IS NULL
            OR b.block_no > $6
          )
          OR (
            (
              $7::INTEGER IS NULL
              AND b.block_no = $6
            )
            OR (
              tx.block_index >= $7
              AND b.block_no = $6
            )
          )
        )
        AND (
          (
            $8::INTEGER IS NULL
            OR b.block_no < $8
          )
          OR (
            (
              $9::INTEGER IS NULL
              AND b.block_no = $8
            )
            OR (
              tx.block_index <= $9
              AND b.block_no = $8
            )
          )
        )
    )
    UNION
    -- remove duplicate from SELF TXs via UNION
    (
      SELECT tx.id,
        tx.hash,
        tx.block_index,
        b.block_no,
        b.time
      FROM tx
        JOIN tx_out txo ON (txo.tx_id = tx.id)
        JOIN block b ON (b.id = tx.block_id)
      WHERE (
          CASE
            WHEN $5::BYTEA IS NOT NULL THEN txo.payment_cred = $5
            ELSE txo.address = $4
          END
        )
        AND (
          (
            -- :: cast of parameters is necessary for PG in order to validate against NULL
            $6::INTEGER IS NULL
            OR b.block_no > $6
          )
          OR (
            (
              $7::INTEGER IS NULL
              AND b.block_no = $6
            )
            OR (
              tx.block_index >= $7
              AND b.block_no = $6
            )
          )
        )
        AND (
          (
            $8::INTEGER IS NULL
            OR b.block_no < $8
          )
          OR (
            (
              $9::INTEGER IS NULL
              AND b.block_no = $8
            )
            OR (
              tx.block_index <= $9
              AND b.block_no = $8
            )
          )
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