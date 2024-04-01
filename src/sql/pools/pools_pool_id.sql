/* circulating_supply and live_stake_* CTEs are potentially (mainnet) heavy queries => use cache if needed */
WITH current_epoch AS (
  SELECT b.epoch_no AS "epoch_no"
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
), queried_pool AS (
  SELECT MAX(pu.id) AS "update_id",
    ph.id AS "pool_id"
  FROM pool_update pu
    JOIN pool_hash ph ON (ph.id = pu.hash_id)
  WHERE ph.view = $1
  GROUP BY ph.id
),
queried_stake AS (
  SELECT COALESCE(SUM(es.amount), 0) AS "amount",
    COALESCE(
      SUM(
        CASE
          WHEN ph.view = $1 THEN es.amount
          ELSE 0
        END
      ),
      0
    ) AS "amount_pool"
  FROM epoch_stake es
    JOIN pool_hash ph ON (ph.id = es.pool_id)
  WHERE es.epoch_no = (
      SELECT epoch_no
      FROM current_epoch
    )
),
circulating_supply AS (
  SELECT (
      (
        SELECT COALESCE(SUM(txo.value), 0)
      ) + (
        SELECT COALESCE(SUM(amount), 0)
        FROM reward
        WHERE spendable_epoch <= (
            SELECT epoch_no
            FROM current_epoch
          )
      ) + (
        SELECT COALESCE(SUM(amount), 0)
        FROM instant_reward
        WHERE spendable_epoch <= (
            SELECT epoch_no
            FROM current_epoch
          )
      ) - (
        SELECT COALESCE(SUM(amount), 0)
        FROM withdrawal
      )
    ) AS "circulating_supply"
    /*
     circulating_supply = SUM of all utxos + withdrawables
     withdrawables = rewards (all types including rewards + refunds + treasury + reserves) - withdrawals
     */
  FROM tx_out txo
    LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
    AND (txo.index = txi.tx_out_index)
  WHERE txi IS NULL
),
queried_addr AS (
  SELECT id
  FROM (
      (
        /*
         only the pool owner addresses are calculated in the pledge,
         reward address IS NOT part of the pledge (alone, if it's not one of the owners)
         moreover, it HAS TO be delegated (last part of the query) to that particular pool
         */
        SELECT DISTINCT sa.id
        FROM pool_update pu
          JOIN pool_hash ph ON (ph.id = pu.hash_id)
          JOIN pool_owner po ON (po.pool_update_id = pu.id)
          JOIN stake_address sa ON (sa.id = po.addr_id)
          JOIN delegation d ON (d.addr_id = sa.id)
        WHERE ph.view = $1
          AND po.pool_update_id = (
            SELECT MAX(id)
            FROM pool_update
            WHERE hash_id = pu.hash_id
          )
          AND d.pool_hash_id = ph.id
          AND d.tx_id = (
            SELECT MAX(tx_id)
            FROM delegation
            WHERE addr_id = sa.id
          )
      )
    ) AS "addresses"
),
all_pools AS (
  SELECT ph.id AS "pool_hash_id",
    CASE
      WHEN (
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
      ) THEN 'active'
      ELSE 'retired'
    END AS "state"
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
),
live_stake_accounts AS (
  SELECT d.addr_id AS "stake_address_id",
    d.pool_hash_id AS "pool_id"
  FROM delegation d
    JOIN all_pools ap ON (d.pool_hash_id = ap.pool_hash_id)
    JOIN stake_registration sr ON (sr.addr_id = d.addr_id)
    LEFT JOIN (
      SELECT addr_id,
        MAX(tx_id) AS tempmax
      FROM stake_deregistration
      GROUP BY addr_id
    ) deregmax ON (deregmax.addr_id = d.addr_id)
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
    AND ap.state = 'active'
),
live_stake_accounts_amounts AS (
  SELECT COALESCE(SUM(txo.value), 0) AS "amounts",
    COALESCE(
      SUM(
        CASE
          WHEN lsa.pool_id = (
            SELECT pool_id
            FROM queried_pool
          ) THEN txo.value
          ELSE 0
        END
      ),
      0
    ) AS "amounts_pool"
  FROM live_stake_accounts lsa
    JOIN tx_out txo USING (stake_address_id)
    LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
    AND (txo.index = txi.tx_out_index)
  WHERE txi IS NULL
),
live_stake_accounts_rewards AS (
  SELECT (COALESCE(SUM(r.amount), 0)) AS "amount_rewards",
    COALESCE(
      SUM(
        CASE
          WHEN lsa.pool_id = (
            SELECT pool_id
            FROM queried_pool
          ) THEN r.amount
          ELSE 0
        END
      ),
      0
    ) AS "amount_rewards_pool"
  FROM live_stake_accounts lsa
    JOIN reward r ON (lsa.stake_address_id = r.addr_id)
  WHERE r.spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
),
live_stake_accounts_instant_rewards AS (
  SELECT (COALESCE(SUM(ir.amount), 0)) AS "amount_instant_rewards"
  FROM live_stake_accounts lsa
    JOIN instant_reward ir ON (lsa.stake_address_id = ir.addr_id)
  WHERE ir.spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
),
live_stake_accounts_withdrawal AS (
  SELECT COALESCE(SUM(amount), 0) AS "amount_withdrawals",
    COALESCE(
      SUM(
        CASE
          WHEN lsa.pool_id = (
            SELECT pool_id
            FROM queried_pool
          ) THEN amount
          ELSE 0
        END
      ),
      0
    ) AS "amount_withdrawals_pool"
  FROM live_stake_accounts lsa
    JOIN withdrawal w ON (lsa.stake_address_id = w.addr_id)
),
live_stake_sum AS (
  SELECT (
      (
        SELECT COALESCE(amounts, 0)
        FROM live_stake_accounts_amounts
      ) + (
        SELECT COALESCE(amount_rewards, 0)
        FROM live_stake_accounts_rewards
      ) + (
        SELECT COALESCE(amount_instant_rewards, 0)
        FROM live_stake_accounts_instant_rewards
      ) - (
        SELECT COALESCE(amount_withdrawals, 0)
        FROM live_stake_accounts_withdrawal
      )
    ) AS "live_stake"
),
live_stake_queried_pool_sum AS (
  SELECT (
      (
        SELECT COALESCE(amounts_pool, 0)
        FROM live_stake_accounts_amounts
      ) + (
        SELECT COALESCE(amount_rewards_pool, 0)
        FROM live_stake_accounts_rewards
      ) - (
        SELECT COALESCE(amount_withdrawals_pool, 0)
        FROM live_stake_accounts_withdrawal
      )
    ) AS "live_stake_pool"
)
SELECT ph.view AS "pool_id",
  encode(ph.hash_raw, 'hex') AS "hex",
  encode(pu.vrf_key_hash, 'hex') AS "vrf_key",
  (
    SELECT COUNT(*)
    FROM block b
      JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
    WHERE ph.view = $1
  ) AS "blocks_minted",
  (
    SELECT COUNT(*)
    FROM block b
      JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
    WHERE ph.view = $1
      AND b.epoch_no = (
        SELECT epoch_no
        FROM current_epoch
      )
  ) AS "blocks_epoch",
  (
    SELECT amount_pool
    FROM queried_stake
  )::TEXT AS "active_stake",
  -- cast to TEXT to avoid number overflow
  (
    (
      SELECT amount_pool
      FROM queried_stake
    ) / (
      SELECT amount
      FROM queried_stake
    )
  )::FLOAT AS "active_size",
  (
    SELECT live_stake_pool
    FROM live_stake_queried_pool_sum
  )::TEXT AS "live_stake",
  -- cast to TEXT to avoid number overflow
  (
    (
      SELECT live_stake_pool
      FROM live_stake_queried_pool_sum
    ) / (
      SELECT SUM(live_stake)
      FROM live_stake_sum
    )
  )::FLOAT AS "live_size",
  (
    COALESCE(
      (
        SELECT live_stake_pool
        FROM live_stake_queried_pool_sum
      ) / (
        (
          SELECT *
          FROM circulating_supply
        ) / (
          SELECT optimal_pool_count
          FROM epoch_param
          ORDER BY epoch_no DESC
          LIMIT 1
        )
      ), 0
    )
  )::FLOAT AS "live_saturation",
  (
    SELECT COUNT(DISTINCT d.id)
    FROM delegation d
      JOIN pool_hash ph ON (ph.id = d.pool_hash_id)
      JOIN stake_address sa ON (sa.id = d.addr_id)
      JOIN stake_registration sr ON (sr.addr_id = d.addr_id)
      LEFT JOIN stake_deregistration sd ON (sd.addr_id = d.addr_id)
      LEFT JOIN (
        SELECT addr_id,
          MAX(tx_id) AS tempmax
        FROM stake_deregistration
        GROUP BY addr_id
      ) deregmax ON (deregmax.addr_id = d.addr_id)
      AND (deregmax.tempmax = sd.tx_id)
    WHERE ph.view = $1
      AND d.id = (
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
          sd.tx_id IS NOT NULL
          AND sr.tx_id > (
            SELECT MAX(tx_id)
            FROM stake_deregistration
            WHERE addr_id = d.addr_id
          )
        )
        OR (sd.tx_id IS NULL)
      )
  ) AS "live_delegators",
  pu.pledge::TEXT AS "declared_pledge",
  -- cast to TEXT to avoid number overflow
  (
    SELECT COALESCE((amount + rewards_minus_withdrawals), 0)
    FROM (
        SELECT (
            SELECT COALESCE(SUM(txo.value), 0)
            FROM tx_out txo
              LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
              AND (txo.index = txi.tx_out_index)
            WHERE txi IS NULL
              AND txo.stake_address_id IN (
                SELECT *
                FROM queried_addr
              )
          ) AS "amount",
          (
            (
              COALESCE(
                (
                  SELECT SUM(amount) AS "amount"
                  FROM reward
                  WHERE (
                      addr_id IN (
                        SELECT *
                        FROM queried_addr
                      )
                    )
                    AND spendable_epoch <= (
                      SELECT epoch_no
                      FROM current_epoch
                    )
                ),
                0
              ) + COALESCE(
                (
                  SELECT SUM(amount) AS "amount"
                  FROM instant_reward
                  WHERE (
                      addr_id IN (
                        SELECT *
                        FROM queried_addr
                      )
                    )
                    AND spendable_epoch <= (
                      SELECT epoch_no
                      FROM current_epoch
                    )
                ),
                0
              ) - COALESCE(
                (
                  SELECT SUM(amount) AS "amount"
                  FROM withdrawal
                  WHERE (
                      addr_id IN (
                        SELECT *
                        FROM queried_addr
                      )
                    )
                ),
                0
              )
            )
          ) AS "rewards_minus_withdrawals"
      ) AS "temppledge"
  )::TEXT AS "live_pledge",
  -- cast to TEXT to avoid number overflow
  pu.margin AS "margin_cost",
  pu.fixed_cost::TEXT AS "fixed_cost",
  -- cast to TEXT to avoid number overflow
  sa.view AS "reward_account",
  ARRAY (
    SELECT sa.view
    FROM pool_owner po
      JOIN pool_update pu ON (pu.id = po.pool_update_id)
      JOIN stake_address sa ON (sa.id = po.addr_id)
      JOIN pool_hash ph ON (ph.id = pu.hash_id)
    WHERE ph.view = $1
      AND pu.id = (
        SELECT update_id
        FROM queried_pool
      )
    GROUP BY po.id,
      sa.view
  ) AS "owners",
  ARRAY (
    SELECT encode(HASH, 'hex')
    FROM tx
      JOIN pool_update pu ON (pu.registered_tx_id = tx.id)
      JOIN pool_hash ph ON (ph.id = pu.hash_id)
    WHERE ph.view = $1
    ORDER BY tx.id
  ) AS "registration",
  ARRAY (
    SELECT encode(HASH, 'hex')
    FROM tx
      JOIN pool_retire pr ON (pr.announced_tx_id = tx.id)
      JOIN pool_hash ph ON (ph.id = pr.hash_id)
    WHERE ph.view = $1
    ORDER BY tx.id
  ) AS "retirement"
FROM pool_hash ph
  JOIN pool_update pu ON (pu.hash_id = ph.id)
  LEFT JOIN stake_address sa ON (sa.id = pu.reward_addr_id)
WHERE ph.view = $1
  AND pu.registered_tx_id = (
    SELECT MAX(registered_tx_id)
    FROM pool_update
    WHERE hash_id = pu.hash_id
  )
GROUP BY pu.vrf_key_hash,
  pu.pledge,
  pu.margin,
  pu.fixed_cost,
  sa.view,
  ph.id
ORDER BY ph.id