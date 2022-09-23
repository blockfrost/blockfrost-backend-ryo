SELECT sa.view AS "address",
  w.amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM tx
  JOIN withdrawal w ON (tx.id = w.tx_id)
  JOIN stake_address sa ON (sa.id = w.addr_id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY w.id ASC