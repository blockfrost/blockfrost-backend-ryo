import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const QUERY_FILES = {
  accounts_404: 'accounts/accounts_404.sql',
  accounts_stake_address: 'accounts/accounts_stake_address.sql',
  accounts_stake_address_addresses: 'accounts/accounts_stake_address_addresses.sql',
  accounts_stake_address_addresses_unpaged: 'accounts/unpaged/accounts_stake_address_addresses.sql',
  accounts_stake_address_addresses_total: 'accounts/accounts_stake_address_addresses_total.sql',
  accounts_stake_address_addresses_assets: 'accounts/accounts_stake_address_addresses_assets.sql',
  accounts_stake_address_addresses_assets_unpaged:
    'accounts/unpaged/accounts_stake_address_addresses_assets.sql',
  accounts_stake_address_delegations: 'accounts/accounts_stake_address_delegations.sql',
  accounts_stake_address_delegations_unpaged:
    'accounts/unpaged/accounts_stake_address_delegations.sql',
  accounts_stake_address_history: 'accounts/accounts_stake_address_history.sql',
  accounts_stake_address_history_unpaged: 'accounts/unpaged/accounts_stake_address_history.sql',
  accounts_stake_address_mirs: 'accounts/accounts_stake_address_mirs.sql',
  accounts_stake_address_mirs_unpaged: 'accounts/unpaged/accounts_stake_address_mirs.sql',
  accounts_stake_address_registrations: 'accounts/accounts_stake_address_registrations.sql',
  accounts_stake_address_registrations_unpaged:
    'accounts/unpaged/accounts_stake_address_registrations.sql',
  accounts_stake_address_rewards: 'accounts/accounts_stake_address_rewards.sql',
  accounts_stake_address_rewards_unpaged: 'accounts/unpaged/accounts_stake_address_rewards.sql',
  accounts_stake_address_withdrawals: 'accounts/accounts_stake_address_withdrawals.sql',
  accounts_stake_address_withdrawals_unpaged:
    'accounts/unpaged/accounts_stake_address_withdrawals.sql',
  addresses_404: 'addresses/addresses_404.sql',
  addresses_address: 'addresses/addresses_address.sql',
  addresses_address_extended: 'addresses/addresses_address_extended.sql',
  addresses_address_total: 'addresses/addresses_address_total.sql',
  addresses_address_transactions: 'addresses/addresses_address_transactions.sql',
  addresses_address_transactions_unpaged: 'addresses/unpaged/addresses_address_transactions.sql',
  addresses_address_txs: 'addresses/addresses_address_txs.sql',
  addresses_address_txs_unpaged: 'addresses/unpaged/addresses_address_txs.sql',
  addresses_address_utxos: 'addresses/addresses_address_utxos.sql',
  addresses_address_utxos_unpaged: 'addresses/unpaged/addresses_address_utxos.sql',
  addresses_address_utxos_asset: 'addresses/addresses_address_utxos_asset.sql',
  addresses_address_utxos_asset_unpaged: 'addresses/unpaged/addresses_address_utxos_asset.sql',
  assets_404: 'assets/assets_404.sql',
  assets: 'assets/assets.sql',
  assets_unpaged: 'assets/unpaged/assets.sql',
  assets_asset: 'assets/assets_asset.sql',
  assets_asset_addresses: 'assets/assets_asset_addresses.sql',
  assets_asset_addresses_unpaged: 'assets/unpaged/assets_asset_addresses.sql',
  assets_asset_history: 'assets/assets_asset_history.sql',
  assets_asset_history_unpaged: 'assets/unpaged/assets_asset_history.sql',
  assets_asset_transactions: 'assets/assets_asset_transactions.sql',
  assets_asset_transactions_unpaged: 'assets/unpaged/assets_asset_transactions.sql',
  assets_asset_txs: 'assets/assets_asset_txs.sql',
  assets_asset_txs_unpaged: 'assets/unpaged/assets_asset_txs.sql',
  assets_asset_utxo_datum: 'assets/assets_asset_utxo_datum.sql',
  assets_policy_404: 'assets/assets_policy_404.sql',
  assets_policy_policy_id: 'assets/assets_policy_policy_id.sql',
  assets_policy_policy_id_unpaged: 'assets/unpaged/assets_policy_policy_id.sql',
  blocks_epoch_number_slot_slot_number: 'blocks/blocks_epoch_number_slot_slot_number.sql',
  blocks_404: 'blocks/blocks_404.sql',
  blocks_hash_or_number: 'blocks/blocks_hash_or_number.sql',
  blocks_hash_or_number_next: 'blocks/blocks_hash_or_number_next.sql',
  blocks_hash_or_number_next_unpaged: 'blocks/unpaged/blocks_hash_or_number_next.sql',
  blocks_hash_or_number_previous: 'blocks/blocks_hash_or_number_previous.sql',
  blocks_hash_or_number_previous_unpaged: 'blocks/unpaged/blocks_hash_or_number_previous.sql',
  blocks_hash_or_number_txs: 'blocks/blocks_hash_or_number_txs.sql',
  blocks_hash_or_number_txs_unpaged: 'blocks/unpaged/blocks_hash_or_number_txs.sql',
  blocks_hash_or_number_addresses: 'blocks/blocks_hash_or_number_addresses.sql',
  blocks_hash_or_number_addresses_unpaged: 'blocks/unpaged/blocks_hash_or_number_addresses.sql',
  blocks_latest: 'blocks/blocks_latest.sql',
  blocks_latest_txs: 'blocks/blocks_latest_txs.sql',
  blocks_latest_txs_unpaged: 'blocks/unpaged/blocks_latest_txs.sql',
  blocks_slot_slot_number: 'blocks/blocks_slot_slot_number.sql',
  epochs_404: 'epochs/epochs_404.sql',
  epochs_latest: 'epochs/epochs_latest.sql',
  epochs_latest_parameters: 'epochs/epochs_latest_parameters.sql',
  epochs_number: 'epochs/epochs_number.sql',
  epochs_number_blocks: 'epochs/epochs_number_blocks.sql',
  epochs_number_blocks_unpaged: 'epochs/unpaged/epochs_number_blocks.sql',
  epochs_number_parameters: 'epochs/epochs_number_parameters.sql',
  epochs_number_blocks_pool_id: 'epochs/epochs_number_blocks_pool_id.sql',
  epochs_number_blocks_pool_id_unpaged: 'epochs/unpaged/epochs_number_blocks_pool_id.sql',
  epochs_number_next: 'epochs/epochs_number_next.sql',
  epochs_number_next_unpaged: 'epochs/unpaged/epochs_number_next.sql',
  epochs_number_previous: 'epochs/epochs_number_previous.sql',
  epochs_number_previous_unpaged: 'epochs/unpaged/epochs_number_previous.sql',
  epochs_number_stakes: 'epochs/epochs_number_stakes.sql',
  epochs_number_stakes_unpaged: 'epochs/unpaged/epochs_number_stakes.sql',
  epochs_number_stakes_pool_id: 'epochs/epochs_number_stakes_pool_id.sql',
  epochs_number_stakes_pool_id_unpaged: 'epochs/unpaged/epochs_number_stakes_pool_id.sql',
  epochs_pool_404: 'epochs/epochs_pool_404.sql',
  metadata_txs_labels: 'metadata/metadata_txs_labels.sql',
  metadata_txs_labels_unpaged: 'metadata/unpaged/metadata_txs_labels.sql',
  metadata_txs_labels_label: 'metadata/metadata_txs_labels_label.sql',
  metadata_txs_labels_label_unpaged: 'metadata/unpaged/metadata_txs_labels_label.sql',
  metadata_txs_labels_label_cbor: 'metadata/metadata_txs_labels_label_cbor.sql',
  metadata_txs_labels_label_cbor_unpaged: 'metadata/unpaged/metadata_txs_labels_label_cbor.sql',
  network: 'network/network.sql',
  network_epoch: 'network/network_epoch.sql',
  network_protocols: 'network/network_protocols.sql',
  nutlink_address_404: 'nutlink/nutlink_address_404.sql',
  nutlink_address: 'nutlink/nutlink_address.sql',
  nutlink_address_tickers: 'nutlink/nutlink_address_tickers.sql',
  nutlink_address_tickers_unpaged: 'nutlink/unpaged/nutlink_address_tickers.sql',
  nutlink_tickers_ticker: 'nutlink/nutlink_tickers_ticker.sql',
  nutlink_tickers_ticker_unpaged: 'nutlink/unpaged/nutlink_tickers_ticker.sql',
  nutlink_address_tickers_ticker: 'nutlink/nutlink_address_tickers_ticker.sql',
  nutlink_address_tickers_ticker_unpaged: 'nutlink/unpaged/nutlink_address_tickers_ticker.sql',
  nutlink_ticker_404: 'nutlink/nutlink_ticker_404.sql',
  pools_404: 'pools/pools_404.sql',
  pools: 'pools/pools.sql',
  pools_unpaged: 'pools/unpaged/pools.sql',
  pools_extended: 'pools/pools_extended.sql',
  pools_extended_unpaged: 'pools/unpaged/pools_extended.sql',
  pools_pool_id: 'pools/pools_pool_id.sql',
  pools_pool_id_blocks: 'pools/pools_pool_id_blocks.sql',
  pools_pool_id_blocks_unpaged: 'pools/unpaged/pools_pool_id_blocks.sql',
  pools_pool_id_delegators: 'pools/pools_pool_id_delegators.sql',
  pools_pool_id_delegators_unpaged: 'pools/unpaged/pools_pool_id_delegators.sql',
  pools_pool_id_history: 'pools/pools_pool_id_history.sql',
  pools_pool_id_history_unpaged: 'pools/unpaged/pools_pool_id_history.sql',
  pools_pool_id_metadata: 'pools/pools_pool_id_metadata.sql',
  pools_pool_id_relays: 'pools/pools_pool_id_relays.sql',
  pools_retired: 'pools/pools_retired.sql',
  pools_retired_unpaged: 'pools/unpaged/pools_retired.sql',
  pools_retiring: 'pools/pools_retiring.sql',
  pools_retiring_unpaged: 'pools/unpaged/pools_retiring.sql',
  pools_pool_id_updates: 'pools/pools_pool_id_updates.sql',
  pools_pool_id_updates_unpaged: 'pools/unpaged/pools_pool_id_updates.sql',
  scripts_404: 'scripts/scripts_404.sql',
  scripts: 'scripts/scripts.sql',
  scripts_unpaged: 'scripts/unpaged/scripts.sql',
  scripts_script_hash: 'scripts/scripts_script_hash.sql',
  scripts_script_hash_redeemers: 'scripts/scripts_script_hash_redeemers.sql',
  scripts_script_hash_redeemers_unpaged: 'scripts/unpaged/scripts_script_hash_redeemers.sql',
  scripts_script_hash_cbor: 'scripts/scripts_script_hash_cbor.sql',
  scripts_script_hash_json: 'scripts/scripts_script_hash_json.sql',
  scripts_datum_datum_hash: 'scripts/scripts_datum_datum_hash.sql',
  scripts_datum_datum_hash_cbor: 'scripts/scripts_datum_datum_hash_cbor.sql',
  txs_404: 'txs/txs_404.sql',
  txs_hash: 'txs/txs_hash.sql',
  txs_hash_delegations: 'txs/txs_hash_delegations.sql',
  txs_hash_metadata_cbor: 'txs/txs_hash_metadata_cbor.sql',
  txs_hash_pool_retires: 'txs/txs_hash_pool_retires.sql',
  txs_hash_pool_updates_relays: 'txs/txs_hash_pool_updates_relays.sql',
  txs_hash_redeemers: 'txs/txs_hash_redeemers.sql',
  txs_hash_utxos_1: 'txs/txs_hash_utxos_1.sql',
  txs_hash_utxos_2: 'txs/txs_hash_utxos_2.sql',
  txs_hash_stakes: 'txs/txs_hash_stakes.sql',
  txs_hash_withdrawals: 'txs/txs_hash_withdrawals.sql',
  txs_hash_mirs: 'txs/txs_hash_mirs.sql',
  txs_hash_pool_updates: 'txs/txs_hash_pool_updates.sql',
  txs_hash_metadata: 'txs/txs_hash_metadata.sql',
  txs_hash_wits: 'txs/txs_hash_wits.sql',
} as const;

