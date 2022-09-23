SELECT pr.ipv4 AS "ipv4",
  pr.ipv6 AS "ipv6",
  pr.dns_name AS "dns",
  pr.dns_srv_name AS "dns_srv",
  pr.port AS "port"
FROM tx
  JOIN pool_update pu ON (tx.id = pu.registered_tx_id)
  JOIN pool_relay pr ON (pu.id = pr.update_id)
WHERE pu.id = $1