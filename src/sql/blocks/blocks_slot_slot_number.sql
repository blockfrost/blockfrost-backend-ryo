SELECT extract(
    epoch
    FROM b.time
  )::INTEGER AS "time",
  b.block_no AS "height",
  encode(b.hash, 'hex') AS "hash",
  b.slot_no AS "slot",
  b.epoch_no AS "epoch",
  b.epoch_slot_no AS "epoch_slot",
  CASE
    WHEN ph.view IS NULL THEN 
      CASE 
        WHEN sl.description LIKE '%Key-%' THEN 
          REPLACE(sl.description, 'Key-', '-')
        ELSE sl.description
      END
    ELSE ph.view
  END AS "slot_leader",
  b.size AS "size",
  b.tx_count AS "tx_count",
  SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
  SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
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
    SELECT block_no AS "height"
    FROM block
    WHERE block_no IS NOT NULL
    ORDER BY block_no DESC
    LIMIT 1
  ) - CASE
    WHEN b.block_no IS NOT NULL THEN -- regular block
    b.block_no
    WHEN b.slot_leader_id = 2 THEN -- epoch boundary
    CASE
      WHEN b.previous_id = 1 THEN -- first epoch boundary
      0
      ELSE -- all other epoch boundaries
      (
        SELECT block_no
        FROM block btemp
        WHERE btemp.id = b.previous_id
      )
    END
    WHEN b.slot_leader_id = 1 THEN -- genesis
    0
    ELSE -- this should never happen and should throw error in tests
    NULL
  END AS "confirmations"
FROM block b
  LEFT JOIN tx ON (tx.block_id = b.id)
  JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
  LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
WHERE b.slot_no = $1
GROUP BY b.id,
  sl.id,
  ph.id