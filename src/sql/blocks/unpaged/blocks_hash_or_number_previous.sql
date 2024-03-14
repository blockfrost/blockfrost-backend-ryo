WITH queried_block AS (
  SELECT id,
    block_no,
    previous_id,
    slot_leader_id,
    time
  FROM block
  WHERE CASE
      WHEN $1 ~ '^[0-9]+$' THEN block_no = $1::INTEGER
      ELSE encode(hash, 'hex') = $1
    END
),
queried_block_latest AS (
  SELECT id AS "height"
  FROM block
  WHERE block_no IS NOT NULL
  ORDER BY block_no DESC
  LIMIT 1
)
SELECT selected_blocks.time AS "time",
  selected_blocks.height AS "height",
  selected_blocks.hash AS "hash",
  selected_blocks.slot AS "slot",
  selected_blocks.epoch AS "epoch",
  selected_blocks.epoch_slot AS "epoch_slot",
  CASE
    WHEN ph.view IS NULL THEN 
      CASE 
        WHEN sl.description LIKE '%Key-%' THEN 
          REPLACE(sl.description, 'Key-', '-')
        ELSE sl.description
      END
    ELSE ph.view
  END AS "slot_leader",
  selected_blocks.size AS "size",
  selected_blocks.tx_count AS "tx_count",
  SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
  SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
  selected_blocks.block_vrf AS "block_vrf",
  selected_blocks.op_cert AS "op_cert",
  selected_blocks.op_cert_counter AS "op_cert_counter",
  selected_blocks.previous_block AS "previous_block",
  selected_blocks.next_block AS "next_block",
  selected_blocks.confirmations AS "confirmations"
FROM (
    SELECT b.id AS "id",
      extract(
        epoch
        FROM b.time
      )::INTEGER AS "time",
      b.block_no AS "height",
      encode(b.hash, 'hex') AS "hash",
      b.slot_no AS "slot",
      b.epoch_no AS "epoch",
      b.epoch_slot_no AS "epoch_slot",
      b.slot_leader_id AS "slot_leader_id",
      b.size AS "size",
      b.tx_count::INTEGER AS "tx_count",
      b.vrf_key AS "block_vrf",
      encode(b.op_cert, 'hex') AS "op_cert",
      b.op_cert_counter::TEXT AS "op_cert_counter", -- cast to TEXT to avoid number overflow
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = b.previous_id
      ) AS "previous_block",
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = (
            SELECT MIN(id)
            FROM (
                SELECT id
                FROM block
                WHERE id > b.id
              ) AS "void"
          )
      ) AS "next_block",
      (
        SELECT id
        FROM queried_block_latest
      ) - (
        SELECT id
        FROM queried_block
      ) AS "confirmations"
    FROM block b
    WHERE b.id < (
        SELECT id
        FROM queried_block
      )
  ) AS "selected_blocks"
  LEFT JOIN tx ON (tx.block_id = selected_blocks.id)
  JOIN slot_leader sl ON (sl.id = selected_blocks.slot_leader_id)
  LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
GROUP BY (
    selected_blocks.id,
    selected_blocks.time,
    selected_blocks.hash,
    selected_blocks.height,
    selected_blocks.slot,
    selected_blocks.epoch,
    selected_blocks.epoch_slot,
    selected_blocks.size,
    selected_blocks.tx_count,
    selected_blocks.block_vrf,
    selected_blocks.op_cert,
    selected_blocks.op_cert_counter,
    selected_blocks.previous_block,
    selected_blocks.next_block,
    selected_blocks.confirmations,
    sl.id,
    ph.id
  )
ORDER BY selected_blocks.id DESC