WITH queried_block AS (
  SELECT id
  FROM block
  WHERE CASE
      WHEN $1 ~ '^[0-9]+$' THEN block_no = $1::integer
      ELSE encode(hash, 'hex') = $1
    END
)
SELECT ordered_addresses_and_txs.address,
  json_agg(
    json_build_object(
      'tx_hash',
      encode(ordered_addresses_and_txs.hash, 'hex')
    )
  ) AS "transactions"
FROM (
    SELECT unique_addresses.address,
      unique_addresses.hash
    FROM (
        SELECT txo.address,
          tx.hash,
          tx.block_index
        FROM tx_out txo
          JOIN tx ON (txo.tx_id = tx.id)
          JOIN block b ON (tx.block_id = b.id)
        WHERE b.id = (
            SELECT id
            FROM queried_block
          )
        UNION
        SELECT txo.address,
          tx.hash,
          tx.block_index
        FROM tx
          JOIN tx_in txi ON (txi.tx_in_id = tx.id)
          JOIN tx_out txo ON (
            txo.tx_id = txi.tx_out_id
            AND txi.tx_out_index = txo.index
          )
          JOIN block b ON (tx.block_id = b.id)
        WHERE b.id = (
            SELECT id
            FROM queried_block
          )
      ) AS "unique_addresses"
    GROUP BY unique_addresses.address,
      unique_addresses.hash,
      unique_addresses.block_index
    ORDER BY (
        unique_addresses.address,
        unique_addresses.block_index
      )
  ) AS "ordered_addresses_and_txs"
GROUP BY ordered_addresses_and_txs.address
ORDER BY ordered_addresses_and_txs.address
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