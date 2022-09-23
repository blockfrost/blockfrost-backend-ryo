SELECT json
FROM script s
WHERE encode(s.hash, 'hex') = $1