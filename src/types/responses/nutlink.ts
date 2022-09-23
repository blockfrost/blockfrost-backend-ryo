import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type NutlinkAddress = OpenApiResponseTypes['nutlink_address'];
export type NutlinkAddressTickers = OpenApiResponseTypes['nutlink_address_tickers'];
// TODO: incorrect type for the payload in openapi
export type NutlinkAddressTicker = (Omit<
  OpenApiResponseTypes['nutlink_address_ticker'][number],
  'payload'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> & { payload: any })[];
// TODO: incorrect type for the payload in openapi
export type NutlinkTickersTicker = (Omit<
  OpenApiResponseTypes['nutlink_tickers_ticker'][number],
  'payload'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> & { payload: any })[];
