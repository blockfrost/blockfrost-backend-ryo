SELECT 1 AS "result"
FROM block
WHERE CASE
    WHEN $1 ~ '^[0-9]+$' THEN block_no = $1::integer
    ELSE encode(hash, 'hex') = $1
  END