SELECT dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  CASE
    WHEN dr.deposit >= 0 THEN va.url
    ELSE NULL
  END AS "url",
  CASE
    WHEN dr.deposit >= 0 THEN encode(va.data_hash, 'hex')
    ELSE NULL
  END AS "hash"
FROM drep_hash dh
  JOIN drep_registration dr ON (dh.id = dr.drep_hash_id)
  LEFT JOIN voting_anchor va ON (dr.voting_anchor_id = va.id)
WHERE dh.view = $1
ORDER BY (dr.tx_id, dr.cert_index) DESC
LIMIT 1