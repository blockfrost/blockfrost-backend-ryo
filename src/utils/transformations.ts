import { PoolMetadata as PoolMetadataQuery } from '../types/queries/pools.js';
import { PoolMetadata as PoolMetadataResponse } from '../types/responses/pools.js';
import { transformOffChainFetchError } from './governance.js';

export const enhancePoolMetadata = (row: PoolMetadataQuery): PoolMetadataResponse => {
  const poolMetadataText = row.metadata_text;
  const poolMetadataTextChecked =
    poolMetadataText === null
      ? {
          name: null,
          description: null,
          homepage: null,
        }
      : poolMetadataText;

  return {
    pool_id: row.pool_id,
    hex: row.hex,
    url: row.url,
    hash: row.hash,
    ...(row.fetch_error === null ? {} : { error: transformOffChainFetchError(row.fetch_error) }),
    ticker: row.ticker,
    name: poolMetadataTextChecked.name === undefined ? null : poolMetadataTextChecked.name,
    description:
      poolMetadataTextChecked.description === undefined
        ? null
        : poolMetadataTextChecked.description,
    homepage:
      poolMetadataTextChecked.homepage === undefined ? null : poolMetadataTextChecked.homepage,
  };
};
