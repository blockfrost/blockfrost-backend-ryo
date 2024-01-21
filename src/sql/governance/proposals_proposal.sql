SELECT encode(tx.hash, 'hex') AS "tx_hash",
  ga.index AS "cert_index",
  (
    LOWER(
      regexp_replace(type::TEXT, '(?<=.{1})([A-Z])', '_\1', 'g')
    )
  ) AS "governance_type",
  -- type HardForkInitiation, NewCommittee, NewConstitution, InfoAction, NoConfidence, ParameterChange, TreasuryWithdrawals
  ga.description AS "governance_description",
  ga.deposit::TEXT AS "deposit",
  sa.view AS "return_address",
  ga.ratified_epoch AS "ratified_epoch",
  ga.enacted_epoch AS "enacted_epoch",
  ga.dropped_epoch AS "dropped_epoch",
  ga.expired_epoch AS "expired_epoch",
  ga.expiration AS "expiration",
  va.url AS "anchor_url",
  encode(va.data_hash, 'hex') AS "anchor_hash"
FROM governance_action ga
  JOIN tx ON (ga.tx_id = tx.id)
  JOIN stake_address sa ON (ga.return_address = sa.id)
  LEFT JOIN voting_anchor va ON (va.id = ga.voting_anchor_id)
WHERE encode(tx.hash, 'hex') = $1
  AND ga.index = $2