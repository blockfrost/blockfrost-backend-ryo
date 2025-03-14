WITH queried_block AS (
  SELECT MIN(tx.id) AS "min_id",
    MAX(tx.id) AS "max_id"
  FROM tx
  WHERE block_id = (
      SELECT id
      FROM block
      ORDER BY id DESC
      LIMIT 1
    )
)
SELECT encode(tx.hash, 'hex') AS "hash"
FROM tx
WHERE CASE
    WHEN LOWER($1) = 'desc' THEN (
      id <= (
        (
          SELECT max_id
          FROM queried_block
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
      AND id > (
        (
          SELECT max_id
          FROM queried_block
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
      AND id >= (
        SELECT min_id
        FROM queried_block
      ) -- cap the results so they won't overflow to prev block
    )
    ELSE -- cursor is at the bottom of blockchain (oldest first)
    (
      id >= (
        (
          SELECT min_id
          FROM queried_block
        ) + CASE
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
      AND id < (
        (
          SELECT min_id
          FROM queried_block
        ) + CASE
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
      AND id <= (
        SELECT max_id
        FROM queried_block
      ) -- cap the results so they won't overflow to next block
    )
  END
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN tx.block_index
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN tx.block_index
  END ASC