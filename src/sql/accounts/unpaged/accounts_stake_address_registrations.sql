SELECT tx AS "tx_hash",
  action AS "action"
FROM (
    (
      (
        SELECT tx.id AS "id",
          encode(tx.hash, 'hex') AS "tx",
          'registered' AS "action"
        FROM stake_address sa
          JOIN stake_registration sr ON (sa.id = sr.addr_id)
          JOIN tx ON (tx.id = sr.tx_id)
        WHERE sa.view = $2
      )
      UNION
      (
        SELECT tx.id AS "id",
          encode(tx.hash, 'hex') AS "tx",
          'deregistered' AS "action"
        FROM stake_address sa
          JOIN stake_deregistration sd ON (sa.id = sd.addr_id)
          JOIN tx ON (tx.id = sd.tx_id)
        WHERE sa.view = $2
      )
    )
  ) AS "registrations"
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN id
  END ASC