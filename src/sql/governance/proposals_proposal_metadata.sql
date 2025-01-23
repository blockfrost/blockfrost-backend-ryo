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
WHERE encode(tx.hash, 'hex') = 'ccb27f6b0d58c25ae33fd821b62c387f5230dae930afd07489fa3df56ae56522'
  AND gap.index = 0


  SELECT *
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)

WHERE encode(tx.hash, 'hex') = '0b19476e40bbbb5e1e8ce153523762e2b6859e7ecacbaf06eae0ee6a447e79b9'
  AND gap.index = 0