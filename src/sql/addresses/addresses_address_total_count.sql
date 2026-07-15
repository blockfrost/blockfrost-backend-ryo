-- Bounded count of tx outputs for an address (or payment credential), used as
-- a cheap pre-check before the expensive totals aggregation. LIMIT $3 caps the
-- scan so the pre-check itself stays cheap no matter how large the address is:
-- pass limit + 1 and treat count > limit as "over the limit".
SELECT COUNT(*) AS "cnt"
FROM (
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
    LIMIT $3
  ) AS "bounded"
