WITH last_update AS (
  SELECT MAX(registered_tx_id)
  FROM pool_update pu
    JOIN pool_hash ph ON (ph.id = pu.hash_id)
  WHERE ph.view = $1
)
SELECT (
    SELECT ph.view
    FROM pool_hash ph
    WHERE ph.view = $1
  ) AS "pool_id",
  (
    SELECT encode(hash_raw, 'hex')
    FROM pool_hash ph
    WHERE ph.view = $1
  ) AS "hex",
  url AS "url",
  encode(pmr.hash, 'hex') AS "hash",
  pod.ticker_name AS "ticker",
  pod.json AS "metadata_text"
FROM pool_metadata_ref pmr
  LEFT JOIN off_chain_pool_data pod ON (pmr.hash = pod.hash)
WHERE pmr.id = (
    SELECT meta_id
    FROM pool_update pu
      JOIN pool_hash ph ON (ph.id = pu.hash_id)
    WHERE pu.registered_tx_id = (
        SELECT *
        FROM last_update
      )
      AND ph.view = $1
  )