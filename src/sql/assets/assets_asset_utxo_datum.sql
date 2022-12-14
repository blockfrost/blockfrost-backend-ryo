select
    encode(d.bytes, 'hex') as cbor
from
    tx_out txo
    join ma_tx_out mto on (txo.id = mto.tx_out_id)
    join datum d on (d.tx_id = txo.tx_id)
    join multi_asset ma on (mto.ident = ma.id)
where
    (encode(policy, 'hex') || encode(name, 'hex')) = $1
order by
    d.tx_id desc
limit
    1;