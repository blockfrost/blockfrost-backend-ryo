-- Bounded count of tx outputs for a stake address, used as a cheap pre-check
-- before the expensive totals aggregation. LIMIT $2 caps the scan so the
-- pre-check itself stays cheap no matter how large the account is: pass
-- limit + 1 and treat count > limit as "over the limit".
SELECT COUNT(*) AS "cnt"
FROM (
    SELECT 1
    FROM tx_out txo
      JOIN stake_address sa ON (txo.stake_address_id = sa.id)
    WHERE sa.view = $1
    LIMIT $2
  ) AS "bounded"
