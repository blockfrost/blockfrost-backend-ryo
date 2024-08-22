SELECT encode(tx.hash, 'hex') AS "tx_hash",
  gap.index AS "cert_index",
  (
    json_build_object(
      'epoch',
      epoch_no,
      'min_fee_a',
      min_fee_a,
      'min_fee_b',
      min_fee_b,
      'max_block_size',
      max_block_size,
      'max_tx_size',
      max_tx_size,
      'max_block_header_size',
      max_bh_size,
      'key_deposit',
      key_deposit::TEXT,
      'pool_deposit',
      pool_deposit::TEXT,
      'e_max',
      max_epoch,
      'n_opt',
      optimal_pool_count,
      'a0',
      influence,
      'rho',
      monetary_expand_rate,
      'tau',
      treasury_growth_rate,
      'decentralisation_param',
      decentralisation,
      'extra_entropy',
      extra_entropy,
      'protocol_major_ver',
      protocol_major,
      'protocol_minor_ver',
      protocol_minor,
      'min_utxo',
      COALESCE(coins_per_utxo_size, min_utxo_value)::TEXT,
      'min_pool_cost',
      min_pool_cost::TEXT,
      'nonce',
      encode(nonce, 'hex'),
      'cost_models',
      cm.costs,
      'price_mem',
      price_mem,
      'price_step',
      price_step,
      'max_tx_ex_mem',
      max_tx_ex_mem::TEXT,
      'max_tx_ex_steps',
      max_tx_ex_steps::TEXT,
      'max_block_ex_mem',
      max_block_ex_mem::TEXT,
      'max_block_ex_steps',
      max_block_ex_steps::TEXT,
      'max_val_size',
      max_val_size::TEXT,
      'collateral_percent',
      collateral_percent,
      'max_collateral_inputs',
      max_collateral_inputs,
      'coins_per_utxo_size',
      coins_per_utxo_size::TEXT,
      'coins_per_utxo_word',
      coins_per_utxo_size::TEXT
    )::JSONB || json_build_object(
      'pvt_motion_no_confidence',
      pvt_motion_no_confidence,
      'pvt_committee_normal',
      pvt_committee_normal,
      'pvt_committee_no_confidence',
      pvt_committee_no_confidence,
      'pvt_hard_fork_initiation',
      pvt_hard_fork_initiation,
      'dvt_motion_no_confidence',
      dvt_motion_no_confidence,
      'dvt_committee_normal',
      dvt_committee_normal,
      'dvt_committee_no_confidence',
      dvt_committee_no_confidence,
      'dvt_update_to_constitution',
      dvt_update_to_constitution,
      'dvt_hard_fork_initiation',
      dvt_hard_fork_initiation,
      'dvt_p_p_network_group',
      dvt_p_p_network_group,
      'dvt_p_p_economic_group',
      dvt_p_p_economic_group,
      'dvt_p_p_technical_group',
      dvt_p_p_technical_group,
      'dvt_p_p_gov_group',
      dvt_p_p_gov_group,
      'dvt_treasury_withdrawal',
      dvt_treasury_withdrawal,
      'committee_min_size',
      committee_min_size,
      'committee_max_term_length',
      committee_max_term_length,
      'gov_action_lifetime',
      gov_action_lifetime,
      'gov_action_deposit',
      gov_action_deposit,
      'drep_deposit',
      drep_deposit,
      'drep_activity',
      drep_activity,
      'pvtpp_security_group',
      pvtpp_security_group,
      'min_fee_ref_script_cost_per_byte',
      min_fee_ref_script_cost_per_byte
    )::JSONB
  ) AS "parameters"
FROM gov_action_proposal gap
  JOIN tx ON (gap.tx_id = tx.id)
  JOIN epoch_param ep ON (gap.param_proposal = ep.id)
  LEFT JOIN cost_model cm ON (ep.cost_model_id = cm.id)
WHERE encode(tx.hash, 'hex') = $1
  AND gap.index = $2