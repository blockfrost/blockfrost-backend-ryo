/* This query relies on Byron (+1 Shelley epoch) synced without interruptions (no interleaved ids up to the last boundary block) */
WITH queried_block AS (
  SELECT id,
    block_no,
    previous_id,
    slot_leader_id,
    time
  FROM block
  WHERE CASE
      WHEN $1 ~ '^[0-9]+$' THEN block_no = $1::INTEGER
      ELSE encode(hash, 'hex') = $1
    END
),
previous_queried_block AS (
  SELECT b2.id,
    b2.block_no,
    b2.previous_id,
    b2.slot_leader_id,
    b2.time
  FROM block b
    JOIN block b2 ON (b2.id = b.previous_id)
  WHERE CASE
      WHEN $1 ~ '^[0-9]+$' THEN b.block_no = $1::INTEGER
      ELSE encode(b.hash, 'hex') = $1
    END
),
boundary_blocks AS (
  SELECT b.id AS "id",
    b.time AS "time",
    b.block_no AS "height",
    encode(b.hash, 'hex') AS "hash",
    b.slot_no AS "slot",
    b.epoch_no AS "epoch",
    b.epoch_slot_no AS "epoch_slot",
    CASE
      WHEN ph.view IS NULL THEN 
        CASE 
          WHEN sl.description LIKE '%Key-%' THEN 
            REPLACE(sl.description, 'Key-', '-')
          ELSE sl.description
        END
      ELSE ph.view
    END AS "slot_leader",
    b.size AS "size",
    b.tx_count::INTEGER AS "tx_count",
    SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
    SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
    b.vrf_key AS "block_vrf",
    encode(b.op_cert, 'hex') AS "op_cert",
    b.op_cert_counter::TEXT AS "op_cert_counter", -- cast to TEXT to avoid number overflow
    (
      SELECT encode(hash, 'hex')
      FROM block
      WHERE id = b.previous_id
    ) AS "previous_block",
    (
      SELECT encode(hash, 'hex')
      FROM block
      WHERE id = (
          SELECT MIN(id)
          FROM (
              SELECT id
              FROM block
              WHERE id > b.id
            ) AS "void"
        )
    ) AS "next_block",
    (
      SELECT block_no AS "height"
      FROM block
      WHERE block_no IS NOT NULL
      ORDER BY block_no DESC
      LIMIT 1
    ) - CASE
      WHEN b.block_no IS NOT NULL THEN -- regular block
      b.block_no
      WHEN b.slot_leader_id = 2 THEN -- epoch boundary
      CASE
        WHEN b.previous_id = 1 THEN -- first epoch boundary
        0
        ELSE -- all other epoch boundaries
        (
          SELECT block_no
          FROM block btemp
          WHERE btemp.id = b.previous_id
        )
      END
      WHEN b.slot_leader_id = 1 THEN -- genesis
      0
      ELSE -- this should never happen and should throw error in tests
      NULL
    END AS "confirmations"
  FROM block b
    LEFT JOIN tx ON (tx.block_id = b.id)
    JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
    LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
  WHERE block_no IS NULL
  GROUP BY (b.id, sl.id, ph.id)
)
/*
 This query comprises of three parts joined by UNIONs:
 1. regular blocks fetched by block_no
 2. b.id < last boundary block + 100
 3. block_no IS NULL (querying boundary block) b.id > last boundary block
 Parts 2 and 3 are needed in order to get boundary blocks inside (they don't have height)
*/

-- PART 1 :
SELECT extract(
    epoch
    FROM time
  )::INTEGER AS "time",
  height AS "height",
  hash AS "hash",
  slot AS "slot",
  epoch AS "epoch",
  epoch_slot AS "epoch_slot",
  slot_leader AS "slot_leader",
  size AS "size",
  tx_count AS "tx_count",
  output AS "output",
  fees AS "fees",
  block_vrf AS "block_vrf",
  op_cert AS "op_cert",
  op_cert_counter AS "op_cert_counter",
  previous_block AS "previous_block",
  next_block AS "next_block",
  confirmations AS "confirmations"
