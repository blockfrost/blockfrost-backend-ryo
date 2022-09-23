SELECT encode(tx_hash, 'hex') AS "tx_hash",
  amount::TEXT AS "amount" -- cast to TEXT to avoid number overflow
FROM(
    SELECT tx.id AS "id",
      tx.hash AS "tx_hash",
      r.amount AS "amount"
    FROM tx
      JOIN reserve r ON (tx.id = r.tx_id)
      JOIN stake_address sa ON (sa.id = r.addr_id)
    WHERE sa.view = $4
    UNION ALL
    SELECT tx.id AS "id",
      tx.hash AS "tx_hash",
      t.amount AS "amount"
    FROM tx
      JOIN treasury t ON (tx.id = t.tx_id)
      JOIN stake_address sa ON (sa.id = t.addr_id)
    WHERE sa.view = $4
  ) AS "unordered_txs"
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