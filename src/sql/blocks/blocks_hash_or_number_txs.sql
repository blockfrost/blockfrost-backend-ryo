WITH queried_block AS (
  SELECT MIN(tx.id) AS "min_id",
    MAX(tx.id) AS "max_id"
  FROM tx
  WHERE CASE
      WHEN $1 ~ '^[0-9]+$' THEN block_id = (
        SELECT id
        FROM block
        WHERE block_no = $1::integer
      )
      ELSE block_id = (
        SELECT id
        FROM block
        WHERE encode(hash, 'hex') = $1
      )
    END
)
SELECT encode(tx.hash, 'hex') AS "hash"
FROM tx
WHERE CASE
    WHEN LOWER($4) = 'desc' THEN (
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
    WHEN LOWER($4) = 'desc' THEN tx.block_index
  END DESC,
  CASE
    WHEN LOWER($4) <> 'desc'
    OR $4 IS NULL THEN tx.block_index
  END ASC