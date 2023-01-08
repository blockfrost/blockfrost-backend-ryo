SELECT sa.view AS "stake_address",
  es.amount::TEXT AS "amount"
FROM epoch_stake es
  JOIN stake_address sa ON (sa.id = es.addr_id)
  JOIN pool_hash ph ON (ph.id = es.pool_id)
WHERE es.epoch_no = $1
  AND ph.view = $2
ORDER BY es.id ASC