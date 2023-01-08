WITH queried_pool_id AS (
  SELECT ph.id AS "pool_id"
  FROM pool_hash ph
  WHERE ph.view = $2
),
current_epoch AS (
  SELECT b.epoch_no
  FROM block b
  ORDER BY b.id DESC
  LIMIT 1
), queried_pool AS (
  SELECT e.no AS "epoch_no",
    ph.id AS "pool_id",
    COALESCE(blocks.count, 0) AS "blocks",
    COALESCE(stake_sum.delegators, 0) AS "delegators",
    stake_sum.amount AS "active_stake",
    stake_sum_all.amount AS "active_stake_all",
    (
      SELECT stake_sum.amount / stake_sum_all.amount
    )::FLOAT AS "active_size",
    COALESCE(rewards_sum.rewards, 0) AS "rewards",
    COALESCE(
      (
        SELECT CASE
            WHEN rewards IS NULL THEN 0
            WHEN rewards < fee THEN rewards
            ELSE FLOOR(fee + (rewards - fee) * margin)
          END
        FROM (
            SELECT COALESCE(rewards_sum.rewards, 0) AS "rewards",
              pu.margin AS "margin",
              pu.fixed_cost AS "fee"
            FROM pool_update pu
            WHERE pu.hash_id = ph.id
              AND pu.registered_tx_id = (
                SELECT MAX(registered_tx_id)
                FROM pool_update
                WHERE active_epoch_no <= e.no
                  AND hash_id = ph.id
              )
              AND pu.cert_index = (
                SELECT MAX(cert_index)
                FROM pool_update putemp
                WHERE putemp.registered_tx_id = (
                    SELECT MAX(registered_tx_id)
                    FROM pool_update
                    WHERE active_epoch_no <= e.no
                      AND hash_id = ph.id
                  )
              )
          ) AS "tempfees"
      ),
      0
    ) AS "fees"
  FROM pool_hash ph
    CROSS JOIN epoch e
    JOIN (
      SELECT es.epoch_no,
        COALESCE(COUNT(es.id), 0) AS "delegators",
        COALESCE(SUM(es.amount), 0) AS "amount"
      FROM epoch_stake es
      WHERE es.pool_id = (
          SELECT pool_id
          FROM queried_pool_id
        )
      GROUP BY es.epoch_no
    ) AS "stake_sum" ON (stake_sum.epoch_no = e.no)
    JOIN (
      SELECT es.epoch_no,
        COALESCE(SUM(es.amount), 0) AS "amount"
      FROM epoch_stake es
      GROUP BY es.epoch_no
    ) AS "stake_sum_all" ON (stake_sum_all.epoch_no = e.no)
    LEFT JOIN (
      SELECT r.pool_id,
        r.earned_epoch,
        COALESCE(SUM(amount), 0) AS "rewards"
      FROM reward r
      WHERE type <> 'refund'
      GROUP BY r.pool_id,
        r.earned_epoch
    ) AS "rewards_sum" ON (
      rewards_sum.pool_id = ph.id
      AND rewards_sum.earned_epoch = e.no
    )
    LEFT JOIN (
      SELECT sl.pool_hash_id,
        b.epoch_no,
        COUNT(*) AS "count"
      FROM block b
        JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      GROUP BY sl.pool_hash_id,
        b.epoch_no
    ) AS "blocks" ON (
      blocks.pool_hash_id = ph.id
      AND blocks.epoch_no = e.no
    )
  WHERE e.no <= (
      SELECT epoch_no
      FROM current_epoch
    )
    AND ph.view = $2
  GROUP BY e.no,
    ph.id,
    stake_sum.amount,
    stake_sum_all.amount,
    rewards_sum.rewards,
    stake_sum.delegators,
    blocks.count
)
SELECT e.no AS "epoch",
  COALESCE(qp.blocks, 0) AS "blocks",
  COALESCE(qp.delegators, 0) AS "delegators_count",
  COALESCE(qp.active_stake, 0)::TEXT AS "active_stake", -- cast to TEXT to avoid number overflow
  (
    SELECT COALESCE(qp.active_stake, 0) / (qp.active_stake_all)
  )::FLOAT AS "active_size",
  CASE
    WHEN e.no = (
      SELECT *
      FROM current_epoch
    ) - 1
    /* Rewards of previous epoch will be computed mid-epoch */
    AND COALESCE(qp.rewards, 0) = 0 THEN (
      SELECT COALESCE(SUM(amount), 0)::TEXT AS "rewards" -- cast to TEXT to avoid number overflow
      FROM reward r
        JOIN pool_hash ph ON (ph.id = r.pool_id)
      WHERE ph.view = $2
        AND type <> 'refund'
        AND r.earned_epoch = e.no
    )
    ELSE COALESCE(qp.rewards, 0)::TEXT
  END AS "rewards", -- cast to TEXT to avoid number overflow
  CASE
    WHEN e.no = (
      SELECT *
      FROM current_epoch
    ) - 1
    /* Fees of previous epoch will be computed mid-epoch */
    AND COALESCE(qp.fees, 0) = 0 THEN (
      SELECT COALESCE(
          (
            SELECT CASE
                WHEN rewards IS NULL THEN 0
                WHEN rewards < fee THEN rewards
                ELSE FLOOR(fee + (rewards - fee) * margin)
              END
            FROM (
                SELECT COALESCE(SUM(r.amount), 0) AS "rewards",
                  pu.margin AS "margin",
                  pu.fixed_cost AS "fee"
                FROM pool_hash ph
                  JOIN pool_update pu ON (pu.hash_id = ph.id)
                  LEFT JOIN reward r ON (
                    ph.id = r.pool_id
                    AND r.earned_epoch = e.no
                  )
                WHERE pu.registered_tx_id = (
                    SELECT MAX(registered_tx_id)
                    FROM pool_update
                    WHERE active_epoch_no <= e.no
                      AND hash_id = ph.id
                  )
                  AND ph.view = $2
                GROUP BY pu.margin,
                  pu.fixed_cost
              ) AS "tempfees"
          ),
          0
        )::TEXT
    )
    ELSE COALESCE(qp.fees, 0)::TEXT
  END AS "fees" -- cast to TEXT to avoid number overflow
FROM queried_pool qp
  JOIN epoch e ON (qp.epoch_no = e.no)
  JOIN pool_hash ph ON (ph.id = qp.pool_id)
WHERE e.no < (
    SELECT *
    FROM current_epoch
  )
  AND ph.view = $2
GROUP BY e.no,
  qp.blocks,
  qp.delegators,
  qp.active_stake,
  qp.active_stake_all,
  qp.rewards,
  qp.fees
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN e.no
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN e.no
  END ASC