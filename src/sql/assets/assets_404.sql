SELECT 1 AS "result"
FROM multi_asset ma
WHERE (
    encode(ma.policy, 'hex') || encode(ma.name, 'hex')
  ) = $1
LIMIT 1