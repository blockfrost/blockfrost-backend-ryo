-- data hash refers to either datum or redeemer_data
SELECT encode(bytes, 'hex') AS "cbor"
FROM datum d
WHERE encode(d.hash, 'hex') = $1
-- UNION with redeemer_data
UNION
SELECT encode(bytes, 'hex') AS "cbor"
FROM redeemer_data rd
WHERE encode(rd.hash, 'hex') = $1
