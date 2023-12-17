SELECT encode(tx.hash, 'hex') AS "tx_hash",
  dr.cert_index AS "cert_index",
  (
    CASE
      WHEN dr.deposit >= 0 THEN 'registered'
      ELSE 'deregistered'
    END
  ) AS "action"
FROM drep_hash dh
  JOIN drep_registration dr ON (dh.id = dr.drep_hash_id)
  JOIN tx ON (dr.tx_id = tx.id)
WHERE dh.view = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN dr.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN dr.id
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