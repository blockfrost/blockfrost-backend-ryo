SELECT tx_hash AS "tx_hash",
  cert_index AS "cert_index",
  action AS "action"
FROM (
    (
      SELECT tx.id AS "id",
        encode(tx.hash, 'hex') AS "tx_hash",
        pu.cert_index AS "cert_index",
        'registered' AS "action"
      FROM pool_update pu
        JOIN pool_hash ph ON (ph.id = pu.hash_id)
        JOIN tx ON (tx.id = pu.registered_tx_id)
      WHERE ph.view = $2
    )
    UNION
    (
      SELECT tx.id AS "id",
        encode(tx.hash, 'hex') AS "tx_hash",
        pr.cert_index AS "cert_index",
        'deregistered' AS "action"
      FROM pool_retire pr
        JOIN pool_hash ph ON (ph.id = pr.hash_id)
        JOIN tx ON (tx.id = pr.announced_tx_id)
      WHERE ph.view = $2
    )
  ) AS "updates"
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN (id, cert_index)
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN (id, cert_index)
  END ASC