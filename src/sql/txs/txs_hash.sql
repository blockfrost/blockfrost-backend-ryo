SELECT encode(tx.hash, 'hex') AS "hash",
  encode(b.hash, 'hex') AS "block",
  block_no AS "block_height",
  extract(
    epoch
    FROM b.time
  )::INTEGER AS "block_time",
  b.slot_no AS "slot",
  tx.block_index AS "index",
  tx.out_sum::TEXT AS "amount_lovelace", -- cast to TEXT to avoid number overflow
  (
    SELECT json_agg(
        json_build_object(
          'unit',
          CONCAT(encode(policy, 'hex'), encode(name, 'hex')),
          'quantity',
          mto.quantity::TEXT -- cast to TEXT to avoid number overflow
        )
      )
    FROM ma_tx_out mto
      JOIN multi_asset ma ON (mto.ident = ma.id)
      JOIN tx_out txo ON (txo.tx_id = tx.id)
    WHERE mto.tx_out_id = txo.id
  ) AS "amount",
  tx.fee::TEXT AS "fees", -- cast to TEXT to avoid number overflow
  tx.deposit::TEXT AS "deposit", -- cast to TEXT to avoid number overflow
  tx.size AS "size",
  tx.invalid_before::TEXT AS "invalid_before", -- cast to TEXT to avoid number overflow
  tx.invalid_hereafter::TEXT AS "invalid_hereafter", -- cast to TEXT to avoid number overflow
  tx.valid_contract AS "valid_contract",
  (
    SELECT (
        SELECT COUNT(*)
        FROM tx
          JOIN tx_in txi ON (txi.tx_in_id = tx.id)
        WHERE encode(tx.hash, 'hex') = $1
      ) + (
        SELECT COUNT(*)
        FROM tx
          JOIN tx_out txo ON (txo.tx_id = tx.id)
        WHERE encode(tx.hash, 'hex') = $1
      )
  ) AS "utxo_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN withdrawal w ON (w.tx_id = tx.id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "withdrawal_count",
  (
    SELECT(
        COALESCE(
          (
            SELECT COUNT(DISTINCT tx.id)
            FROM tx
              JOIN treasury t ON (t.tx_id = tx.id)
            WHERE encode(tx.hash, 'hex') = $1
          ),
          0
        ) + COALESCE(
          (
            SELECT COUNT(DISTINCT tx.id)
            FROM tx
              JOIN reserve r ON (r.tx_id = tx.id)
            WHERE encode(tx.hash, 'hex') = $1
          ),
          0
        )
      )
  ) AS "mir_cert_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN delegation d ON (d.tx_id = tx.id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "delegation_count",
  (
    SELECT (
        (
          SELECT COUNT(*)
          FROM tx
            JOIN stake_registration sr ON (sr.tx_id = tx.id)
          WHERE encode(tx.hash, 'hex') = $1
        ) + (
          SELECT COUNT(*)
          FROM tx
            JOIN stake_deregistration sd ON (sd.tx_id = tx.id)
          WHERE encode(tx.hash, 'hex') = $1
        )
      )
  ) AS "stake_cert_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN pool_update pu ON (tx.id = pu.registered_tx_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "pool_update_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN pool_retire pr ON (tx.id = pr.announced_tx_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "pool_retire_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN ma_tx_mint mtm ON (tx.id = mtm.tx_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "asset_mint_or_burn_count",
  (
    SELECT COUNT(*)
    FROM tx
      JOIN redeemer r ON (tx.id = r.tx_id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "redeemer_count"
FROM tx
  JOIN block b ON (tx.block_id = b.id)
WHERE encode(tx.hash, 'hex') = $1