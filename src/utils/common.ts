import { FastifyInstance } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerRoute = (app: FastifyInstance, routeHandler: any) => {
  app.register(routeHandler, {
    dirNameRoutePrefix: false,
  });
};
