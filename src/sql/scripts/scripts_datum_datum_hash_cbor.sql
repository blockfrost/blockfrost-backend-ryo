SELECT encode(bytes, 'hex') AS "cbor"
FROM datum d
WHERE encode(d.hash, 'hex') = $1