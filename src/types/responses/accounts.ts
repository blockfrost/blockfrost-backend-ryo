import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type Account = OpenApiResponseTypes['account_content'];
export type AccountRewards = OpenApiResponseTypes['account_reward_content'];
export type AccountDelegations = OpenApiResponseTypes['account_delegation_content'];
export type AccountRegistrations = OpenApiResponseTypes['account_registration_content'];
export type AccountWithdrawalsAndMirs = OpenApiResponseTypes['account_withdrawal_content'];
export type AccountHistory = OpenApiResponseTypes['account_history_content'];
export type AccountAssets = {
  amount: OpenApiResponseTypes['account_addresses_assets'];
};
export type AccountAddresses = OpenApiResponseTypes['account_addresses_content'];

export type AccountAddressesTotal = OpenApiResponseTypes['account_addresses_total'];
