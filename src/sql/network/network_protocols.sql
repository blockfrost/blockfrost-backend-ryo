SELECT DISTINCT protocol_major as "protocol_major",
                epoch_no as "epoch"
FROM param_proposal
WHERE protocol_major IS NOT NULL
ORDER BY epoch_no
