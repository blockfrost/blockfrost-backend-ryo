WITH queried_metadata AS (
  SELECT txm.json->'metadata' AS "metadata_url",
    txm.json->'hash' AS "metadata_hash"
  FROM tx_out txo
    JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
  WHERE txm.id = (
      SELECT MAX(txm.id)
      FROM tx_out txo
        JOIN tx_metadata txm ON (txo.tx_id = txm.tx_id)
      WHERE (
          txo.address = $1
          OR txo.payment_cred = $2
        )
        AND txm.key = 1967
    )
)
SELECT (
    SELECT address
    FROM tx_out txo
    WHERE txo.address = $1
      OR txo.payment_cred = $2
    LIMIT 1
  ) AS "address",
  (
    SELECT metadata_url
    FROM queried_metadata
  ) AS "metadata_url",
  (
    SELECT metadata_hash
    FROM queried_metadata
  ) AS "metadata_hash",
  null AS "metadata"