SELECT sa.view AS "stake_address",
  es.amount::TEXT AS "amount"
FROM epoch_stake es
  JOIN stake_address sa ON (sa.id = es.addr_id)
  JOIN pool_hash ph ON (ph.id = es.pool_id)
WHERE es.epoch_no = $1
  AND ph.view = $2
ORDER BY (
    -- slot_no of the earliest delegation by this addr to this pool that is
    -- effective by this epoch. Chain-derived, stable across replicas.
    SELECT MIN(d.slot_no)
    FROM delegation d
    WHERE d.addr_id = es.addr_id
      AND d.pool_hash_id = es.pool_id
      AND d.active_epoch_no <= es.epoch_no
  ) ASC NULLS LAST,
  es.addr_id ASC
