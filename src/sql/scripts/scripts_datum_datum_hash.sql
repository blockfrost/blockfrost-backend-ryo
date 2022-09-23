-- data hash refers to either datum or redeemer_data
SELECT value AS "json_value"
FROM datum d
WHERE encode(d.hash, 'hex') = $1
-- UNION with redeemer_data
UNION
SELECT value AS "json_value"
FROM redeemer_data rd
WHERE encode(rd.hash, 'hex') = $1