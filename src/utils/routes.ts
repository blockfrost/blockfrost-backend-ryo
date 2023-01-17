import { FastifyRequest } from 'fastify';

export const standardSafeZone = (securityParameter: number, activeSlotsCoeff: number) =>
  (3 * securityParameter) / activeSlotsCoeff;

export const isUnpaged = (request: FastifyRequest): boolean => {
  return !!request.headers['unpaged'];
};
