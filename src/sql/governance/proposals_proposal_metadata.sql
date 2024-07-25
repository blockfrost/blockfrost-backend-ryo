SELECT encode(tx.hash, 'hex') AS "tx_hash",
  gap.index AS "cert_index",
  va.url AS "url",
  encode(va.data_hash, 'hex') AS "hash",
  ocvd.json AS "json_metadata",
  ocvd.bytes::TEXT AS "bytes"
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
  JOIN voting_anchor va ON (va.id = gap.voting_anchor_id)
  JOIN off_chain_vote_data ocvd ON (ocvd.voting_anchor_id = va.id)
WHERE encode(tx.hash, 'hex') = $1
  AND gap.index = $2