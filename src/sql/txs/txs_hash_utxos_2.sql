SELECT *
FROM (
    -- normal outputs
    SELECT txo.address AS "address",
      txo.value::TEXT AS "amount_lovelace", -- cast to TEXT to avoid number overflow
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
        WHERE mto.tx_out_id = txo.id
      ) AS "amount",
      encode(txo.data_hash, 'hex') AS "data_hash",
      encode(dat.bytes, 'hex') AS "inline_datum",
      false AS "collateral",
      encode(scr.hash, 'hex') AS "reference_script_hash",
      txo.index AS "output_index"
    FROM tx
      JOIN tx_out txo ON (txo.tx_id = tx.id)
      LEFT JOIN datum dat ON (txo.inline_datum_id = dat.id)
      LEFT JOIN script scr ON (txo.reference_script_id = scr.id)
    WHERE encode(tx.hash, 'hex') = $1
    -- UNION with collateral outputs
    UNION ALL
    SELECT txo.address AS "address",
      txo.value::TEXT AS "amount_lovelace",
      null AS "amount",
      encode(txo.data_hash, 'hex') AS "data_hash",
      encode(dat.bytes, 'hex') AS "inline_datum",
      true AS "collateral",
      encode(scr.hash, 'hex') AS "reference_script_hash",
      txo.index AS "output_index"
    FROM tx
      JOIN collateral_tx_out txo ON (txo.tx_id = tx.id)
      LEFT JOIN datum dat ON (txo.inline_datum_id = dat.id)
      LEFT JOIN script scr ON (txo.reference_script_id = scr.id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "outpus"
ORDER BY (output_index, collateral) ASC
