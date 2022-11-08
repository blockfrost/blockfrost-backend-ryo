SELECT cert_index AS "cert_index",
  address AS "address",
  registration AS "registration"
FROM (
    SELECT sr.tx_id AS "id",
      sr.cert_index AS "cert_index",
      sa.view AS "address",
      TRUE AS "registration"
    FROM tx
      JOIN stake_registration sr ON (sr.tx_id = tx.id)
      JOIN stake_address sa ON (sa.id = sr.addr_id)
    WHERE encode(tx.hash, 'hex') = $1
    -- UNION to combine registered and deregistered addresses so we can ORDER BY tx id
    UNION
    SELECT sd.tx_id AS "id",
      sd.cert_index AS "cert_index",
      sa.view AS "address",
      FALSE AS "registration"
    FROM tx
      JOIN stake_deregistration sd ON (sd.tx_id = tx.id)
      JOIN stake_address sa ON (sa.id = sd.addr_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "addresses"
ORDER BY (cert_index, id) ASC