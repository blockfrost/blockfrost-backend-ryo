SELECT sa.view AS "stake_address",
  ph.view AS "pool_id",
  es.amount::TEXT AS "amount"
FROM epoch_stake es
  JOIN pool_hash ph ON (ph.id = es.pool_id)
  JOIN stake_address sa ON (es.addr_id = sa.id)
WHERE es.epoch_no = $1
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
