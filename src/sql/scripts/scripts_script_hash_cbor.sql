SELECT encode(bytes, 'hex') AS "cbor"
FROM script s
WHERE encode(s.hash, 'hex') = $1