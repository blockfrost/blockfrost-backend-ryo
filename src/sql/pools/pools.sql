SELECT ph.view AS "pool_id"
FROM pool_hash ph
  JOIN (
    SELECT pu.hash_id,
      pu.registered_tx_id AS "max_registered_tx_id",
      pu.cert_index AS "update_cert_index"
    FROM pool_update pu
      JOIN (
        SELECT hash_id,
          MAX(registered_tx_id) AS tempmax
        FROM pool_update
        GROUP BY hash_id
      ) pumax ON (pumax.hash_id = pu.hash_id)
      AND (pumax.tempmax = pu.registered_tx_id)
  ) pu ON (pu.hash_id = ph.id)
  LEFT JOIN (
    SELECT pr.hash_id,
      pr.announced_tx_id AS "max_announced_tx_id",
      pr.retiring_epoch AS "retiring_epoch",
      pr.cert_index AS "retire_cert_index"
    FROM pool_retire pr
      JOIN (
        SELECT hash_id,
          MAX(announced_tx_id) AS tempmax
        FROM pool_retire
        GROUP BY hash_id
      ) prmax ON (prmax.hash_id = pr.hash_id)
      AND (prmax.tempmax = pr.announced_tx_id)
  ) pr ON (pr.hash_id = ph.id)
WHERE (
    retiring_epoch IS NULL
    OR (
      max_announced_tx_id IS NOT NULL
      AND (
        max_registered_tx_id > max_announced_tx_id
        OR (
          max_registered_tx_id < max_announced_tx_id
          AND retiring_epoch > (
            SELECT MAX(NO)
            FROM epoch
          )
        )
      )
    )
    OR (max_announced_tx_id IS NULL)
    OR (
      max_registered_tx_id = max_announced_tx_id
      AND update_cert_index > retire_cert_index
    )
  )
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN ph.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN ph.id
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