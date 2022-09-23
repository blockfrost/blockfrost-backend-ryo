SELECT ph.view AS "pool_id",
  pr.retiring_epoch AS "epoch"
FROM pool_hash ph
  JOIN (
    SELECT pu.hash_id,
      pu.registered_tx_id AS "max_registered_tx_id",
      pu.cert_index AS "update_cert_index"
    FROM pool_update pu
      JOIN (
        SELECT DISTINCT ON (hash_id) hash_id AS "hash_id",
          registered_tx_id AS "tempmax",
          cert_index AS "tempindex"
        FROM pool_update
        GROUP BY hash_id,
          registered_tx_id,
          cert_index
        ORDER BY hash_id,
          registered_tx_id DESC,
          cert_index DESC
      ) pumax ON (pumax.hash_id = pu.hash_id)
      AND (pumax.tempmax = pu.registered_tx_id)
      AND (pumax.tempindex = pu.cert_index)
  ) pu ON (pu.hash_id = ph.id)
  LEFT JOIN (
    SELECT pr.hash_id,
      pr.announced_tx_id AS max_announced_tx_id,
      pr.retiring_epoch,
      pr.cert_index AS "retire_cert_index"
    FROM pool_retire pr
      JOIN (
        SELECT DISTINCT ON (hash_id) hash_id AS "hash_id",
          announced_tx_id AS "tempmax",
          cert_index AS "tempindex"
        FROM pool_retire
        GROUP BY hash_id,
          announced_tx_id,
          cert_index
        ORDER BY hash_id,
          announced_tx_id DESC,
          cert_index DESC
      ) prmax ON (prmax.hash_id = pr.hash_id)
      AND (prmax.tempmax = pr.announced_tx_id)
      AND (prmax.tempindex = pr.cert_index)
  ) pr ON (pr.hash_id = ph.id)
WHERE (
    retiring_epoch <= (
      SELECT MAX(NO)
      FROM epoch
    )
    AND (
      (
        max_announced_tx_id IS NOT NULL
        AND max_announced_tx_id > max_registered_tx_id
      )
      OR (
        max_announced_tx_id = max_registered_tx_id
        AND retire_cert_index > update_cert_index
      )
    )
  )
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN (pr.retiring_epoch, max_announced_tx_id)
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN (pr.retiring_epoch, max_announced_tx_id)
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