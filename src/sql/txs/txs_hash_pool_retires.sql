SELECT pr.cert_index AS "cert_index",
  ph.view AS "pool_id",
  pr.retiring_epoch AS "retiring_epoch"
FROM tx
  JOIN pool_retire pr ON (tx.id = pr.announced_tx_id)
  JOIN pool_hash ph ON (ph.id = pr.hash_id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY pr.cert_index ASC