WITH candidate_tx_ids AS (
  SELECT DISTINCT ON (tx_id, address) tx_id, tx_hash, address, txo_id, tx_index, block_height, block_time 
  FROM (
    SELECT 
      tx.id                                 AS tx_id,
      encode(tx.hash, 'hex')                AS "tx_hash",
      txo.address                           AS "address",
      txo.id                                AS "txo_id",
      tx.block_index                        AS "tx_index",
      b.block_no                            AS "block_height",
      EXTRACT(EPOCH FROM b.time)::INTEGER   AS "block_time"
    FROM stake_address sa
      JOIN tx_out txo ON txo.stake_address_id = sa.id
      JOIN tx_in txi ON txi.tx_out_id = txo.tx_id AND txi.tx_out_index = txo.index
      JOIN tx ON tx.id = txi.tx_in_id
      JOIN block b ON b.id = tx.block_id
    WHERE sa.view = $4
      AND (
      (
        -- :: cast of parameters is necessary for PG in order to validate against NULL
        $5::INTEGER IS NULL
        OR b.block_no > $5
      )
      OR (
        (
          $6::INTEGER IS NULL
          AND b.block_no = $5
        )
        OR (
          tx.block_index >= $6
          AND b.block_no = $5
        )
      )
    )
    AND (
      (
        $7::INTEGER IS NULL
        OR b.block_no < $7
      )
      OR (
        (
          $8::INTEGER IS NULL
          AND b.block_no = $7
        )
        OR (
          tx.block_index <= $8
          AND b.block_no = $7
        )
      )
    )

    UNION
    SELECT 
      tx.id                                 AS "tx_id",
      encode(tx.hash, 'hex')                AS "tx_hash",
      txo.address                           AS "address",
      txo.id                                AS "txo_id",
      tx.block_index                        AS "tx_index",
      b.block_no                            AS "block_height",
      EXTRACT(EPOCH FROM b.time)::INTEGER   AS "block_time"
    FROM stake_address sa
      JOIN tx_out txo ON txo.stake_address_id = sa.id
      JOIN tx ON tx.id = txo.tx_id
      JOIN block b ON b.id = tx.block_id
    WHERE sa.view = $4
      AND (
        (
          -- :: cast of parameters is necessary for PG in order to validate against NULL
          $5::INTEGER IS NULL
          OR b.block_no > $5
        )
        OR (
          (
            $6::INTEGER IS NULL
            AND b.block_no = $5
          )
          OR (
            tx.block_index >= $6
            AND b.block_no = $5
          )
        )
      )
      AND (
        (
          $7::INTEGER IS NULL
          OR b.block_no < $7
        )
        OR (
          (
            $8::INTEGER IS NULL
            AND b.block_no = $7
          )
          OR (
            tx.block_index <= $8
            AND b.block_no = $7
          )
        )
      )
  )
  ORDER BY tx_id, address, txo_id
)

SELECT address, tx_hash, tx_index, block_height, block_time 
FROM candidate_tx_ids c
ORDER BY
  CASE WHEN LOWER($1) = 'desc' THEN c.tx_id END DESC,
  CASE WHEN LOWER($1) = 'desc' THEN c.txo_id END DESC,
  CASE WHEN LOWER($1) <> 'desc' OR $1 IS NULL THEN c.tx_id END ASC,
  CASE WHEN LOWER($1) <> 'desc' OR $1 IS NULL THEN c.txo_id END ASC
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