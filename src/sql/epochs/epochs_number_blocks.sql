WITH queried_blocks AS (
  SELECT row_number() OVER (
      ORDER BY b.id
    ) AS "myid",
    encode(b.hash, 'hex') AS "hash"
  FROM block b
  WHERE b.epoch_no = $4
  ORDER BY CASE
      WHEN LOWER($1) = 'desc' THEN b.id
    END DESC,
    CASE
      WHEN LOWER($1) <> 'desc'
      OR $1 IS NULL THEN b.id
    END ASC
)
SELECT hash AS "hash"
FROM queried_blocks
WHERE -- cursor is at the tip of blockchain (newest first)
  CASE
    WHEN LOWER($1) = 'desc' THEN (
      myid <= (
        (
          SELECT MAX(myid)
          FROM queried_blocks
        ) - CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3 - 1
          ELSE 0
        END
      )
      AND myid > (
        (
          SELECT MAX(myid)
          FROM queried_blocks
        ) - CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3
          ELSE 1
        END
      )
    )
    ELSE -- cursor is at the bottom of blockchain (oldest first)
    (
      myid > (
        CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3 - 1
          ELSE 0
        END
      )
      AND myid <= (
        CASE
          -- query.count
          WHEN $2 >= 1
          AND $2 <= 100 THEN $2
          ELSE 100
        END * CASE
          -- query.page
          WHEN $3 > 1
          AND $3 < 2147483647 THEN $3
          ELSE 1
        END
      )
    )
  END