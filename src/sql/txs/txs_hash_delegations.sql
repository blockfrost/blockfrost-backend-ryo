SELECT d.cert_index AS "index",
  d.cert_index AS "cert_index",
  sa.view AS "address",
  ph.view AS "pool_id",
  d.active_epoch_no AS "active_epoch"
FROM tx
  JOIN delegation d ON (d.tx_id = tx.id)
  JOIN stake_address sa ON (sa.id = d.addr_id)
  JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY cert_index ASC