type QueryKey = keyof typeof QUERY_FILES;

interface Options {
  environment: 'development' | 'production';
}
class SQLQueryManager {
  private static instance: SQLQueryManager;
  private options: Options | undefined;
  private QUERIES!: Record<QueryKey, string>;

  constructor(options?: Options) {
    this.options = options;

    if (!SQLQueryManager.instance) {
      this.QUERIES = this.loadQueries();
      SQLQueryManager.instance = this;
    }

    return SQLQueryManager.instance;
  }

  private readQueryFromFile = (queryKey: QueryKey) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return fs.readFileSync(path.join(__dirname, QUERY_FILES[queryKey])).toString();
  };

  private loadQueries = () => {
    const queries = {} as Record<QueryKey, string>;

    for (const queryKey in QUERY_FILES) {
      queries[queryKey as QueryKey] = this.readQueryFromFile(queryKey as QueryKey);
    }

    return queries;
  };

  public get = (queryKey: QueryKey): string => {
    if (this.options?.environment === 'development') {
      this.QUERIES[queryKey] = this.readQueryFromFile(queryKey);
      console.info(`DEV MODE: Query ${queryKey} reloaded.`);
    }
    return this.QUERIES[queryKey];
  };
}

export const SQLQuery = new SQLQueryManager({
  environment: process.env.NODE_ENV?.startsWith('dev') ? 'development' : 'production',
});
