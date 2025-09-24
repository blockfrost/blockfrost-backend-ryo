SELECT encode(tx.hash, 'hex') AS "tx_hash",
  gap.index AS "cert_index",
  va.url AS "url",
  encode(va.data_hash, 'hex') AS "hash",
  ocvd.json AS "json_metadata",
  ocvd.bytes::TEXT AS "bytes",
  CASE
    WHEN ocvd.id IS NULL THEN ocvfe.fetch_error
    ELSE NULL
  END AS "fetch_error"
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
  JOIN voting_anchor va ON (va.id = gap.voting_anchor_id)
  LEFT JOIN off_chain_vote_data ocvd ON (ocvd.voting_anchor_id = va.id)
  LEFT JOIN LATERAL (
    SELECT fetch_error
    FROM off_chain_vote_fetch_error
    WHERE voting_anchor_id = va.id
    ORDER BY id DESC
    LIMIT 1
  ) AS ocvfe ON TRUE
WHERE encode(tx.hash, 'hex') = $1
  AND gap.index = $2