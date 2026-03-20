import { FastifyInstance } from 'fastify';
import { IDatabase } from 'pg-promise';

export const getDbSync = (fastify: FastifyInstance): IDatabase<object> => fastify.dbSync;
