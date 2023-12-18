SELECT encode(wit.hash, 'hex') AS "hash"
FROM tx
  JOIN extra_key_witness wit ON (wit.tx_id = tx.id)
WHERE encode(tx.hash, 'hex') = $1
ORDER BY wit.id
