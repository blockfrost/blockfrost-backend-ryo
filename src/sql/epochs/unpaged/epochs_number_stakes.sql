SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  es.amount::TEXT AS "amount"
FROM epoch_stake es
  JOIN pool_hash ph ON (ph.id = es.pool_id)
  JOIN stake_address sa ON (es.addr_id = sa.id)
WHERE es.epoch_no = $1
ORDER BY es.id ASC