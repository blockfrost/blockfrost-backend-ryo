-- Bounded over-limit check for the totals endpoint: a row exists at OFFSET $3
-- if and only if the address (or payment credential) has more than $3 tx
-- outputs. Postgres stops scanning at the first row past the offset, so the
-- cost never exceeds the limit no matter how large the address is.
SELECT EXISTS (
    SELECT 1
    FROM tx_out txo
    WHERE (
        -- comparing against (SELECT $n) instead of $n keeps the planner on
        -- generic row estimates, see addresses_address_total.sql
        CASE
          WHEN $2::BYTEA IS NOT NULL THEN txo.payment_cred = (
            SELECT $2::BYTEA
          )
          ELSE txo.address = (
            SELECT $1
          )
        END
      )
    OFFSET $3
  ) AS "over_limit"
