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
  SELECT COALESCE(SUM(amount), 0) AS "amount_rewards",
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
    ) AS "amount_rewards_pool"
  FROM live_stake_accounts lsa
    JOIN reward r ON (lsa.stake_address_id = r.addr_id)
  WHERE spendable_epoch <= (
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
SELECT (
    SELECT live_stake_pool
    FROM live_stake_queried_pool_sum
  )::TEXT AS "live_stake"
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