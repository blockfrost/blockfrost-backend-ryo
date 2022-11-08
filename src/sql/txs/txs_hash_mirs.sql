SELECT pot AS "pot",
  cert_index AS "cert_index",
  address AS "address",
  amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM (
    SELECT r.id,
      'reserve' AS "pot",
      r.cert_index AS "cert_index",
      sa.view AS "address",
      r.amount AS "amount"
    FROM tx
      JOIN reserve r ON (tx.id = r.tx_id)
      JOIN stake_address sa ON (sa.id = r.addr_id)
    WHERE encode(tx.hash, 'hex') = $1
    UNION
    SELECT t.id,
      'treasury' AS "pot",
      t.cert_index AS "cert_index",
      sa.view AS "address",
      t.amount AS "amount"
    FROM tx
      JOIN treasury t ON (tx.id = t.tx_id)
      JOIN stake_address sa ON (sa.id = t.addr_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "reserve_and_treasury"
ORDER BY (cert_index, pot, id) ASC