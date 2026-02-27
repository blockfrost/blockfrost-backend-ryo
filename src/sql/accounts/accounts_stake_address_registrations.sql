SELECT tx AS "tx_hash",
  action AS "action",
  tx_slot AS "tx_slot",
  block_time AS "block_time"
FROM (
    (
      (
        SELECT tx.id AS "id",
          encode(tx.hash, 'hex') AS "tx",
          'registered' AS "action",
          b.slot_no::INTEGER AS "tx_slot",
          EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
        FROM stake_address sa
          JOIN stake_registration sr ON (sa.id = sr.addr_id)
          JOIN tx ON (tx.id = sr.tx_id)
          JOIN block b ON (b.id = tx.block_id)
        WHERE sa.view = $4
      )
      UNION
      (
        SELECT tx.id AS "id",
          encode(tx.hash, 'hex') AS "tx",
          'deregistered' AS "action",
          b.slot_no::INTEGER AS "tx_slot",
          EXTRACT(EPOCH FROM b.time)::INTEGER AS "block_time"
        FROM stake_address sa
          JOIN stake_deregistration sd ON (sa.id = sd.addr_id)
          JOIN tx ON (tx.id = sd.tx_id)
          JOIN block b ON (b.id = tx.block_id)
        WHERE sa.view = $4
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
LIMIT CASE
    WHEN $2 >= 1
    AND $2 <= 100 THEN $2
    ELSE 100
  END OFFSET CASE
    WHEN $3 > 1
    AND $3 < 2147483647 THEN ($3 - 1) * (
      CASE
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END
    )
    ELSE 0
  END