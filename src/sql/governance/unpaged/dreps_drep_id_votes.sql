WITH drep AS (
  SELECT id
  FROM drep_hash dh
  WHERE (
      ($2::bytea IS NOT NULL AND dh.raw = $2) OR
      ($2 IS NULL AND dh.view = $3)
    )
    AND dh.has_script = $4
  LIMIT 1
),
ordered_votes AS (
  SELECT vp.id, vp.tx_id, vp.index AS cert_index, vp.vote
  FROM voting_procedure vp
  WHERE vp.drep_voter = (SELECT id FROM drep)
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN vp.id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN vp.id
    END ASC
)
SELECT encode(tx.hash, 'hex') AS "tx_hash",
  v.cert_index AS "cert_index",
  LOWER(v.vote::TEXT) AS "vote"
FROM ordered_votes v
  JOIN tx ON (v.tx_id = tx.id)
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN v.id
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN v.id
  END ASC
