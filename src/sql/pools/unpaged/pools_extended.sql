/* live_stake_* CTEs are potentially (mainnet) heavy queries => use cache if needed */
WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
), queried_pools AS (
  SELECT ph.id AS "pool_hash_id",
    ph.view AS "pool_id",
    encode(ph.hash_raw, 'hex') AS "hex"
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
  GROUP BY ph.id
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN ph.id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN ph.id
    END ASC
),
live_stake_accounts AS (
  SELECT d.addr_id AS "stake_address_id",
    d.pool_hash_id AS "pool_hash_id"
  FROM delegation d
    JOIN stake_registration sr ON (sr.addr_id = d.addr_id)
    LEFT JOIN (
      SELECT addr_id,
        MAX(tx_id) AS tempmax
      FROM stake_deregistration
      GROUP BY addr_id
    ) deregmax ON (deregmax.addr_id = d.addr_id)
    JOIN queried_pools qp ON (qp.pool_hash_id = d.pool_hash_id)
  WHERE d.id = (
      SELECT MAX(id)
      FROM delegation
      WHERE addr_id = d.addr_id
    )
    AND sr.tx_id = (
      SELECT MAX(tx_id)
      FROM stake_registration
      WHERE addr_id = d.addr_id
    )
    AND (
      (
        deregmax.tempmax IS NOT NULL
        AND sr.tx_id > (
          SELECT MAX(tx_id)
          FROM stake_deregistration
          WHERE addr_id = d.addr_id
        )
      )
      OR (deregmax.tempmax IS NULL)
    )
),
live_stake_accounts_amounts AS (
  SELECT pool_hash_id,
    COALESCE(SUM(txo.value), 0) AS "amounts_pool"
  FROM live_stake_accounts lsa
    JOIN tx_out txo USING (stake_address_id)
    LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
    AND (txo.index = txi.tx_out_index)
  WHERE txi IS NULL
  GROUP BY pool_hash_id
),
live_stake_accounts_rewards AS (
  SELECT lsa.pool_hash_id,
    COALESCE(SUM(amount), 0) AS "amount_rewards_pool"
  FROM live_stake_accounts lsa
    JOIN reward r ON (lsa.stake_address_id = r.addr_id)
  WHERE type <> 'refund'
    AND spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
  GROUP BY lsa.pool_hash_id
),
live_stake_accounts_instant_rewards AS (
  SELECT lsa.pool_hash_id,
    COALESCE(SUM(amount), 0) AS "amount_instant_rewards_pool"
  FROM live_stake_accounts lsa
    JOIN instant_reward ir ON (lsa.stake_address_id = ir.addr_id)
  WHERE spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
  GROUP BY lsa.pool_hash_id
),
live_stake_accounts_refunds AS (
  SELECT lsa.pool_hash_id,
    COALESCE(SUM(amount), 0) AS "amount_refunds_pool"
  FROM live_stake_accounts lsa
    JOIN reward r ON (lsa.stake_address_id = r.addr_id)
  WHERE type = 'refund'
    AND spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
  GROUP BY lsa.pool_hash_id
),
live_stake_accounts_withdrawal AS (
  SELECT pool_hash_id,
    COALESCE(SUM(amount), 0) AS "amount_withdrawals_pool"
  FROM live_stake_accounts lsa
    JOIN withdrawal w ON (lsa.stake_address_id = w.addr_id)
  GROUP BY pool_hash_id
),
live_stake_queried_pools_sum AS (
  SELECT qp.pool_hash_id AS "pool_hash_id",
    (
      (COALESCE(amounts_pool, 0)) + (COALESCE(amount_rewards_pool, 0)) + (COALESCE(amount_instant_rewards_pool, 0)) + (COALESCE(amount_refunds_pool, 0)) - (COALESCE(amount_withdrawals_pool, 0))
    ) AS "live_stake_pool"
  FROM queried_pools qp
    LEFT JOIN live_stake_accounts_amounts USING (pool_hash_id)
    LEFT JOIN live_stake_accounts_rewards USING (pool_hash_id)
    LEFT JOIN live_stake_accounts_instant_rewards USING (pool_hash_id)
    LEFT JOIN live_stake_accounts_refunds USING (pool_hash_id)
    LEFT JOIN live_stake_accounts_withdrawal USING (pool_hash_id)
  GROUP BY pool_hash_id,
    amounts_pool,
    amount_rewards_pool,
    amount_instant_rewards_pool,
    amount_refunds_pool,
    amount_withdrawals_pool
)
SELECT qp.pool_id AS "pool_id",
  qp.hex AS "hex",
  COALESCE(
    (
      SELECT COALESCE(SUM(es.amount), 0)
      FROM epoch_stake es
      WHERE es.pool_id = qp.pool_hash_id
        AND es.epoch_no = (
          SELECT epoch_no
          FROM current_epoch
        )
    ),
    0
  )::TEXT AS "active_stake",
  -- cast to TEXT to avoid number overflow
  (
    COALESCE(
      (
        SELECT live_stake_pool
        FROM live_stake_queried_pools_sum lsqps
        WHERE qp.pool_hash_id = lsqps.pool_hash_id
      ),
      0
    )
  )::TEXT AS "live_stake" -- cast to TEXT to avoid number overflow
FROM queried_pools qp
GROUP BY qp.pool_hash_id,
  qp.pool_id,
  qp.hex
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN qp.pool_hash_id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN qp.pool_hash_id
  END ASC