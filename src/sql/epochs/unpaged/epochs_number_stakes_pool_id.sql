SELECT sa.view AS "stake_address",
  es.amount::TEXT AS "amount"
FROM epoch_stake es
  JOIN stake_address sa ON (sa.id = es.addr_id)
  JOIN pool_hash ph ON (ph.id = es.pool_id)
WHERE es.epoch_no = $1
  AND ph.view = $2
-- hash_raw is chain-derived, so the ordering is stable across replicas
-- (and matches the paged variant of this query)
ORDER BY sa.hash_raw ASC
