WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
), queried_addr AS (
  SELECT id
  FROM stake_address
  WHERE view = $1
),
queried_pool AS (
  SELECT ph.view AS "pool_id"
  FROM stake_address sa
    JOIN stake_registration sr ON (sr.addr_id = sa.id)
    JOIN delegation d ON (d.addr_id = sa.id)
    JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
  WHERE sa.view = $1
    AND d.id = (
      SELECT MAX(id)
      FROM delegation
      WHERE addr_id = sa.id
    )
    AND sr.tx_id = (
      SELECT MAX(tx_id)
      FROM stake_registration
      WHERE addr_id = sa.id
    )
    AND (
      sr.tx_id > (
        SELECT COALESCE(MAX(tx_id), 0) -- handles IS NULL option so we don't have to run that query again
        FROM stake_deregistration
        WHERE addr_id = sa.id
      )
    )
)
SELECT sa.view AS "stake_address",
  (
    CASE
      WHEN (
        SELECT pool_id
        FROM queried_pool
      ) IS NOT NULL THEN true
      ELSE false
    END
  ) AS "active",
  (
    SELECT b.epoch_no
    FROM block b
    WHERE b.id = (
        SELECT tx.block_id
        FROM tx
        WHERE tx.id = (
            SELECT GREATEST(MAX(srtemp.tx_id), MAX(sdtemp.tx_id))
            FROM stake_registration srtemp
              JOIN stake_address satemp ON (satemp.id = srtemp.addr_id)
              LEFT JOIN stake_deregistration sdtemp ON (sdtemp.addr_id = srtemp.addr_id)
            WHERE satemp.view = $1
          )
      )
  ) AS "active_epoch",
  (
    (
      SELECT COALESCE(SUM(txo.value), 0)
      FROM stake_address sa
        JOIN tx_out txo ON (txo.stake_address_id = sa.id)
        LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
        AND (txo.index = txi.tx_out_index)
      WHERE txi IS NULL
        AND txo.stake_address_id = (
          SELECT *
          FROM queried_addr
        )
    ) + COALESCE(rewards_sum.amount, 0) + COALESCE(instant_rewards_sum.amount, 0) + COALESCE(refunds_sum.amount, 0) - COALESCE(withdrawals_sum.amount, 0)
     -- SUM of all utxos + withdrawables (rewards (all types including rewards + refunds + treasury + reserves) - withdrawals
  )::TEXT AS "controlled_amount", -- cast to TEXT to avoid number overflow
  (
    COALESCE(rewards_sum.amount, 0) + COALESCE(instant_rewards_sum.amount, 0)
  )::TEXT AS "rewards_sum", -- cast to TEXT to avoid number overflow
  COALESCE(withdrawals_sum.amount, 0)::TEXT AS "withdrawals_sum", -- cast to TEXT to avoid number overflow
  COALESCE(reserves_sum.amount, 0)::TEXT AS "reserves_sum", -- cast to TEXT to avoid number overflow
  COALESCE(treasury_sum.amount, 0)::TEXT AS "treasury_sum", -- cast to TEXT to avoid number overflow
  (
    COALESCE(rewards_sum.amount, 0) + COALESCE(instant_rewards_sum.amount, 0) + COALESCE(refunds_sum.amount, 0) - COALESCE(withdrawals_sum.amount, 0)
  )::TEXT AS "withdrawable_amount", -- cast to TEXT to avoid number overflow
  (
    SELECT pool_id
    FROM queried_pool
  ) AS "pool_id"
FROM stake_address sa
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM reward
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
        AND spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
        AND type <> 'refund'
      )
    GROUP BY addr_id
  ) AS "rewards_sum" ON (rewards_sum.addr_id = sa.id)
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM instant_reward
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
        AND spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
      )
    GROUP BY addr_id
  ) AS "instant_rewards_sum" ON (instant_rewards_sum.addr_id = sa.id)
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM reward
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
        AND spendable_epoch <= (
          SELECT *
          FROM current_epoch
        )
        AND type = 'refund'
      )
    GROUP BY addr_id
  ) AS "refunds_sum" ON (refunds_sum.addr_id = sa.id)
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM withdrawal
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
      )
    GROUP BY addr_id
  ) AS "withdrawals_sum" ON (withdrawals_sum.addr_id = sa.id)
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM reserve
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
      )
    GROUP BY addr_id
  ) AS "reserves_sum" ON (reserves_sum.addr_id = sa.id)
  LEFT JOIN (
    SELECT addr_id,
      SUM(amount) AS "amount"
    FROM treasury
    WHERE (
        addr_id = (
          SELECT *
          FROM queried_addr
        )
      )
    GROUP BY addr_id
  ) AS "treasury_sum" ON (treasury_sum.addr_id = sa.id)
WHERE sa.view = $1