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
          CASE
            WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
            ELSE txo.address = $1
          END
        )
        AND txm.key = 1967
    )
)
SELECT (
    SELECT address
    FROM tx_out txo
    WHERE (
        CASE
          WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = $2
          ELSE txo.address = $1
        END
      )
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