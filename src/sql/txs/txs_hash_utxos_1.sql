SELECT *
FROM (
    -- normal inputs
    SELECT txi.id AS "tx_in_id",
      txo.address AS "address",
      encode(tx2.hash, 'hex') AS "tx_hash", -- output hash of previous UTxO
      txi.tx_out_index AS "output_index", -- output index of previous UTxO
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
      false AS "collateral",
      false AS "reference",
      encode(data_hash, 'hex') AS "data_hash",
      encode(dat.bytes, 'hex') AS "inline_datum",
      null AS "reference_script_hash"
    FROM tx
      JOIN tx_in txi ON (txi.tx_in_id = tx.id)
      JOIN tx_out txo ON (
        txo.tx_id = txi.tx_out_id
        AND txo.index = txi.tx_out_index
      )
      JOIN tx tx2 ON (txi.tx_out_id = tx2.id)
      LEFT JOIN datum dat ON (txo.inline_datum_id = dat.id)
    WHERE encode(tx.hash, 'hex') = $1
    -- UNION with reference inputs
    UNION ALL
    SELECT rtxi.id AS "tx_in_id",
      txo.address AS "address",
      encode(tx2.hash, 'hex') AS "tx_hash", -- output hash of previous UTxO
      rtxi.tx_out_index AS "output_index", -- output index of previous UTxO
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
      false AS "collateral",
      true AS "reference",
      encode(txo.data_hash, 'hex') AS "data_hash",
      encode(dat.bytes, 'hex') AS "inline_datum",
      encode(scr.hash, 'hex') AS "reference_script_hash"
    FROM tx
      JOIN reference_tx_in rtxi ON (rtxi.tx_in_id = tx.id)
      JOIN tx_out txo ON (
        txo.tx_id = rtxi.tx_out_id
        AND txo.index = rtxi.tx_out_index
      )
      JOIN tx tx2 ON (rtxi.tx_out_id = tx2.id)
      LEFT JOIN datum dat ON (txo.inline_datum_id = dat.id)
      LEFT JOIN script scr ON (txo.reference_script_id = scr.id)
    WHERE encode(tx.hash, 'hex') = $1
    -- UNION with collateral inputs
    UNION ALL
    SELECT ctxi.id AS "tx_in_id",
      txo.address AS "address",
      encode(tx2.hash, 'hex') AS "tx_hash", -- output hash of previous utxo
      ctxi.tx_out_index AS "output_index", -- output index of previous utxo
      txo.value::TEXT AS "amount_lovelace", -- cast to TEXT to avoid number overflow
      null AS "amount",
      true AS "collateral",
      false AS "reference",
      encode(txo.data_hash, 'hex') AS "data_hash",
      encode(dat.bytes, 'hex') AS "inline_datum",
      null AS "reference_script_hash"
    FROM tx
      JOIN collateral_tx_in ctxi ON (ctxi.tx_in_id = tx.id)
      JOIN tx_out txo ON (
        txo.tx_id = ctxi.tx_out_id
        AND txo.index = ctxi.tx_out_index
      )
      JOIN tx tx2 ON (ctxi.tx_out_id = tx2.id)
      LEFT JOIN datum dat ON (txo.inline_datum_id = dat.id)
    WHERE encode(tx.hash, 'hex') = $1
  ) AS "inputs"
ORDER BY collateral ASC, (tx_in_id, output_index) ASC
