SELECT encode(tx.hash, 'hex') AS "tx_hash",
  dr.cert_index AS "cert_index",
  (
    CASE
      WHEN dr.deposit > 0 THEN 'registered'
      WHEN dr.deposit < 0 THEN 'deregistered'
      ELSE 'updated'
    END
  ) AS "action"
FROM drep_hash dh
  JOIN drep_registration dr ON (dh.id = dr.drep_hash_id)
  JOIN tx ON (dr.tx_id = tx.id)
WHERE (
    ($2::bytea IS NOT NULL AND dh.raw = $2) OR
    ($2 IS NULL AND dh.view = $3)
  )
  AND dh.has_script = $4
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN dr.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN dr.id
  END ASC