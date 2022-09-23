import { fastify } from '@blockfrost/blockfrost-utils';

export const notFoundHandler = fastify.notFoundHandler;
export const errorHandler = fastify.errorHandler;
export const handle400 = fastify.handle400;
export const handle400Custom = fastify.handle400Custom;
export const handle402 = fastify.handle402;
export const handle403 = fastify.handle403;
export const handle403Custom = fastify.handle403Custom;
export const handle404 = fastify.handle404;
export const handle500 = fastify.handle500;
export const handleInvalidAddress = fastify.handleInvalidAddress;
