/* data taken from https://cips.cardano.org/cips/cip10/registry.json */
WITH cip_10 AS (
  SELECT *
  FROM (
      VALUES (
          '87'::WORD64TYPE,
          'milkomeda.com - The protocol magic for the milkomeda protocol'
        ),
        (
          '88'::WORD64TYPE,
          'milkomeda.com - the destination address in the sidechain'
        ),
        (
          '309'::WORD64TYPE,
          'Proof of Existence record'
        ),
        (
          '674'::WORD64TYPE,
          'CIP-0020 - Transaction message/comment metadata'
        ),
        (
          '721'::WORD64TYPE,
          'CIP-0025 - NFT Metadata Standard'
        ),
        (
          '777'::WORD64TYPE,
          'CIP-0027 - Royalties Standard'
        ),
        (
          '1188'::WORD64TYPE,
          'paradiso.app marketplace metadata'
        ),
        (
          '1189'::WORD64TYPE,
          'paradiso.app services metadata'
        ),
        (
          '1870'::WORD64TYPE,
          'Open Badges v2.0 compliant metadata'
        ),
        (
          '1967'::WORD64TYPE,
          'nut.link metadata oracles registry'
        ),
        (
          '1968'::WORD64TYPE,
          'nut.link metadata oracles data points'
        ),
        (
          '1988'::WORD64TYPE,
          'cardahub.io marketplace metadata'
        ),
        (
          '1989'::WORD64TYPE,
          'cardahub.io services metadata'
        ),
        (
          '6770'::WORD64TYPE,
          'fortunes.coconutpool.com fortune teller'
        ),
        (
          '61284'::WORD64TYPE,
          'CIP-0015 - Catalyst registration'
        ),
        (
          '61285'::WORD64TYPE,
          'CIP-0015 - Catalyst registration'
        ),
        (
          '61286'::WORD64TYPE,
          'CIP-0015 - Catalyst registration'
        )
    ) AS cip10 (label, description)
)
SELECT key AS "label",
  c.description AS "cip10",
  COUNT(*) AS "count"
FROM tx_metadata txm
  LEFT JOIN cip_10 c ON (c.label = txm.key)
GROUP BY key,
  c.description
ORDER BY CASE
    WHEN LOWER($1) = 'desc' THEN key
  END DESC,
  CASE
    WHEN LOWER($1) <> 'desc'
    OR $1 IS NULL THEN key
  END ASC