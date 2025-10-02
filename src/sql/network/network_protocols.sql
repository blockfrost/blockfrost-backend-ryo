SELECT protocol_major as "protocol_major",
       min(epoch_no) as "epoch"
FROM epoch_param
GROUP BY protocol_major
ORDER BY epoch
