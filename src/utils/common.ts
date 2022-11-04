import { FastifyInstance } from 'fastify';

export const registerRoute = (app: FastifyInstance, routeHandler: any) => {
  app.register(routeHandler, {
    dirNameRoutePrefix: false,
  });
};
