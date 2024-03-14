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
  ) AS "previous_block"
FROM block b
  LEFT JOIN tx ON (tx.block_id = b.id)
  JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
  LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
WHERE b.id = (
    SELECT MAX(id)
    FROM block
  )
GROUP BY b.id,
  sl.id,
  ph.id
ORDER BY b.id DESC
LIMIT 1