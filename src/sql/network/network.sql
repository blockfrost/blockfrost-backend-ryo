/* most CTEs are potentially (mainnet) heavy queries => use cache if needed */
WITH current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
), active_stake AS (
  SELECT es.epoch_no AS "epoch_no",
    SUM(es.amount) AS "amount"
  FROM epoch_stake es
  WHERE es.epoch_no = (
      SELECT epoch_no
      FROM current_epoch
    )
  GROUP BY es.epoch_no
),
circulating_supply AS (
  SELECT (
      (
        SELECT COALESCE(SUM(txo.value), 0)
      ) + (
        SELECT COALESCE(SUM(amount), 0)
        FROM reward
        WHERE spendable_epoch <= (
            SELECT *
            FROM current_epoch
          )
      ) + (
        SELECT COALESCE(SUM(amount), 0)
        FROM instant_reward
        WHERE spendable_epoch <= (
            SELECT *
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
locked_supply AS (
  SELECT SUM (value) AS "locked"
  FROM tx_out txo
  WHERE txo.address_has_script = true
    AND NOT EXISTS (
      SELECT txo2.id
      FROM tx_out txo2
        JOIN tx_in txi on txo2.tx_id = txi.tx_out_id
        AND txo2.index = txi.tx_out_index
      WHERE txo.id = txo2.id
    )
),
active_pools AS (
  SELECT ph.id AS "pool_hash_id"
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
),
live_stake_accounts AS (
  SELECT d.addr_id AS "stake_address_id",
    d.pool_hash_id AS "pool_id"
  FROM delegation d
    JOIN active_pools ap ON (d.pool_hash_id = ap.pool_hash_id)
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
  SELECT COALESCE(SUM(txo.value), 0) AS "amounts"
  FROM live_stake_accounts lsa
    JOIN tx_out txo USING (stake_address_id)
    LEFT JOIN tx_in txi ON (txo.tx_id = txi.tx_out_id)
    AND (txo.index = txi.tx_out_index)
  WHERE txi IS NULL
),
live_stake_accounts_rewards AS (
  SELECT COALESCE(SUM(amount), 0) AS "amount_rewards"
  FROM live_stake_accounts lsa
    JOIN reward r ON (lsa.stake_address_id = r.addr_id)
  WHERE spendable_epoch <= (
      SELECT epoch_no
      FROM current_epoch
    )
),
live_stake_accounts_withdrawal AS (
  SELECT COALESCE(SUM(amount), 0) AS "amount_withdrawals"
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
)
SELECT *
FROM (
    SELECT json_build_object(
        'max',
        max_supply,
        'circulating',
        circulating_supply,
        'total',
        total_supply,
        'locked',
        locked_supply,
        'treasury',
        treasury_supply,
        'reserves',
        reserves_supply
      ) AS "supply"
    FROM (
        SELECT (
            SELECT 45000000000000000
          )::TEXT AS "max_supply",
          -- cast to TEXT to avoid number overflow
          (
            SELECT *
            FROM circulating_supply
          )::TEXT AS "circulating_supply",
          -- cast to TEXT to avoid number overflow
          (
            SELECT 45000000000000000 - reserves
            FROM ada_pots
            ORDER BY epoch_no desc
            LIMIT 1
          )::TEXT AS "total_supply",
          -- cast to TEXT to avoid number overflow
          (
            SELECT *
            FROM locked_supply
          )::TEXT AS "locked_supply",
          -- cast to TEXT to avoid number overflow
          (
            SELECT treasury
            FROM ada_pots
            WHERE epoch_no = (
                SELECT *
                FROM current_epoch
              )
          )::TEXT AS "treasury_supply",
          -- cast to TEXT to avoid number overflow
          (
            SELECT reserves
            FROM ada_pots
            WHERE epoch_no = (
                SELECT *
                FROM current_epoch
              )
          )::TEXT AS "reserves_supply" -- cast to TEXT to avoid number overflow
      ) AS "supply_subquery"
  ) AS "supply_json",
  (
    SELECT json_build_object('live', live_stake, 'active', active_stake) AS "stake"
    FROM (
        SELECT (
            SELECT SUM(live_stake)
            FROM live_stake_sum
          )::TEXT AS "live_stake",
          -- cast to TEXT to avoid number overflow
          (
            SELECT amount
            FROM active_stake
          )::TEXT AS "active_stake" -- cast to TEXT to avoid number overflow
      ) "stake_subquery"
  ) AS "stake_json"