FROM (
    SELECT b.id AS "id",
      b.time AS "time",
      b.block_no AS "height",
      encode(b.hash, 'hex') AS "hash",
      b.slot_no AS "slot",
      b.epoch_no AS "epoch",
      b.epoch_slot_no AS "epoch_slot",
      CASE
        WHEN ph.view IS NULL THEN 
          CASE 
            WHEN sl.description LIKE '%Key-%' THEN 
              REPLACE(sl.description, 'Key-', '-')
            ELSE sl.description
          END
        ELSE ph.view
      END AS "slot_leader",
      b.size AS "size",
      b.tx_count::INTEGER AS "tx_count",
      SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
      SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
      b.vrf_key AS "block_vrf",
      encode(b.op_cert, 'hex') AS "op_cert",
      b.op_cert_counter::TEXT AS "op_cert_counter", -- cast to TEXT to avoid number overflow
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = b.previous_id
      ) AS "previous_block",
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = (
            SELECT MIN(id)
            FROM (
                SELECT id
                FROM block
                WHERE id > b.id
              ) AS "void"
          )
      ) AS "next_block",
      (
        SELECT block_no AS "height"
        FROM block
        WHERE block_no IS NOT NULL
        ORDER BY block_no DESC
        LIMIT 1
      ) - CASE
        WHEN b.block_no IS NOT NULL THEN -- regular block
        b.block_no
        WHEN b.slot_leader_id = 2 THEN -- epoch boundary
        CASE
          WHEN b.previous_id = 1 THEN -- first epoch boundary
          0
          ELSE -- all other epoch boundaries
          (
            SELECT block_no
            FROM block btemp
            WHERE btemp.id = b.previous_id
          )
        END
        WHEN b.slot_leader_id = 1 THEN -- genesis
        0
        ELSE -- this should never happen and should throw error in tests
        NULL
      END AS "confirmations"
    FROM block b
      LEFT JOIN tx ON (tx.block_id = b.id)
      JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
    WHERE (
        (
          SELECT block_no
          FROM queried_block
        ) IS NOT NULL
        AND b.id > (SELECT MAX(id) FROM boundary_blocks)
        AND b.block_no > (
          SELECT block_no
          FROM queried_block
        ) + (
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
        ) - (
          SELECT COALESCE(COUNT(id), 0)
          FROM boundary_blocks bbtemp
          WHERE bbtemp.id < (
              (
                SELECT id
                FROM queried_block
              ) + (
                CASE
                  -- query.count
                  WHEN $2 >= 1
                  AND $2 <= 100 THEN $2
                  ELSE 100
                END * CASE
                  -- query.page
                  WHEN $3 > 1
                  AND $3 < 2147483647 THEN $3
                  ELSE 0
                END
              )
            )
            AND bbtemp.id > (
              SELECT id
              FROM queried_block
            )
        )
        AND b.block_no <= (
          SELECT block_no
          FROM queried_block
        ) + (
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
        ) - (
          SELECT COALESCE(COUNT(id), 0)
          FROM boundary_blocks bbtemp
          WHERE bbtemp.id < (
              (
                SELECT id
                FROM queried_block
              ) + (
                CASE
                  -- query.count
                  WHEN $2 >= 1
                  AND $2 <= 100 THEN $2
                  ELSE 100
                END * CASE
                  -- query.page
                  WHEN $3 > 1
                  AND $3 < 2147483647 THEN $3
                  ELSE 0
                END
              )
            )
            AND bbtemp.id > (
              SELECT id
              FROM queried_block
            )
        )
      )
    GROUP BY (b.id, sl.id, ph.id)
    UNION
    -- PART 2:
    SELECT b.id AS "id",
      b.time AS "time",
      b.block_no AS "height",
      encode(b.hash, 'hex') AS "hash",
      b.slot_no AS "slot",
      b.epoch_no AS "epoch",
      b.epoch_slot_no AS "epoch_slot",
      CASE
        WHEN ph.view IS NULL THEN 
          CASE 
            WHEN sl.description LIKE '%Key-%' THEN 
              REPLACE(sl.description, 'Key-', '-')
            ELSE sl.description
          END
        ELSE ph.view
      END AS "slot_leader",
      b.size AS "size",
      b.tx_count::INTEGER AS "tx_count",
      SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
      SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
      b.vrf_key AS "block_vrf",
      encode(b.op_cert, 'hex') AS "op_cert",
      b.op_cert_counter::TEXT AS "op_cert_counter", -- cast to TEXT to avoid number overflow
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = b.previous_id
      ) AS "previous_block",
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = (
            SELECT MIN(id)
            FROM (
                SELECT id
                FROM block
                WHERE id > b.id
              ) AS "void"
          )
      ) AS "next_block",
      (
        SELECT block_no AS "height"
        FROM block
        WHERE block_no IS NOT NULL
        ORDER BY block_no DESC
        LIMIT 1
      ) - CASE
        WHEN b.block_no IS NOT NULL THEN -- regular block
        b.block_no
        WHEN b.slot_leader_id = 2 THEN -- epoch boundary
        CASE
          WHEN b.previous_id = 1 THEN -- first epoch boundary
          0
          ELSE -- all other epoch boundaries
          (
            SELECT block_no
            FROM block btemp
            WHERE btemp.id = b.previous_id
          )
        END
        WHEN b.slot_leader_id = 1 THEN -- genesis
        0
        ELSE -- this should never happen and should throw error in tests
        NULL
      END AS "confirmations"
    FROM block b
      LEFT JOIN tx ON (tx.block_id = b.id)
      JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
    WHERE (
        /*
         We have to use slightly greater block id than the next UNION query, so that there will always be overlaps.

         ALWAYS (also when block_no is not null) query this
         otherwise, there would be missing boundary blocks (just results from the first UNION query)
        */
        b.id < (SELECT MAX(id) FROM boundary_blocks) + 100
        AND b.id > (
          SELECT id
          FROM queried_block
        ) + (
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
        AND b.id <= (
          SELECT id
          FROM queried_block
        ) + (
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
    GROUP BY (b.id, sl.id, ph.id)
    UNION
    -- PART 3 :
    SELECT b.id AS "id",
      b.time AS "time",
      b.block_no AS "height",
      encode(b.hash, 'hex') AS "hash",
      b.slot_no AS "slot",
      b.epoch_no AS "epoch",
      b.epoch_slot_no AS "epoch_slot",
      CASE
        WHEN ph.view IS NULL THEN 
          CASE 
            WHEN sl.description LIKE '%Key-%' THEN 
              REPLACE(sl.description, 'Key-', '-')
            ELSE sl.description
          END
        ELSE ph.view
      END AS "slot_leader",
      b.size AS "size",
      b.tx_count::INTEGER AS "tx_count",
      SUM(tx.out_sum)::TEXT AS "output", -- cast to TEXT to avoid number overflow
      SUM(tx.fee)::TEXT AS "fees", -- cast to TEXT to avoid number overflow
      b.vrf_key AS "block_vrf",
      encode(b.op_cert, 'hex') AS "op_cert",
      b.op_cert_counter::TEXT AS "op_cert_counter", -- cast to TEXT to avoid number overflow
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = b.previous_id
      ) AS "previous_block",
      (
        SELECT encode(hash, 'hex')
        FROM block
        WHERE id = (
            SELECT MIN(id)
            FROM (
                SELECT id
                FROM block
                WHERE id > b.id
              ) AS "void"
          )
      ) AS "next_block",
      (
        SELECT block_no AS "height"
        FROM block
        WHERE block_no IS NOT NULL
        ORDER BY block_no DESC
        LIMIT 1
      ) - CASE
        WHEN b.block_no IS NOT NULL THEN -- regular block
        b.block_no
        WHEN b.slot_leader_id = 2 THEN -- epoch boundary
        CASE
          WHEN b.previous_id = 1 THEN -- first epoch boundary
          0
          ELSE -- all other epoch boundaries
          (
            SELECT block_no
            FROM block btemp
            WHERE btemp.id = b.previous_id
          )
        END
        WHEN b.slot_leader_id = 1 THEN -- genesis
        0
        ELSE -- this should never happen and should throw error in tests
        NULL
      END AS "confirmations"
    FROM block b
      LEFT JOIN tx ON (tx.block_id = b.id)
      JOIN slot_leader sl ON (sl.id = b.slot_leader_id)
      LEFT JOIN pool_hash ph ON (ph.id = sl.pool_hash_id)
    WHERE (
        /*
         only make this happen when the queried block is boundary
         in other cases, we don't need nor want this blackmagicktrickery
        */
        (
          SELECT block_no
          FROM queried_block
        ) IS NULL -- boundary block
        AND b.id > (SELECT MAX(id) FROM boundary_blocks)
        AND b.block_no > (
          SELECT CASE
              WHEN EXISTS (
                SELECT block_no
                FROM previous_queried_block
              ) THEN (
                SELECT block_no
                FROM previous_queried_block
              )
              ELSE 0
            END AS "block_no"
        ) + (
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
        ) - (
          SELECT COALESCE(COUNT(id), 0)
          FROM boundary_blocks bbtemp
          WHERE bbtemp.id < (
              (
                SELECT id
                FROM queried_block
              ) + (
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
            )
            AND bbtemp.id > (
              SELECT id
              FROM queried_block
            )
        )
        AND b.block_no <= (
          SELECT CASE
              WHEN EXISTS (
                SELECT block_no
                FROM previous_queried_block
              ) THEN (
                SELECT block_no
                FROM previous_queried_block
              )
              ELSE 0
            END AS "block_no"
        ) + (
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
        ) - (
          SELECT COALESCE(COUNT(id), 0)
          FROM boundary_blocks bbtemp
          WHERE bbtemp.id < (
              (
                SELECT id
                FROM queried_block
              ) + (
                CASE
                  -- query.count
                  WHEN $2 >= 1
                  AND $2 <= 100 THEN $2
                  ELSE 100
                END * CASE
                  -- query.page
                  WHEN $3 > 1
                  AND $3 < 2147483647 THEN $3
                  ELSE 0
                END
              )
            )
            AND bbtemp.id > (
              SELECT id
              FROM queried_block
            )
        )
      )
    GROUP BY (
        b.id,
        sl.id,
        ph.id
      )
    ORDER BY id ASC -- we have to order by ID, so that boundary blocks get included correctly
    LIMIT
    /*
     we have to apply LIMIT again to reduce the number of block to requested count since
     we might have accumulated more block than we should have (from select by id)
     NOTE: this can only happen with Byron (boundary blocks)
    */
      CASE
        -- query.count
        WHEN $2 >= 1
        AND $2 <= 100 THEN $2
        ELSE 100
      END
  ) AS "blocks_selected"