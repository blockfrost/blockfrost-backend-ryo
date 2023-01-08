SELECT encode(tx.hash, 'hex') "tx_hash",
  r.index AS "tx_index",
  r.purpose AS "purpose",
  r.unit_mem::TEXT AS "unit_mem", -- cast to TEXT to avoid number overflow
  r.unit_steps::TEXT AS "unit_steps", -- cast to TEXT to avoid number overflow
  r.fee::TEXT AS "fee", -- cast to TEXT to avoid number overflow
  encode(redeemer_data.hash, 'hex') AS "redeemer_data_hash",
  encode(redeemer_data.hash, 'hex') AS "datum_hash" -- deprecated
FROM redeemer r
  JOIN tx ON (r.tx_id = tx.id)
  JOIN redeemer_data ON (r.redeemer_data_id = redeemer_data.id)
WHERE encode(r.script_hash, 'hex') = $2
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN r.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN r.id
  END ASC