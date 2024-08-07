SELECT dh.view AS "drep_id",
  encode(dh.raw, 'hex') AS "hex",
  va.url AS "url",
  encode(va.data_hash, 'hex') AS "hash",
  ocvd.json AS "json_metadata",
  ocvd.bytes::TEXT AS "bytes"
FROM drep_hash dh
  JOIN drep_registration dr ON (dh.id = dr.drep_hash_id)
  JOIN voting_anchor va ON (dr.voting_anchor_id = va.id)
  JOIN off_chain_vote_data ocvd ON (ocvd.voting_anchor_id = va.id)
WHERE dh.view = $1
ORDER BY (dr.tx_id, dr.cert_index) DESC
LIMIT 1