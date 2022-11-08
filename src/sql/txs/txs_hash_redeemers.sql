SELECT r.index AS "tx_index",
  r.purpose AS "purpose",
  r.unit_mem::TEXT AS "unit_mem", -- cast to TEXT to avoid number overflow
  r.unit_steps::TEXT AS "unit_steps", -- cast to TEXT to avoid number overflow
  r.fee::TEXT AS "fee", -- cast to TEXT to avoid number overflow
  encode(r.script_hash, 'hex') AS "script_hash",
  encode(redeemer_data.hash, 'hex') AS "redeemer_data_hash",
  encode(redeemer_data.hash, 'hex') AS "datum_hash" -- deprecated
FROM redeemer r
  JOIN tx ON (r.tx_id = tx.id)
  JOIN redeemer_data ON (r.redeemer_data_id = redeemer_data.id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY r.index ASC