WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
)
SELECT "address" AS "address",
  (
    (
      SELECT COALESCE(SUM(txo.value), 0)
      FROM tx_out txo
        LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
        AND (txo.index = txi.tx_out_index)
      WHERE txi IS NULL
        AND txo.stake_address_id = address_id
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward r
      WHERE (r.addr_id = address_id)
        AND r.spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
    ) + (
      SELECT COALESCE(SUM(amount), 0)
      FROM reward_rest rr
      WHERE (rr.addr_id = address_id)
        AND rr.spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
    ) - (
      SELECT COALESCE(SUM(amount), 0)
      FROM withdrawal w
      WHERE (w.addr_id = address_id)
    )
  )::TEXT AS "live_stake" -- cast to TEXT to avoid number overflow
FROM (
    SELECT sa.view AS "address",
      d.addr_id AS "address_id",
      d.id AS "did"
    FROM delegation d
      JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
      JOIN stake_address sa ON (sa.id = d.addr_id)
    WHERE ph.view = $4
      AND d.id = (
        SELECT MAX(id)
        FROM delegation
        WHERE addr_id = d.addr_id
      )
      -- d is the account's latest delegation. A delegation needs a registered
      -- account, so the account is still delegated unless it deregistered later.
      -- A later registration does not bring the delegation back.
      -- Compare cert_index when both certificates are in the same transaction.
      AND NOT EXISTS (
        SELECT 1
        FROM stake_deregistration sd
        WHERE sd.addr_id = d.addr_id
          AND ROW(sd.tx_id, sd.cert_index) > ROW(d.tx_id, d.cert_index)
      )
      -- a pool retirement that took effect after the delegation cleared it
      AND NOT EXISTS (
        SELECT 1
        FROM pool_retire pr
        WHERE pr.hash_id = d.pool_hash_id
          AND pr.retiring_epoch <= (
            SELECT epoch_no
            FROM current_epoch
          )
          AND pr.retiring_epoch > (
            SELECT b.epoch_no
            FROM tx
              JOIN block b ON (b.id = tx.block_id)
            WHERE tx.id = d.tx_id
          )
          -- a later certificate of the pool before the retiring epoch cancels the retirement
          AND NOT EXISTS (
            SELECT 1
            FROM (
                SELECT pu.registered_tx_id AS "tx_id",
                  pu.cert_index
                FROM pool_update pu
                WHERE pu.hash_id = pr.hash_id
                UNION ALL
                SELECT pr_next.announced_tx_id,
                  pr_next.cert_index
                FROM pool_retire pr_next
                WHERE pr_next.hash_id = pr.hash_id
              ) cert
              JOIN tx ON (tx.id = cert.tx_id)
              JOIN block b ON (b.id = tx.block_id)
            WHERE ROW(cert.tx_id, cert.cert_index) > ROW(pr.announced_tx_id, pr.cert_index)
              AND b.epoch_no < pr.retiring_epoch
          )
      )
    GROUP BY sa.view,
      d.pool_hash_id,
      d.addr_id,
      d.id
    ORDER BY CASE
        WHEN LOWER($1) = 'desc' THEN d.id
      END DESC,
      CASE
        WHEN LOWER($1) <> 'desc'
        OR $1 IS NULL THEN d.id
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
  ) "sorted_limited"
GROUP BY address,
  address_id,
  did
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN did
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN did
  END ASC