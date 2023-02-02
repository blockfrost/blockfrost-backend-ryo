SELECT encode(d.bytes, 'hex') as "cbor"
FROM tx_out txo
    JOIN ma_tx_out mto ON (txo.id = mto.tx_out_id)
    JOIN datum d ON (d.hash = txo.data_hash)
    JOIN multi_asset ma ON (mto.ident = ma.id)
WHERE (encode(policy, 'hex') || encode(name, 'hex')) = $1
ORDER BY d.tx_id DESC
LIMIT 1
