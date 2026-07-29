SELECT encode(tx.hash, 'hex') AS "tx_hash",
  tx.block_index AS "tx_index",
  b.block_no AS "block_height",
  extract(
    epoch
    FROM b.time
  )::INTEGER AS "block_time"
FROM (
    SELECT txo.tx_id AS "tx_id"
    FROM ma_tx_out mto
      JOIN multi_asset ma ON (mto.ident = ma.id)
      JOIN tx_out txo ON (mto.tx_out_id = txo.id)
      JOIN tx t ON (t.id = txo.tx_id)
      JOIN block tb ON (tb.id = t.block_id)
    WHERE (encode(policy, 'hex') || encode(name, 'hex')) = $4
      AND (
        (
          -- :: cast of parameters is necessary for PG in order to validate against NULL
          $5::INTEGER IS NULL
          OR tb.block_no > $5
        )
        OR (
          (
            $6::INTEGER IS NULL
            AND tb.block_no = $5
          )
          OR (
            t.block_index >= $6
            AND tb.block_no = $5
          )
        )
      )
      AND (
        (
          $7::INTEGER IS NULL
          OR tb.block_no < $7
        )
        OR (
          (
            $8::INTEGER IS NULL
            AND tb.block_no = $7
          )
          OR (
            t.block_index <= $8
            AND tb.block_no = $7
          )
        )
      )
    GROUP BY txo.tx_id
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN txo.tx_id
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN txo.tx_id
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
  ) AS "sorted_limited"
  JOIN tx ON (sorted_limited.tx_id = tx.id)
  JOIN block b ON (b.id = tx.block_id)
    ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN sorted_limited.tx_id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN sorted_limited.tx_id
  END ASC
