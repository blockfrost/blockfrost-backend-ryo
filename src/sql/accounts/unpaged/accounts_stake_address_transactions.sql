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
        JOIN stake_address sa ON (sa.id = txo.stake_address_id)
        JOIN block b ON (b.id = tx.block_id)
      WHERE sa.view = $2
        AND (
          (
            -- :: cast of parameters is necessary for PG in order to validate against NULL
            $3::INTEGER IS NULL
            OR b.block_no > $3
          )
          OR (
            (
              $4::INTEGER IS NULL
              AND b.block_no = $3
            )
            OR (
              tx.block_index >= $4
              AND b.block_no = $3
            )
          )
        )
        AND (
          (
            $5::INTEGER IS NULL
            OR b.block_no < $5
          )
          OR (
            (
              $6::INTEGER IS NULL
              AND b.block_no = $5
            )
            OR (
              tx.block_index <= $6
              AND b.block_no = $5
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
        JOIN stake_address sa ON (sa.id = txo.stake_address_id)
        JOIN block b ON (b.id = tx.block_id)
      WHERE sa.view = $2
        AND (
          (
            -- :: cast of parameters is necessary for PG in order to validate against NULL
            $3::INTEGER IS NULL
            OR b.block_no > $3
          )
          OR (
            (
              $4::INTEGER IS NULL
              AND b.block_no = $3
            )
            OR (
              tx.block_index >= $4
              AND b.block_no = $3
            )
          )
        )
        AND (
          (
            $5::INTEGER IS NULL
            OR b.block_no < $5
          )
          OR (
            (
              $6::INTEGER IS NULL
              AND b.block_no = $5
            )
            OR (
              tx.block_index <= $6
              AND b.block_no = $5
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
