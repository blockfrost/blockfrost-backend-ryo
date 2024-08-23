SELECT pu.id AS "pu_id",
  pu.cert_index AS "cert_index",
  encode(pu.vrf_key_hash, 'hex') AS "vrf_key",
  pu.pledge::TEXT AS "pledge", -- cast to TEXT to avoid number overflow
  pu.margin AS "margin_cost",
  pu.fixed_cost::TEXT AS "fixed_cost", -- cast to TEXT to avoid number overflow
  sa.view AS "reward_account",
  encode(sa.hash_raw, 'hex') AS "reward_account_raw",
  ARRAY (
    SELECT sa.view
    FROM pool_owner po
      JOIN pool_update pu ON (po.pool_update_id = pu.id)
      JOIN tx ON (pu.registered_tx_id = tx.id)
      JOIN stake_address sa ON (sa.id = po.addr_id)
    WHERE encode(tx.hash, 'hex') = $1
      AND pu.hash_id = ph.id
  ) AS "owners",
  pmr.url AS "metadata_url",
  encode(pmr.hash, 'hex') AS "metadata_hash",
  ph.view AS "pool_id",
  encode(ph.hash_raw, 'hex') AS "hash",
  pu.active_epoch_no::integer AS "active_epoch",
  pod.ticker_name AS "ticker",
  pod.json AS "metadata_text"
FROM tx
  JOIN pool_update pu ON (pu.registered_tx_id = tx.id)
  JOIN pool_hash ph ON (ph.id = pu.hash_id)
  LEFT JOIN stake_address sa ON (sa.id = pu.reward_addr_id)
  LEFT JOIN pool_metadata_ref pmr ON (pmr.id = pu.meta_id)
  LEFT JOIN off_chain_pool_data pod ON (pmr.hash = pod.hash)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY pu.cert_index ASC