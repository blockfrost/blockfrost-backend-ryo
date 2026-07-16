-- Bounded over-limit check for the totals endpoint: a row exists at OFFSET $2
-- if and only if the stake address has more than $2 tx outputs. Postgres stops
-- scanning at the first row past the offset, so the cost never exceeds the
-- limit no matter how large the account is.
SELECT EXISTS (
    SELECT 1
    FROM tx_out txo
      JOIN stake_address sa ON (txo.stake_address_id = sa.id)
    WHERE sa.view = $1
    OFFSET $2
  ) AS "over_limit"
